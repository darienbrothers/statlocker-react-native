import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';

const TOTAL_STEPS = 13;

const SportGenderScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [gender, setGender] = useState<'Boys' | 'Girls' | null>(
    (onboardingData.gender as 'Boys' | 'Girls') || null
  );

  const handleContinue = () => {
    if (!gender) return;
    updateOnboardingData({
      sport: 'Lacrosse',
      gender,
    });
    navigation.navigate('Position' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={3} totalSteps={TOTAL_STEPS} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Who are you representing?</Text>
        <Text style={styles.subtitle}>This helps us set up your positions and stats.</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sport</Text>
            <View style={styles.sportContainer}>
              <Text style={styles.sportText}>Lacrosse (More sports coming soon!)</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'Boys' && styles.genderButtonSelected,
                ]}
                onPress={() => setGender('Boys')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === 'Boys' && styles.genderButtonTextSelected,
                  ]}
                >
                  Boys
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'Girls' && styles.genderButtonSelected,
                ]}
                onPress={() => setGender('Girls')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === 'Girls' && styles.genderButtonTextSelected,
                  ]}
                >
                  Girls
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !gender && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!gender}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Next</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
  form: {
    gap: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.medium,
    color: '#1D2333',
    marginBottom: 8,
  },
  sportContainer: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
  },
  sportText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  genderButtonSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  genderButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#6B7280',
  },
  genderButtonTextSelected: {
    color: '#4F46E5',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
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

export default SportGenderScreen;

