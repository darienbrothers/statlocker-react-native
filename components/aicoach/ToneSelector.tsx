import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { AiTone } from '../../types';

interface ToneSelectorProps {
  tone: AiTone;
  onChangeTone: (tone: AiTone) => void;
}

const tones: { key: AiTone; label: string; color: string }[] = [
  { key: 'hype', label: 'Hype', color: '#8B5CF6' },
  { key: 'analyst', label: 'Analyst', color: '#3B82F6' },
  { key: 'mentor', label: 'Mentor', color: '#F59E0B' },
  { key: 'recruiting', label: 'Recruiting', color: '#1E3A8A' },
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ tone, onChangeTone }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {tones.map((t) => {
          const active = t.key === tone;
          return (
            <TouchableOpacity
              key={t.key}
              onPress={() => onChangeTone(t.key)}
              style={[styles.chip, active && { backgroundColor: t.color }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D2333',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});

export default ToneSelector;


