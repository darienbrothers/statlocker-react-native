import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { getAppVersion } from '../../utils/settingsMock';

export default function AboutCard() {
  const version = getAppVersion();
  const openUrl = (url: string) => Linking.openURL(url).catch(() => Alert.alert('Unable to open'));

  const Row = ({ label, onPress, last }: { label: string; onPress: () => void; last?: boolean }) => (
    <TouchableOpacity onPress={onPress} className={`px-4 py-3 ${last ? '' : 'border-b border-slate-200 dark:border-slate-700'}`}>
      <Text className="text-ink-title">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="px-5 py-4">
      <View className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <View className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Text className="text-ink-subtle text-sm">Version</Text>
          <Text className="text-ink-title mt-1">{version}</Text>
        </View>
        <Row label="Terms of Service" onPress={() => openUrl('https://statlocker.app/terms')} />
        <Row label="Privacy Policy" onPress={() => openUrl('https://statlocker.app/privacy')} />
        <Row label="Credits" onPress={() => Alert.alert('Credits', 'Erica Brothers, Darien Brothers')} last />
      </View>
    </View>
  );
}


