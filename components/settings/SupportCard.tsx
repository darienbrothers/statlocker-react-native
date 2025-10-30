import React from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';

export default function SupportCard() {
  const openHelp = () => Linking.openURL('https://support.statlocker.app').catch(() => Alert.alert('Unable to open'));
  const openFaq = () => Alert.alert('FAQ', 'Coming soon');
  const reportBug = () => Linking.openURL('mailto:support@statlocker.com?subject=Bug Report').catch(() => Alert.alert('Unable to open mail'));
  const giveFeedback = () => Alert.alert('Feedback', 'We read every message. What can we improve?');

  const Item = ({ label, onPress, last }: { label: string; onPress: () => void; last?: boolean }) => (
    <TouchableOpacity onPress={onPress} className={`px-4 py-3 ${last ? '' : 'border-b border-slate-200 dark:border-slate-700'}`}>
      <Text className="text-ink-title">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="px-5 py-4">
      <View className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Item label="Help Center" onPress={openHelp} />
        <Item label="FAQ" onPress={openFaq} />
        <Item label="Report a Bug" onPress={reportBug} />
        <Item label="Give Feedback" onPress={giveFeedback} last />
      </View>
    </View>
  );
}


