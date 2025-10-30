import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { QuarterStats } from '../../types';

type Props = {
  stats: QuarterStats[]; // expects 4 items for Q1..Q4
  title?: string;
};

export const QuarterBreakdown: React.FC<Props> = ({ stats, title = 'Quarter Breakdown' }) => {
  const maxPct = Math.max(1, ...stats.map(s => s.savePct || 0));
  const bestQuarter = stats.reduce((best, s) => ((s.savePct || 0) > (best.savePct || 0) ? s : best), stats[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ gap: 10 }}>
        {stats.map(s => {
          const widthPct = Math.max(5, Math.round(((s.savePct || 0) / maxPct) * 100));
          const isBest = s.quarter === bestQuarter.quarter;
          return (
            <View key={`q${s.quarter}`}>
              <View style={styles.rowHeader}>
                <Text style={styles.qLabel}>Q{s.quarter}</Text>
                <Text style={[styles.qValue, isBest && styles.qValueBest]}>{(s.savePct || 0).toFixed(0)}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${widthPct}%` }, isBest && styles.barBest]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  qLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  qValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  qValueBest: {
    color: '#10B981',
    fontWeight: '700',
  },
  barTrack: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: 10,
    backgroundColor: '#818CF8',
  },
  barBest: {
    backgroundColor: '#10B981',
  },
});

export default QuarterBreakdown;


