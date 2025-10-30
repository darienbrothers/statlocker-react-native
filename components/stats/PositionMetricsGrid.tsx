import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MetricCard from '../MetricCard';
import { getMetricsForPosition } from '../../utils/positionMetrics';
import type { Position } from '../../types';
import { getCurrentStats, getSeasonAverages } from '../../utils/mockStatsData';

interface PositionMetricsGridProps {
  position: Position;
  onMetricPress?: (metricId: string) => void;
}

const PositionMetricsGrid: React.FC<PositionMetricsGridProps> = ({ position, onMetricPress }) => {
  const metrics = getMetricsForPosition(position);
  const currentStats = getCurrentStats(position);
  const seasonAverages = getSeasonAverages(position);

  const handleMetricPress = (metricId: string) => {
    if (onMetricPress) {
      onMetricPress(metricId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Position Metrics</Text>
      <View style={styles.grid}>
        {metrics.map((metric) => {
          const currentValue = currentStats[metric.id as keyof typeof currentStats] || 0;
          const seasonAvg = seasonAverages[metric.id as keyof typeof seasonAverages] || 0;
          const delta = currentValue - seasonAvg;
          
          let displayValue: string;
          if (metric.unit === '%') {
            displayValue = `${currentValue.toFixed(1)}%`;
          } else if (metric.unit === 'count') {
            displayValue = currentValue.toString();
          } else {
            displayValue = currentValue.toFixed(1);
          }
          
          const deltaText = delta > 0 
            ? `+${delta.toFixed(1)}${metric.unit} vs season`
            : `${delta.toFixed(1)}${metric.unit} vs season`;

          return (
            <TouchableOpacity 
              key={metric.id} 
              style={styles.metricWrapper}
              onPress={() => handleMetricPress(metric.id)}
              activeOpacity={0.7}
            >
              <MetricCard
                icon={metric.icon}
                iconBgColor={metric.iconBgColor}
                title={metric.title}
                value={displayValue}
                delta={deltaText}
                subtitle={metric.purpose}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricWrapper: {
    width: '48%',
    marginBottom: 8,
  },
});

export default PositionMetricsGrid;

