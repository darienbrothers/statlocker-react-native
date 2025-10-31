import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';
import { TONES, AITone } from '../../utils/goalsLibrary';
import type { AiTone } from '../../types';

const TOTAL_STEPS = 13;

const ToneStyleScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [selectedTone, setSelectedTone] = useState<AiTone | null>(
    (onboardingData.selectedTone as AiTone) || null
  );

  const handleContinue = () => {
    if (!selectedTone) return;
    updateOnboardingData({ selectedTone });
    navigation.navigate('AthleteDNAQuiz' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={7} totalSteps={TOTAL_STEPS} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose your AI Coach's tone.</Text>
        <Text style={styles.subtitle}>Your AI Coach will match your vibe.</Text>

        <View style={styles.toneContainer}>
          {TONES.map((tone) => {
            const isSelected = selectedTone === tone.id;
            return (
              <TouchableOpacity
                key={tone.id}
                style={[
                  styles.toneCard,
                  isSelected && styles.toneCardSelected,
                ]}
                onPress={() => setSelectedTone(tone.id as AiTone)}
                activeOpacity={0.7}
              >
                <Text style={styles.toneTitle}>{tone.title}</Text>
                <Text style={styles.toneDescription}>{tone.description}</Text>
                <View style={styles.sampleContainer}>
                  <Text style={styles.sampleText}>{tone.sample}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedTone && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedTone}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  toneContainer: {
    gap: 16,
  },
  toneCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
  },
  toneCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  toneTitle: {
    fontSize: 20,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
    marginBottom: 8,
  },
  toneDescription: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    marginBottom: 16,
  },
  sampleContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#E5E7EB',
  },
  sampleText: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
});

export default ToneStyleScreen;

