import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import type { Goal, AccentColor } from '../types';

interface GoalCardProps extends Goal {}

const accentColors: Record<AccentColor, { bg: string; text: string }> = {
  purple: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8B5CF6' },
  green: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
  blue: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
  orange: { bg: 'rgba(249, 115, 22, 0.1)', text: '#F97316' },
  cyan: { bg: 'rgba(6, 182, 212, 0.1)', text: '#06B6D4' },
  red: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
};

const statusStyles = {
  'Ahead': { text: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  'On Track': { text: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  'Achieved!': { text: '#4F46E5', bg: 'rgba(79, 70, 229, 0.1)' },
};

const ProgressBar: React.FC<{ progress: number; color: AccentColor }> = ({ progress, color }) => {
  const colors = accentColors[color];
  return (
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressBar,
          { backgroundColor: colors.text, width: `${progress}%` },
        ]}
      />
    </View>
  );
};

const GoalCard: React.FC<GoalCardProps> = ({ icon, iconBgColor, title, currentValue, progress, status }) => {
  const colors = accentColors[iconBgColor];
  const { text, bg } = statusStyles[status];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
            <Icon name={icon} size={24} color={colors.text} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.currentValue}>{currentValue}</Text>
          </View>
        </View>
        <Text style={styles.progress}>
          {progress}% <Text style={styles.completion}>Comp.</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <ProgressBar progress={progress} color={iconBgColor} />
        <View style={[styles.badge, { backgroundColor: bg }]}>
          <Text style={[styles.badgeText, { color: text }]}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    color: '#1D2333',
    fontSize: 16,
    lineHeight: 20,
  },
  currentValue: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  progress: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
  },
  completion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    height: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default GoalCard;

