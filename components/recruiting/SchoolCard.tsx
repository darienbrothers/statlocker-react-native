import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { School, SchoolStatus } from '../../utils/mockRecruiting';

type Props = {
  school: School;
  onPress?: (school: School) => void;
  onChangeStatus?: (schoolId: string, status: SchoolStatus) => void;
  onMove?: (schoolId: string, direction: 'left' | 'right') => void;
};

export default function SchoolCard({ school, onPress, onChangeStatus, onMove }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(school)}
      className="bg-white rounded-xl p-3 border border-[#E5E7EB]"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-2">
          <Text className="font-intertight-semibold text-[15px] text-ink-title" numberOfLines={1}>
            {school.name}
          </Text>
          <Text className="text-ink-subtle text-[12px] mt-0.5">{school.division} • {school.location ?? '—'}</Text>
          <Text className="text-ink-subtle text-[12px] mt-1">Status: {school.status.replace('_', ' ')}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={() => onMove && onMove(school.id, 'left')}>
            <Ionicons name="chevron-back" size={18} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onMove && onMove(school.id, 'right')}>
            <Ionicons name="chevron-forward" size={18} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChangeStatus && onChangeStatus(school.id, nextStatus(school.status))}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function nextStatus(current: SchoolStatus): SchoolStatus {
  const order: SchoolStatus[] = ['not_contacted', 'emailed', 'conversation', 'visit', 'offer'];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}


