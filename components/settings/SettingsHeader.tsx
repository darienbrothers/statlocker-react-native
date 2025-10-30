import React from 'react';
import { View, Text } from 'react-native';

type SettingsHeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function SettingsHeader({ title = 'Settings', subtitle = 'Customize how you run your Locker.' }: SettingsHeaderProps) {
  return (
    <View className="px-5 pt-6 pb-4 bg-indigo-500">
      <Text className="text-white font-outfit-bold text-2xl">{title}</Text>
      <Text className="text-indigo-100 mt-1">{subtitle}</Text>
    </View>
  );
}


