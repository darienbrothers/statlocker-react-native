import React from 'react';
import { View, Text } from 'react-native';
import { useGoals } from '../../contexts/goals';

// Simple fallback ring using a circle number + caption (no react-native-svg requirement)
export const ProgressRing: React.FC = () => {
  const { daysActive } = useGoals();
  return (
    <View className="items-center justify-center py-4">
      <View className="w-28 h-28 rounded-full items-center justify-center border-4 border-brand-primary">
        <Text className="font-outfit-bold text-2xl text-ink-title">{daysActive}</Text>
        <Text className="text-ink-subtle text-xs">Active Days</Text>
      </View>
      <Text className="mt-2 text-ink-subtle">Keep your streak alive</Text>
    </View>
  );
};

export default ProgressRing;


