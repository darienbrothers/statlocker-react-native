import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../Icon';
import type { Badge } from '../../types';

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const iconColor = badge.isEarned ? '#F97316' : '#6B7280';
  const bgColor = badge.isEarned ? 'rgba(249, 115, 22, 0.1)' : '#E5E7EB';

  return (
    <View style={[styles.card, { opacity: badge.isEarned ? 1 : 0.4 }]}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Icon name={badge.icon} size={32} color={iconColor} />
      </View>
      <Text style={styles.title}>{badge.title}</Text>
      <Text style={styles.description}>{badge.description}</Text>
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
    alignItems: 'center',
    width: '48%',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1D2333',
    marginTop: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default BadgeCard;

