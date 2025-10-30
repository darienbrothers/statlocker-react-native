import React from 'react';
import { View, Text } from 'react-native';
import SchoolCard from './SchoolCard';
import type { School, SchoolBoard as Board, SchoolStatus } from '../../utils/mockRecruiting';

type Props = {
  title: string;
  board: Board;
  schools: School[];
  onPressSchool?: (school: School) => void;
  onChangeStatus?: (schoolId: string, status: SchoolStatus) => void;
  onMoveAcross?: (schoolId: string, toBoard: Board) => void;
};

export default function SchoolBoard({ title, board, schools, onPressSchool, onChangeStatus, onMoveAcross }: Props) {
  const columnSchools = schools.filter(s => s.board === board);

  return (
    <View className="flex-1 bg-white rounded-2xl p-3">
      <Text className="font-outfit-bold text-base text-ink-title mb-2">{title}</Text>
      <View className="gap-3">
        {columnSchools.map(school => (
          <SchoolCard
            key={school.id}
            school={school}
            onPress={onPressSchool}
            onChangeStatus={onChangeStatus}
            onMove={(id, dir) => {
              if (!onMoveAcross) return;
              const map: Record<Board, { left?: Board; right?: Board }> = {
                reach: { right: 'realistic' },
                realistic: { left: 'reach', right: 'safe' },
                safe: { left: 'realistic' },
              };
              const target = map[school.board][dir];
              if (target) onMoveAcross(id, target);
            }}
          />
        ))}
        {columnSchools.length === 0 && (
          <Text className="text-ink-subtle text-[12px]">No schools yet.</Text>
        )}
      </View>
    </View>
  );
}


