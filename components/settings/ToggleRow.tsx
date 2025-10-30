import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

type ToggleRowProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  subtitle?: string;
  onPressLabel?: () => void;
  testID?: string;
  last?: boolean;
};

export default function ToggleRow({ label, value, onValueChange, subtitle, onPressLabel, testID, last }: ToggleRowProps) {
  const LabelComponent = onPressLabel ? TouchableOpacity : View;

  return (
    <View className={`px-4 py-3 flex-row items-center justify-between ${last ? '' : 'border-b border-slate-200 dark:border-slate-700'}`}>
      <LabelComponent accessibilityRole="button" onPress={onPressLabel} className="flex-1 pr-3">
        <Text className="text-ink-title text-base">{label}</Text>
        {subtitle ? <Text className="text-ink-subtle text-xs mt-1">{subtitle}</Text> : null}
      </LabelComponent>
      <Switch value={value} onValueChange={onValueChange} testID={testID} />
    </View>
  );
}


