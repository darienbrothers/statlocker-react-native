import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import type { AccentColor, IconName } from '../types';

interface MetricCardProps {
  icon: IconName;
  iconBgColor: AccentColor;
  title: string;
  value: string;
  delta?: string;
  subtitle: string;
}

const accentColors: Record<AccentColor, { bg: string; text: string }> = {
  purple: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8B5CF6' },
  green: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
  blue: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
  orange: { bg: 'rgba(249, 115, 22, 0.1)', text: '#F97316' },
  cyan: { bg: 'rgba(6, 182, 212, 0.1)', text: '#06B6D4' },
  red: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
};

const MetricCard: React.FC<MetricCardProps> = ({ icon, iconBgColor, title, value, delta, subtitle }) => {
  const colors = accentColors[iconBgColor];
  
  const isPositive = delta && delta.startsWith('+');
  const deltaColor = isPositive ? '#10B981' : '#EF4444';

  return (
    <View style={styles.card}>
      <View>
        <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
          <Icon name={icon} size={20} color={colors.text} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={[styles.subtitle, { color: delta ? deltaColor : '#6B7280' }]}>
        {delta || subtitle}
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
    width: '48%',
    justifyContent: 'space-between',
    minHeight: 140,
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2333',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default MetricCard;

