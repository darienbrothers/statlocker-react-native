import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import type { Milestone } from '../../utils/mockRecruiting';

type Props = {
  visible: boolean;
  milestone?: Milestone;
  onClose: () => void;
  onMarkDone?: (id: string) => void;
  onSnooze?: (id: string) => void;
};

export default function MilestoneSheet({ visible, milestone, onClose, onMarkDone, onSnooze }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/30">
        <View className="bg-white rounded-t-3xl p-4">
          <View className="w-12 h-1.5 bg-[#E5E7EB] self-center rounded-full mb-3" />
          <Text className="font-outfit-bold text-lg text-ink-title mb-1">{milestone?.title}</Text>
          <Text className="text-ink-subtle text-sm mb-4">What & Why, Requirements, and AI Assist (mock)</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity onPress={() => milestone && onMarkDone && onMarkDone(milestone.id)} className="flex-1 bg-[#10B981] rounded-xl p-3">
              <Text className="text-white text-center font-intertight-semibold">Mark Done</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => milestone && onSnooze && onSnooze(milestone.id)} className="flex-1 bg-[#F59E0B] rounded-xl p-3">
              <Text className="text-white text-center font-intertight-semibold">Snooze</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} className="mt-3 p-3">
            <Text className="text-center text-ink-subtle">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


