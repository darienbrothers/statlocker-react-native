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
import { POSITIONS } from '../../utils/goalsLibrary';
import type { Position } from '../../types';

const TOTAL_STEPS = 13;

const PositionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const gender = (onboardingData.gender as 'Boys' | 'Girls') || 'Boys';
  const positions = POSITIONS[gender];
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    (onboardingData.position as Position) || null
  );

  const handleContinue = () => {
    if (!selectedPosition) return;
    updateOnboardingData({ position: selectedPosition });
    navigation.navigate('TeamContext' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={4} totalSteps={TOTAL_STEPS} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What's your position?</Text>
        <Text style={styles.subtitle}>Select your primary position on the field.</Text>

        <View style={styles.grid}>
          {positions.map((pos) => (
            <TouchableOpacity
              key={pos.id}
              style={[
                styles.positionCard,
                selectedPosition === pos.id && styles.positionCardSelected,
              ]}
              onPress={() => setSelectedPosition(pos.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.positionIcon}>{pos.icon}</Text>
              <Text
                style={[
                  styles.positionText,
                  selectedPosition === pos.id && styles.positionTextSelected,
                ]}
              >
                {pos.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedPosition && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedPosition}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  positionCard: {
    width: '47%',
    aspectRatio: 1.2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  positionCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  positionIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  positionText: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
    textAlign: 'center',
  },
  positionTextSelected: {
    color: '#4F46E5',
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

export default PositionScreen;

