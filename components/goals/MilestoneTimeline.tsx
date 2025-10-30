import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const nodes = [
  { id: 'm1', title: 'Week 1', achieved: true },
  { id: 'm2', title: 'Week 2', achieved: true },
  { id: 'm3', title: 'Week 3', achieved: false },
  { id: 'm4', title: 'Week 4', achieved: false },
  { id: 'm5', title: 'Week 5', achieved: false },
];

export const MilestoneTimeline: React.FC = () => {
  return (
    <View className="mt-2">
      <Text className="font-outfit-bold text-lg text-ink-title mb-2">Milestones</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row items-center gap-4">
          {nodes.map((n, idx) => (
            <View key={n.id} className="items-center">
              <View className={`w-10 h-10 rounded-full ${n.achieved ? 'bg-brand-accent' : 'bg-slate-200'}`} />
              <Text className="text-xs mt-1 text-ink-subtle">{n.title}</Text>
              {idx < nodes.length - 1 && <View className="w-12 h-[2px] bg-slate-300 mt-[-20]" />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MilestoneTimeline;


