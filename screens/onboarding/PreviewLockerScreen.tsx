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
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';
import {
  getGoalsForPosition,
  GOALS_LIBRARY,
} from '../../utils/goalsLibrary';
import type { Position } from '../../types';

const TOTAL_STEPS = 13;

const PreviewLockerScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { onboardingData } = useOnboarding();
  const position = (onboardingData.position as Position) || 'Goalie';
  const selectedGoalIds = onboardingData.selectedGoals || [];
  const gender = (onboardingData.gender as 'Boys' | 'Girls') || 'Boys';

  const allGoals = getGoalsForPosition(position, gender);
  const selectedGoals = allGoals.filter((goal) => selectedGoalIds.includes(goal.id));

  const handleCreateAccount = () => {
    navigation.navigate('WelcomeOnboarding' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={11} totalSteps={TOTAL_STEPS} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Here's what your Locker will look like.</Text>
        <Text style={styles.subtitle}>All your stats, goals, and insights in one place.</Text>

        {/* Stats Grid */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Points</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>GBs</Text>
              <Text style={styles.statValue}>5</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>SOG %</Text>
              <Text style={styles.statValue}>60%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>CTOs</Text>
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
        </View>

        {/* AI Insight */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="sparkles" size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>AI Insight</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              "You led the defense well today. We need that communication on every play. Let's make sure we're dictating the pace."
            </Text>
          </View>
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flag" size={20} color="#EF4444" />
            <Text style={styles.sectionTitle}>Goals</Text>
          </View>
          <View style={styles.goalsList}>
            {selectedGoals.slice(0, 3).map((goal) => (
              <View key={goal.id} style={styles.goalItem}>
                <View style={styles.goalCheckbox} />
                <Text style={styles.goalText}>{goal.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
          activeOpacity={0.8}
        >
          <Text style={styles.createAccountButtonText}>Create Account to Save</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontFamily: Fonts.Outfit.bold,
    color: '#1D2333',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
  },
  insightCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#4F46E5',
  },
  insightText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  goalsList: {
    gap: 12,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  goalText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    flex: 1,
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
  createAccountButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
});

export default PreviewLockerScreen;

