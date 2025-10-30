import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../../types';

interface AiCalloutCardProps {
  title: string;
  description: string;
  icon: IconName;
}

const AiCalloutCard: React.FC<AiCalloutCardProps> = ({ title, description, icon }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={20} color="#FFFFFF" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#4F46E5',
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
    fontSize: 16,
    color: '#4F46E5',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default AiCalloutCard;

