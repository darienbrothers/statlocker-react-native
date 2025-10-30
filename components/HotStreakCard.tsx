import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import type { Streak } from '../types';

interface HotStreakCardProps {
  streak: Streak;
}

const HotStreakCard: React.FC<HotStreakCardProps> = ({ streak }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon name={streak.icon} size={24} color="#F97316" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{streak.title}</Text>
        <Text style={styles.description}>{streak.description}</Text>
      </View>
      <Text style={styles.count}>{streak.count}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    color: '#1D2333',
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  count: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F97316',
  },
});

export default HotStreakCard;

