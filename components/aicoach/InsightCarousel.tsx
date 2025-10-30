import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import type { AIInsight } from '../../types';

interface InsightCarouselProps {
  insights: AIInsight[];
  onSelectInsight?: (insight: AIInsight) => void;
}

const InsightCarousel: React.FC<InsightCarouselProps> = ({ insights, onSelectInsight }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Insights</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {insights.map((insight) => (
          <TouchableOpacity
            key={insight.id}
            onPress={() => onSelectInsight && onSelectInsight(insight)}
            activeOpacity={0.85}
            style={styles.card}
          >
            <Text style={styles.title}>{insight.title}</Text>
            <Text style={styles.desc}>{insight.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  scroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default InsightCarousel;


