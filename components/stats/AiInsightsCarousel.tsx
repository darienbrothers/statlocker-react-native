import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon';
import type { AIInsight } from '../../types';

interface AiInsightsCarouselProps {
  insights: AIInsight[];
  onInsightPress?: (insight: AIInsight) => void;
  onDrillPress?: (drillId: string) => void;
  onGoalPress?: (goalId: string) => void;
}

const AiInsightsCarousel: React.FC<AiInsightsCarouselProps> = ({ 
  insights, 
  onInsightPress, 
  onDrillPress,
  onGoalPress,
}) => {
  if (insights.length === 0) {
    return null;
  }

  const handleCTA = (insight: AIInsight) => {
    if (insight.drillId && onDrillPress) {
      onDrillPress(insight.drillId);
    } else if (insight.goalId && onGoalPress) {
      onGoalPress(insight.goalId);
    } else if (onInsightPress) {
      onInsightPress(insight);
    }
  };

  const getIconForType = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend':
        return 'chart';
      case 'strength':
        return 'trophy';
      case 'focus':
        return 'target';
      case 'achievement':
        return 'sparkles';
      default:
        return 'brain';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>AI Insights</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {insights.map((insight) => (
          <View key={insight.id} style={styles.card}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Icon name={getIconForType(insight.type)} size={20} color="#4F46E5" />
              </View>
              <Text style={styles.type}>{insight.type}</Text>
            </View>
            <Text style={styles.title}>{insight.title}</Text>
            <Text style={styles.description}>{insight.description}</Text>
            {insight.cta && (
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={() => handleCTA(insight)}
                activeOpacity={0.7}
              >
                <Text style={styles.ctaText}>{insight.cta}</Text>
                <Icon name="arrowRight" size={16} color="#4F46E5" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
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
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 280,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  type: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
    marginRight: 4,
  },
});

export default AiInsightsCarousel;

