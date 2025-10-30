import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import type { Milestone } from '../../utils/mockRecruiting';

type Props = {
  milestones: Milestone[];
  onPressMilestone?: (m: Milestone) => void;
};

export default function RoadmapTimeline({ milestones, onPressMilestone }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
      {milestones.map((m) => (
        <TouchableOpacity
          key={m.id}
          onPress={() => onPressMilestone && onPressMilestone(m)}
          className={`px-3 py-2 mr-2 rounded-full border ${
            m.status === 'done' ? 'bg-[#ECFDF5] border-[#10B981]' : m.status === 'snooze' ? 'bg-[#F3F4F6] border-[#D1D5DB]' : 'bg-white border-[#E5E7EB]'
          }`}
        >
          <Text className="text-[12px] font-intertight-medium text-ink-title">{m.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}


