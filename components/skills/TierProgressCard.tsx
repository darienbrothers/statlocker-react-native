import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Tier } from '../../types';

interface TierProgressCardProps {
  tier: Tier;
  progress: number;
  completed: number;
  total: number;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

const TierProgressCard: React.FC<TierProgressCardProps> = ({ tier, progress, completed, total }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{tier} Progress</Text>
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar progress={progress} />
      </View>
      <Text style={styles.completionText}>
        {completed} of {total} drills completed
      </Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
  },
  percentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
  },
  progressWrapper: {
    marginTop: 12,
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#4F46E5',
    height: 10,
    borderRadius: 999,
  },
  completionText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 8,
  },
});

export default TierProgressCard;

