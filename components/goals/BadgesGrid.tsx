import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useGoals } from '../../contexts/goals';

const BadgeItem: React.FC<{ title: string; unlocked: boolean }> = ({ title, unlocked }) => (
  <View className={`w-[30%] aspect-square rounded-2xl items-center justify-center ${unlocked ? 'bg-white' : 'bg-slate-100'}`}>
    <Text className={`text-center ${unlocked ? 'text-ink-title' : 'text-slate-400'}`}>{title}</Text>
  </View>
);

export const BadgesGrid: React.FC = () => {
  const { badges } = useGoals();
  const sorted = [...badges].sort((a, b) => Number(b.unlocked) - Number(a.unlocked));

  return (
    <View>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="font-outfit-bold text-lg text-ink-title">Badges</Text>
        <Text className="text-ink-subtle text-sm">Latest</Text>
      </View>
      <FlatList
        data={sorted.slice(0, 6)}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        renderItem={({ item }) => (
          <BadgeItem title={item.title} unlocked={item.unlocked} />
        )}
      />
    </View>
  );
};

export default BadgesGrid;


