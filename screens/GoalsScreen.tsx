import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import SectionHeader from '../components/SectionHeader';
import GoalCard from '../components/GoalCard';
import CompletedGoalItem from '../components/goals/CompletedGoalItem';
import { useGoals } from '../contexts/goals';
import ProgressRing from '../components/goals/ProgressRing';
import BadgesGrid from '../components/goals/BadgesGrid';
import GoalEditorModal from '../components/goals/GoalEditorModal';
import type { Goal } from '../types';

// using shared SectionHeader component

const GoalsScreen: React.FC = () => {
  const { goals, toggleComplete, deleteGoal } = useGoals();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any | null>(null);

  const currentGoals = useMemo<Goal[]>(() => {
    return goals
      .filter(g => !g.completed)
      .map(g => ({
        id: g.id,
        icon: (g.icon ?? 'target') as any,
        iconBgColor: (g.accent ?? 'purple') as any,
        title: g.title,
        target: g.units === '%' ? `${g.targetValue}%` : String(g.targetValue),
        currentValue: g.units === '%' ? `Current: ${g.currentValue}%` : `Current: ${g.currentValue}`,
        progress: Math.round(g.progressPct),
        status: g.status === 'ahead' ? 'Ahead' : g.status === 'completed' ? 'Achieved!' : 'On Track',
      }));
  }, [goals]);

  const completedGoals = useMemo<Goal[]>(() => {
    return goals
      .filter(g => g.completed)
      .map(g => ({
        id: g.id,
        icon: (g.icon ?? 'target') as any,
        iconBgColor: (g.accent ?? 'green') as any,
        title: g.title,
        target: g.units === '%' ? `${g.targetValue}%` : String(g.targetValue),
        currentValue: g.units === '%' ? `Achieved: ${g.currentValue}%` : `Achieved: ${g.currentValue}`,
        progress: 100,
        status: 'Achieved!',
      }));
  }, [goals]);

  const onAdd = () => {
    setEditingGoal(null);
    setEditorOpen(true);
  };

  const onEdit = (id: string) => {
    const g = goals.find(x => x.id === id) || null;
    setEditingGoal(g);
    setEditorOpen(true);
  };

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Erica" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>My Goals</Text>
          <Text style={styles.subtitle}>Track your progress and celebrate your achievements.</Text>
        </View>

        <ProgressRing />

        <View style={styles.content}>
          <SectionHeader
            title="Current Goals"
            rightElement={<TouchableOpacity onPress={onAdd} style={styles.addButton}><Text style={styles.addButtonText}>+ Add Goal</Text></TouchableOpacity>}
          />
          <View style={styles.goalsList}>
            {currentGoals.map((goal) => (
              <TouchableOpacity key={goal.id} onLongPress={() => onEdit(goal.id)}>
                <GoalCard {...goal} />
                <View style={styles.rowActions}>
                  <TouchableOpacity onPress={() => toggleComplete(goal.id)}><Text style={styles.action}>Complete</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteGoal(goal.id)}><Text style={styles.actionDanger}>Delete</Text></TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Badges" />
          <BadgesGrid />
        </View>

        <View style={styles.content}>
          <SectionHeader title="Completed Goals" />
          <View style={styles.goalsList}>
            {completedGoals.map((goal) => (
              <CompletedGoalItem key={goal.id} goal={goal} />
            ))}
          </View>
        </View>
      </ScrollView>
      <GoalEditorModal visible={editorOpen} onClose={() => setEditorOpen(false)} editing={editingGoal} />
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
  addButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rowActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 6,
  },
  action: {
    color: '#10B981',
    fontWeight: '600',
  },
  actionDanger: {
    color: '#EF4444',
    fontWeight: '600',
  },
});

export default GoalsScreen;
