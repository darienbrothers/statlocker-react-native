import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

type SettingsSectionProps = PropsWithChildren<{
  title: string;
}>;

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View className="px-5 py-4">
      <Text className="text-ink-title font-outfit-bold text-lg mb-3">{title}</Text>
      <View className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {children}
      </View>
    </View>
  );
}


