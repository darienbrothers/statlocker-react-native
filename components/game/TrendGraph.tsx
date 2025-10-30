import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LineChart from '../stats/LineChart';
import type { Position } from '../../types';
import { getTrendForMetric } from '../../utils/mockStatsData';

type Props = {
  title: string;
  metricKey: 'save_pct' | 'gaa' | 'clear_pct';
  position: Position;
};

export const TrendGraph: React.FC<Props> = ({ title, metricKey, position }) => {
  const data = getTrendForMetric(metricKey, position);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart data={data} />
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
});

export default TrendGraph;


