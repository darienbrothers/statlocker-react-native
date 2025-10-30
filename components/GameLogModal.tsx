import React, { useMemo, useState } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { GameLogFormData } from '../types';
import { Icon } from './Icon';
import FormInput from './form/FormInput';
import StatCounter from './form/StatCounter';
import FormSegmentedControl from './form/FormSegmentedControl';
import FormTextarea from './form/FormTextarea';
import DatePickerInput from './form/DatePickerInput';
import { GoogleGenAI } from '@google/genai';
import { generateMockGameAnalysis, shouldUseMockMode, simulateApiDelay } from '../utils/mockAiService';
import Constants from 'expo-constants';

interface GameLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<GameLogFormData>) => void;
}

const StatDisplay: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.statDisplay}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

// Initialize Gemini AI only if API key is available
const apiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY;
const ai = apiKey && !shouldUseMockMode() ? new GoogleGenAI({ apiKey }) : null;

// Generate analysis using AI or mock
const generateAnalysis = async (data: GameLogFormData): Promise<string> => {
  if (shouldUseMockMode() || !ai) {
    await simulateApiDelay(1500 + Math.random() * 500);
    return generateMockGameAnalysis(data);
  }

  const shotsFaced = data.saves + data.goalsAllowed;
  const savePercentage = shotsFaced > 0 ? ((data.saves / shotsFaced) * 100).toFixed(0) : '0';
  const clearPercentage = data.totalClearsAttempted > 0 ? ((data.successfulClears / data.totalClearsAttempted) * 100).toFixed(0) : '0';

  const prompt = `
    Analyze the following lacrosse goalie performance data for a single game and provide concise, actionable, and encouraging feedback.
    The feedback should be formatted as "key takeaways".
    The tone should be like a helpful, positive coach.
    Focus on 2-3 key points.
    Start with a positive reinforcement, then offer one area for improvement if applicable.
    Keep the entire response under 75 words.
    Incorporate theihaNotes if they are insightful.

    Game Data:
    - Opponent: ${data.opponent}
    - My Team's Score: ${data.myScore}
    - Their Score: ${data.theirScore}
    - Saves: ${data.saves}
    - Goals Allowed: ${data.goalsAllowed}
    - Shots Faced: ${shotsFaced}
    - Save Percentage: ${savePercentage}%
    - Successful Clears: ${data.successfulClears}
    - Total Clears Attempted: ${data.totalClearsAttempted}
    - Clear Percentage: ${clearPercentage}%
    - Ground Balls: ${data.groundBalls}
    - Turnovers: ${data.turnovers}
    - Player's Notes: ${data.notes || 'No notes provided.'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });
    return response.text?.trim() || generateMockGameAnalysis(data);
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    return generateMockGameAnalysis(data);
  }
};

const GameLogModal: React.FC<GameLogModalProps> = ({ isOpen, onClose, onSave }) => {
  const [view, setView] = useState<'form' | 'analysis'>('form');
  const [gameData, setGameData] = useState<GameLogFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const statsForm = useForm<GameLogFormData>({
    mode: 'onChange',
    defaultValues: {
      gameDate: new Date().toISOString().split('T')[0],
      location: 'Home',
      myScore: undefined,
      theirScore: undefined,
      saves: 0,
      goalsAllowed: 0,
      successfulClears: 0,
      totalClearsAttempted: 0,
      groundBalls: 0,
      turnovers: 0,
      notes: '',
    },
  });

  const analysisForm = useForm<{ keyTakeaways: string }>({
    mode: 'onChange',
    defaultValues: {
      keyTakeaways: '',
    },
  });

  const processStats: SubmitHandler<GameLogFormData> = async (data) => {
    setGameData(data);
    setView('analysis');
    setIsGenerating(true);
    try {
      const analysisText = await generateAnalysis(data);
      analysisForm.setValue('keyTakeaways', analysisText, { shouldValidate: true });
    } catch (e) {
      console.error(e);
      analysisForm.setValue('keyTakeaways', 'There was an error generating the AI analysis. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAnalysis: SubmitHandler<{ keyTakeaways: string }> = (analysisData) => {
    if (!gameData) return;

    const myScore = Number(gameData.myScore) || 0;
    const theirScore = Number(gameData.theirScore) || 0;
    const result: 'W' | 'L' = myScore > theirScore ? 'W' : 'L';

    const finalData = { ...gameData, ...analysisData, result };
    onSave(finalData);
    handleClose();
  };

  const handleClose = () => {
    statsForm.reset();
    analysisForm.reset();
    setView('form');
    setGameData(null);
    setIsGenerating(false);
    onClose();
  };

  const { watch: watchStats } = statsForm;
  const saves = watchStats('saves', 0);
  const goalsAllowed = watchStats('goalsAllowed', 0);
  const successfulClears = watchStats('successfulClears', 0);
  const totalClearsAttempted = watchStats('totalClearsAttempted', 0);

  const calculatedStats = useMemo(() => {
    const shotsFaced = (Number(saves) || 0) + (Number(goalsAllowed) || 0);
    const savePercentage = shotsFaced > 0 ? (((Number(saves) || 0) / shotsFaced) * 100).toFixed(0) : '0';
    const clearPercentage = (Number(totalClearsAttempted) || 0) > 0 ? (((Number(successfulClears) || 0) / (Number(totalClearsAttempted) || 1)) * 100).toFixed(0) : '0';
    return { shotsFaced, savePercentage, clearPercentage };
  }, [saves, goalsAllowed, successfulClears, totalClearsAttempted]);

  return (
    <Modal visible={isOpen} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
          <SafeAreaView style={styles.modalContent} edges={['top']}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {view === 'analysis' && (
                <TouchableOpacity
                  onPress={() => setView('form')}
                  style={styles.backButton}
                  disabled={isGenerating}
                >
                  <Icon name="arrowLeft" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
              <Text style={styles.headerTitle}>{view === 'form' ? 'Log Game' : 'Post-Game Analysis'}</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {view === 'form' && (
            <>
              <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.formContent}>
                  {/* Game Details */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Game Details</Text>
                    <View style={styles.formFields}>
                      <FormInput
                        id="opponent"
                        label="Opponent"
                        control={statsForm.control}
                        rules={{ required: 'Opponent name is required' }}
                        error={statsForm.formState.errors.opponent}
                        placeholder="e.g., Northwood High"
                      />
                      <View style={styles.row}>
                        <View style={styles.halfWidth}>
                          <DatePickerInput
                            id="gameDate"
                            label="Game Date"
                            control={statsForm.control}
                            rules={{ required: 'Game date is required' }}
                            error={statsForm.formState.errors.gameDate}
                          />
                        </View>
                        <View style={styles.halfWidth}>
                          <Controller
                            name="location"
                            control={statsForm.control}
                            render={({ field }) => (
                              <FormSegmentedControl label="Location" options={['Home', 'Away']} value={field.value} onChange={field.onChange} />
                            )}
                          />
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.halfWidth}>
                          <FormInput
                            id="myScore"
                            label="My Team's Score"
                            control={statsForm.control}
                            type="number"
                            rules={{
                              required: 'Score is required',
                              min: { value: 0, message: 'Score cannot be negative' },
                              pattern: { value: /^\d+$/, message: 'Score must be a whole number' },
                            }}
                            error={statsForm.formState.errors.myScore}
                            placeholder="10"
                          />
                        </View>
                        <View style={styles.halfWidth}>
                          <FormInput
                            id="theirScore"
                            label="Their Score"
                            control={statsForm.control}
                            type="number"
                            rules={{
                              required: 'Score is required',
                              min: { value: 0, message: 'Score cannot be negative' },
                              pattern: { value: /^\d+$/, message: 'Score must be a whole number' },
                            }}
                            error={statsForm.formState.errors.theirScore}
                            placeholder="9"
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Goalie Stats */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>My Goalie Stats</Text>
                    <View style={styles.statsCard}>
                      <StatDisplay label="Shots Faced" value={String(calculatedStats.shotsFaced)} />
                      <StatDisplay label="Save %" value={`${calculatedStats.savePercentage}%`} />
                      <StatDisplay label="Clear %" value={`${calculatedStats.clearPercentage}%`} />
                    </View>
                    <View style={styles.formFields}>
                      <Controller name="saves" control={statsForm.control} render={({ field }) => <StatCounter label="Saves" {...field} />} />
                      <Controller name="goalsAllowed" control={statsForm.control} render={({ field }) => <StatCounter label="Goals Allowed" {...field} />} />
                      <Controller name="successfulClears" control={statsForm.control} render={({ field }) => <StatCounter label="Successful Clears" {...field} />} />
                      <Controller
                        name="totalClearsAttempted"
                        control={statsForm.control}
                        rules={{
                          validate: (value) =>
                            Number(value) >= (Number(successfulClears) || 0) || 'Total must be >= successful clears',
                        }}
                        render={({ field }) => (
                          <StatCounter label="Total Clears Attempted" {...field} error={statsForm.formState.errors.totalClearsAttempted} />
                        )}
                      />
                      <Controller name="groundBalls" control={statsForm.control} render={({ field }) => <StatCounter label="Ground Balls" {...field} />} />
                      <Controller name="turnovers" control={statsForm.control} render={({ field }) => <StatCounter label="Turnovers" {...field} />} />
                    </View>
                  </View>

                  {/* Notes Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notes</Text>
                    <FormTextarea
                      id="notes"
                      label="Game Notes"
                      control={statsForm.control}
                      placeholder="Any specific thoughts? (e.g., weather, key moments, how you felt)"
                      rows={4}
                    />
                  </View>
                </View>
              </ScrollView>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={statsForm.handleSubmit(processStats)}
                  disabled={!statsForm.formState.isValid}
                  style={[styles.submitButton, !statsForm.formState.isValid && styles.submitButtonDisabled]}
                >
                  <Text style={styles.submitButtonText}>Save and Analyze</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {view === 'analysis' && (
            <>
              {isGenerating ? (
                <View style={styles.loadingContainer}>
                  <Icon name="ai" size={48} color="#4F46E5" />
                  <Text style={styles.loadingText}>Coach is analyzing your game...</Text>
                </View>
              ) : (
                <>
                  <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.analysisContent}>
                      <View style={styles.analysisHeader}>
                        <View style={styles.aiIconContainer}>
                          <Icon name="ai" size={20} color="#4F46E5" />
                        </View>
                        <Text style={styles.analysisTitle}>AI Coach Insights</Text>
                      </View>
                      <FormTextarea
                        id="keyTakeaways"
                        label="Key Takeaways"
                        control={analysisForm.control}
                        rules={{ required: 'Analysis cannot be empty.' }}
                        error={analysisForm.formState.errors.keyTakeaways}
                        placeholder="Your AI-generated analysis..."
                        rows={12}
                      />
                    </View>
                  </ScrollView>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={analysisForm.handleSubmit(saveAnalysis)}
                      disabled={!analysisForm.formState.isValid || isGenerating}
                      style={[styles.submitButton, styles.submitButtonAccent, (!analysisForm.formState.isValid || isGenerating) && styles.submitButtonDisabled]}
                    >
                      <Text style={styles.submitButtonText}>{isGenerating ? 'Analyzing...' : 'Save Analysis'}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F7F7F9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  formContent: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 16,
  },
  formFields: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statDisplay: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 16,
  },
  submitButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonAccent: {
    backgroundColor: '#10B981',
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(79, 70, 229, 0.4)',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  analysisContent: {
    padding: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiIconContainer: {
    padding: 8,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 20,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginLeft: 12,
  },
});

export default GameLogModal;
