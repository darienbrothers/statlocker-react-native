import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LinearGradient } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Icon } from '../Icon';
import type { IconName, AIInsight } from '../../types';

interface AiCalloutCardProps {
  insight?: AIInsight;
  title?: string;
  description?: string;
  icon?: IconName;
  onViewBreakdown?: () => void;
  empty?: boolean;
}

const AiCalloutCard: React.FC<AiCalloutCardProps> = ({ 
  insight, 
  title, 
  description, 
  icon, 
  onViewBreakdown,
  empty = false,
}) => {
  const displayTitle = insight?.title || title || '';
  const displayDescription = insight?.description || description || '';
  const displayIcon = insight?.type === 'trend' ? 'chart' : 
                      insight?.type === 'strength' ? 'trophy' :
                      insight?.type === 'focus' ? 'target' : 
                      icon || 'stats';

  if (empty) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyText}>Play 3+ games to unlock insights.</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <ExpoLinearGradient
        colors={['#4F46E5', '#10B981']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <Icon name={displayIcon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{displayTitle}</Text>
          <Text style={styles.description}>{displayDescription}</Text>
          {insight?.cta && onViewBreakdown && (
            <TouchableOpacity 
              style={styles.ctaButton} 
              onPress={onViewBreakdown}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaText}>{insight.cta}</Text>
              <Icon name="arrowRight" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </ExpoLinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 4,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 4,
  },
  emptyCard: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default AiCalloutCard;

