import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
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
  getGoalsByTier,
  type GoalItem,
  type GoalTier,
} from '../../utils/goalsLibrary';
import type { Position } from '../../types';
import AllGoalsModalScreen from './AllGoalsModalScreen';

const TOTAL_STEPS = 13;
const MAX_GOALS = 3;

const SeasonGoalsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const position = (onboardingData.position as Position) || 'Goalie';
  const gender = (onboardingData.gender as 'Boys' | 'Girls') || 'Boys';
  const [selectedGoalIds, setSelectedGoalIds] = useState<string[]>(
    onboardingData.selectedGoals || []
  );
  const [expandedCategory, setExpandedCategory] = useState<GoalTier | null>('core');
  const [showAllGoalsModal, setShowAllGoalsModal] = useState(false);

  const allGoals = getGoalsForPosition(position, gender);
  const coreGoals = getGoalsByTier(allGoals, 'core');
  const challengeGoals = getGoalsByTier(allGoals, 'challenge');
  const eliteGoals = getGoalsByTier(allGoals, 'elite');

  const toggleGoal = (goalId: string) => {
    if (selectedGoalIds.includes(goalId)) {
      setSelectedGoalIds(selectedGoalIds.filter((id) => id !== goalId));
    } else if (selectedGoalIds.length < MAX_GOALS) {
      setSelectedGoalIds([...selectedGoalIds, goalId]);
    }
  };

  const toggleCategory = (tier: GoalTier) => {
    setExpandedCategory(expandedCategory === tier ? null : tier);
  };

  const handleContinue = () => {
    if (selectedGoalIds.length === 0) return;
    updateOnboardingData({ selectedGoals: selectedGoalIds });
    navigation.navigate('ToneStyle' as never);
  };

  const renderGoalCard = (goal: GoalItem) => {
    const isSelected = selectedGoalIds.includes(goal.id);
    return (
      <TouchableOpacity
        key={goal.id}
        style={[styles.goalCard, isSelected && styles.goalCardSelected]}
        onPress={() => toggleGoal(goal.id)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.goalText,
            isSelected && styles.goalTextSelected,
          ]}
        >
          {goal.title}
        </Text>
        <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
          {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategory = (tier: GoalTier, goals: GoalItem[], color: string, description: string) => {
    const isExpanded = expandedCategory === tier;
    const categoryGoals = goals.filter((g) => selectedGoalIds.includes(g.id));
    
    return (
      <View key={tier} style={styles.categoryCard}>
        <TouchableOpacity
          style={styles.categoryHeader}
          onPress={() => toggleCategory(tier)}
          activeOpacity={0.7}
        >
          <View style={[styles.categoryIcon, { backgroundColor: color }]} />
          <View style={styles.categoryHeaderText}>
            <Text style={styles.categoryTitle}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)} Goals
            </Text>
            <Text style={styles.categorySubtitle}>{description}</Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.goalsList}>
            {goals.map((goal) => renderGoalCard(goal))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={6} totalSteps={TOTAL_STEPS} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Set your season goals.</Text>
        <Text style={styles.subtitle}>Choose up to 3 goals that push you.</Text>

        <View style={styles.categoriesContainer}>
          {renderCategory('core', coreGoals, '#10B981', 'Easy Wins')}
          {renderCategory('challenge', challengeGoals, '#F59E0B', 'Performance Boosters')}
          {renderCategory('elite', eliteGoals, '#EF4444', 'Stretch Targets')}
        </View>

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setShowAllGoalsModal(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>View All Goals</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.footerInfo}>
          <Text style={styles.goalsCounter}>
            {selectedGoalIds.length}/{MAX_GOALS} Selected
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedGoalIds.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedGoalIds.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAllGoalsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAllGoalsModal(false)}
      >
        <AllGoalsModalScreen
          allGoals={allGoals}
          selectedGoalIds={selectedGoalIds}
          onToggleGoal={toggleGoal}
          onClose={() => setShowAllGoalsModal(false)}
          onSave={(updatedGoals) => {
            setSelectedGoalIds(updatedGoals);
            setShowAllGoalsModal(false);
          }}
        />
      </Modal>
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
  categoriesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryHeaderText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
  },
  goalsList: {
    marginTop: 16,
    gap: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  goalCardSelected: {
    backgroundColor: '#F5F3FF',
    borderColor: '#4F46E5',
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
  },
  goalTextSelected: {
    fontFamily: Fonts.InterTight.semiBold,
    color: '#4F46E5',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  viewAllButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  viewAllText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#4F46E5',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerInfo: {
    marginBottom: 12,
  },
  goalsCounter: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.medium,
    color: '#6B7280',
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

export default SeasonGoalsScreen;

