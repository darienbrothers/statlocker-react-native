import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type MetricItem = { key: string; label: string; value: number | string; sublabel?: string };

type Props = {
  metrics: MetricItem[];
  columns?: 3 | 2;
};

export const StatGrid: React.FC<Props> = ({ metrics, columns = 3 }) => {
  return (
    <View style={styles.grid}>
      {metrics.map(item => (
        <View key={item.key} style={[styles.card, columns === 3 ? styles.cardThird : styles.cardHalf]}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{typeof item.value === 'number' ? formatNumber(item.value) : item.value}</Text>
          {item.sublabel ? <Text style={styles.sublabel}>{item.sublabel}</Text> : null}
        </View>
      ))}
    </View>
  );
};

function formatNumber(v: number): string {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(0);
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardThird: {
    width: '31%',
  },
  cardHalf: {
    width: '47%',
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  sublabel: {
    marginTop: 2,
    fontSize: 11,
    color: '#9CA3AF',
  },
});

export default StatGrid;


