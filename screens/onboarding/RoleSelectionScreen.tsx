import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';

const TOTAL_STEPS = 13;

const RoleSelectionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [selectedRole, setSelectedRole] = useState<'Athlete' | 'Coach' | null>(
    (onboardingData.role as 'Athlete' | 'Coach') || null
  );

  const handleRoleSelect = (role: 'Athlete' | 'Coach') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    updateOnboardingData({ role: selectedRole });
    navigation.navigate('SportGender' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={2} totalSteps={TOTAL_STEPS} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Time to suit up.</Text>
        <Text style={styles.subtitle}>Select your role to enter the Locker.</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'Athlete' && styles.roleCardSelected,
            ]}
            onPress={() => handleRoleSelect('Athlete')}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="baseball" size={48} color={selectedRole === 'Athlete' ? '#4F46E5' : '#6B7280'} />
            </View>
            <Text style={styles.roleText}>Athlete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'Coach' && styles.roleCardSelected,
            ]}
            onPress={() => handleRoleSelect('Coach')}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="clipboard" size={48} color={selectedRole === 'Coach' ? '#4F46E5' : '#6B7280'} />
            </View>
            <Text style={styles.roleText}>Coach</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
          <Text style={styles.infoText}>Roles are permanent for this account.</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  roleContainer: {
    gap: 16,
    marginBottom: 24,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  roleCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  iconContainer: {
    marginBottom: 16,
  },
  roleText: {
    fontSize: 20,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.regular,
    color: '#9CA3AF',
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

export default RoleSelectionScreen;

