import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../Icon';

interface ChartCardProps {
  title: string;
  currentStat: string;
  statChange: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, currentStat, statChange, children }) => {
  const isPositive = statChange.startsWith('+');

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.stats}>
            <Text style={styles.currentStat}>{currentStat}</Text>
            <Text style={[styles.statChange, isPositive ? styles.positive : styles.negative]}>
              {statChange}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>By Game</Text>
          <Icon name="chevronDown" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>{children}</View>
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
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  currentStat: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4F46E5',
  },
  statChange: {
    fontSize: 14,
    fontWeight: '700',
  },
  positive: {
    color: '#10B981',
  },
  negative: {
    color: '#EF4444',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    marginRight: -8,
    marginTop: -8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  chartContainer: {
    marginTop: 16,
    height: 192,
  },
});

export default ChartCard;

