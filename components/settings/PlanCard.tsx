import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getMockPlan } from '../../utils/settingsMock';

export default function PlanCard() {
  const plan = getMockPlan();

  return (
    <View className="px-5 py-4">
      <View className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-ink-title font-outfit-bold text-base">{plan.planName} Plan</Text>
            {plan.renewalLabel ? (
              <Text className="text-ink-subtle text-xs mt-1">{plan.renewalLabel}</Text>
            ) : null}
          </View>
          <View className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900">
            <Text className="text-emerald-700 dark:text-emerald-200 text-xs">Active</Text>
          </View>
        </View>

        <Text className="text-ink-subtle text-sm mt-3">
          Full AI insights, badges, recruiting tools
        </Text>

        <TouchableOpacity
          accessibilityLabel="Manage Subscription"
          onPress={() => Alert.alert('Coming soon')}
          className="mt-4 bg-ink-title/90 rounded-lg px-4 py-2"
        >
          <Text className="text-white text-center">Manage Subscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


