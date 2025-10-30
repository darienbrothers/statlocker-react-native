import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Goal, AccentColor } from '../../types';
import { Icon } from '../Icon';

interface CompletedGoalItemProps {
  goal: Goal;
}

const accentColors: Record<AccentColor, { bg: string; text: string }> = {
  purple: { bg: 'rgba(139, 92, 246, 0.2)', text: '#8B5CF6' },
  green: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10B981' },
  blue: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3B82F6' },
  orange: { bg: 'rgba(249, 115, 22, 0.2)', text: '#F97316' },
  cyan: { bg: 'rgba(6, 182, 212, 0.2)', text: '#06B6D4' },
  red: { bg: 'rgba(239, 68, 68, 0.2)', text: '#EF4444' },
};

const CompletedGoalItem: React.FC<CompletedGoalItemProps> = ({ goal }) => {
  const colors = accentColors[goal.iconBgColor];

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
        <Icon name="check" size={24} color={colors.text} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{goal.title}</Text>
        <Text style={styles.currentValue}>{goal.currentValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  currentValue: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default CompletedGoalItem;

