import React from 'react';
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
import { useOnboarding } from '../../contexts/onboarding';
import { TONES } from '../../utils/goalsLibrary';

const WelcomeOnboardingScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { onboardingData } = useOnboarding();

  const selectedTone = TONES.find((t) => t.id === onboardingData.selectedTone);
  const position = onboardingData.position || 'Goalie';

  const handleSecureLocker = () => {
    navigation.navigate('AccountCreation' as never);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.celebrationIcon}>🎉</Text>
      </View>

      <Text style={styles.title}>Welcome to{'\n'}StatLocker!</Text>
      <Text style={styles.subtitle}>Your locker is all set up. Let's make today count.</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Onboarding Summary:</Text>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Role:</Text>
          <Text style={styles.summaryValue}>{onboardingData.role || 'Athlete'}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Position:</Text>
          <Text style={styles.summaryValue}>{position}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>AI Coach Tone:</Text>
          <Text style={styles.summaryValue}>{selectedTone?.title || 'Not selected'}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>AthleteDNA:</Text>
          <Text style={styles.summaryValue}>
            {onboardingData.athleteDNASummary || 'Not available'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.secureButton}
        onPress={handleSecureLocker}
        activeOpacity={0.8}
      >
        <Text style={styles.secureButtonText}>Secure your Locker</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  celebrationIcon: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
    marginBottom: 20,
  },
  summaryItem: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    lineHeight: 24,
  },
  secureButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
});

export default WelcomeOnboardingScreen;

