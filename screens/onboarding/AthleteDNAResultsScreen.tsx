import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';
import { generateAthleteDNASummary } from '../../services/athleteDNAService';

const TOTAL_STEPS = 13;

const AthleteDNAResultsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const loadResults = async () => {
      if (onboardingData.athleteDNASummary) {
        setSummary(onboardingData.athleteDNASummary);
        setIsAnalyzing(false);
        return;
      }

      // Show analyzing state for 1-2 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onboardingData.athleteDNAAnswers) {
        try {
          const generatedSummary = await generateAthleteDNASummary(
            onboardingData.athleteDNAAnswers
          );
          setSummary(generatedSummary);
          updateOnboardingData({ athleteDNASummary: generatedSummary });
        } catch (error) {
          console.error('Error generating DNA summary:', error);
          setSummary(
            "You're a Growth-Oriented Strategist — your relentless self-motivation and analytical approach to every game reveal your path to constant personal evolution and competitive mastery."
          );
        }
      }
      setIsAnalyzing(false);
    };

    loadResults();
  }, []);

  const handlePreviewLocker = () => {
    navigation.navigate('PreviewLocker' as never);
  };

  const handleRetakeQuiz = () => {
    navigation.navigate('AthleteDNAQuiz' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleRetakeQuiz} style={styles.retakeButton}>
          <Ionicons name="chevron-back" size={20} color="#6B7280" />
          <Text style={styles.retakeText}>Retake Quiz</Text>
        </TouchableOpacity>
        <ProgressBar currentStep={9} totalSteps={TOTAL_STEPS} />
      </View>

      <View style={styles.content}>
        {isAnalyzing ? (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.analyzingText}>Analyzing...</Text>
          </View>
        ) : (
          <>
            <View style={styles.logoContainer}>
              <Text style={styles.dnaIcon}>🧬</Text>
            </View>

            <Text style={styles.title}>Your AthleteDNA™ Profile</Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          </>
        )}
      </View>

      {!isAnalyzing && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={handlePreviewLocker}
            activeOpacity={0.8}
          >
            <Text style={styles.previewButtonText}>Preview My Locker</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 8,
    gap: 4,
  },
  retakeText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.medium,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  analyzingText: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.medium,
    color: '#6B7280',
  },
  logoContainer: {
    marginBottom: 24,
  },
  dnaIcon: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
    marginBottom: 32,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryText: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    lineHeight: 28,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  previewButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
});

export default AthleteDNAResultsScreen;

