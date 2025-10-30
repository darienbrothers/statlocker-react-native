import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import GoalCard from '../components/GoalCard';
import BadgeCard from '../components/goals/BadgeCard';
import CompletedGoalItem from '../components/goals/CompletedGoalItem';
import type { Goal, Badge } from '../types';

const mockCurrentGoals: Goal[] = [
  {
    id: 'g1',
    icon: 'target',
    iconBgColor: 'purple',
    title: '80% Save Percentage',
    target: '80%',
    currentValue: 'Current: 78.5%',
    progress: 98,
    status: 'On Track',
  },
  {
    id: 'g2',
    icon: 'shield',
    iconBgColor: 'green',
    title: '200 Total Saves',
    target: '200',
    currentValue: 'Current: 142 saves',
    progress: 71,
    status: 'Ahead',
  },
];

const mockCompletedGoals: Goal[] = [
  {
    id: 'g3',
    icon: 'clear',
    iconBgColor: 'blue',
    title: '85% Clear Success',
    target: '85%',
    currentValue: 'Achieved: 85%',
    progress: 100,
    status: 'Achieved!',
  },
  {
    id: 'g4',
    icon: 'turnovers',
    iconBgColor: 'red',
    title: 'Sub-1 Turnover/Game',
    target: '1.0',
    currentValue: 'Achieved: 0.8',
    progress: 100,
    status: 'Achieved!',
  },
];

const mockBadges: Badge[] = [
  {
    id: 'b1',
    icon: 'fire',
    title: 'Hot Streak',
    description: '5 consecutive games with 75%+ save percentage.',
    isEarned: true,
  },
  {
    id: 'b2',
    icon: 'shield',
    title: 'The Wall',
    description: 'Record 15+ saves in a single game.',
    isEarned: true,
  },
  {
    id: 'b3',
    icon: 'target',
    title: 'Perfect Game',
    description: 'Achieve a 100% save percentage in a game.',
    isEarned: false,
  },
  {
    id: 'b4',
    icon: 'clear',
    title: 'Outlet Master',
    description: 'Achieve a 100% clear rate in a game.',
    isEarned: true,
  },
];

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const GoalsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TopNavBar firstName="Alex" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>My Goals</Text>
          <Text style={styles.subtitle}>Track your progress and celebrate your achievements.</Text>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Current Goals" />
          <View style={styles.goalsList}>
            {mockCurrentGoals.map((goal) => (
              <GoalCard key={goal.id} {...goal} />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Badges" />
          <View style={styles.badgesGrid}>
            {mockBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Completed Goals" />
          <View style={styles.goalsList}>
            {mockCompletedGoals.map((goal) => (
              <CompletedGoalItem key={goal.id} goal={goal} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D2333',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 16,
  },
  goalsList: {
    gap: 12,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});

export default GoalsScreen;
