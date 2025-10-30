import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, Share } from 'react-native';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsSection from '../components/settings/SettingsSection';
import ToggleRow from '../components/settings/ToggleRow';
import PlanCard from '../components/settings/PlanCard';
import SupportCard from '../components/settings/SupportCard';
import AboutCard from '../components/settings/AboutCard';
import { getMockUser, useSettingsState } from '../utils/settingsMock';

export default function SettingsScreen() {
  const user = getMockUser();
  const { state, setNotification, setQuietHours, setPrivacy, setAppearance } = useSettingsState();

  const navigateToProfile = () => Alert.alert('Navigate', 'Would navigate to Profile tab');
  const onDeleteAccount = () => Alert.alert('Delete Account', 'This is a stub for MVP');
  const onShareCard = async () => {
    try {
      await Share.share({ message: `${user.name} • ${user.position} (${user.gradYear}) — Check out my StatLocker profile!` });
    } catch {
      Alert.alert('Unable to share');
    }
  };
  const onSignOut = () => Alert.alert('Signed out', 'Signed out successfully.');

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <SettingsHeader />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* Account */}
        <SettingsSection title="Account">
          <View>
            <TouchableOpacity onPress={navigateToProfile} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <Text className="text-ink-title">Edit Profile</Text>
              <Text className="text-ink-subtle text-xs mt-1">{user.name} • {user.gradYear} • {user.position}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Change Email/Password', 'Coming soon')} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <Text className="text-ink-title">Change Email / Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Manage Devices', 'Coming soon')} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <Text className="text-ink-title">Manage Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteAccount} className="px-4 py-3">
              <Text className="text-red-600">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </SettingsSection>

        {/* Subscription */}
        <PlanCard />

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <ToggleRow label="Game reminders" value={state.notifications.gameReminders} onValueChange={(v) => setNotification('gameReminders', v)} />
          <ToggleRow label="Coach messages" value={state.notifications.coachMessages} onValueChange={(v) => setNotification('coachMessages', v)} />
          <ToggleRow label="Badge unlocks" value={state.notifications.badgeUnlocks} onValueChange={(v) => setNotification('badgeUnlocks', v)} />
          <ToggleRow label="AI insights" value={state.notifications.aiInsights} onValueChange={(v) => setNotification('aiInsights', v)} />
          <ToggleRow label="Promotional content" value={state.notifications.promotional} onValueChange={(v) => setNotification('promotional', v)} last />
        </SettingsSection>

        {/* Quiet Hours */}
        <SettingsSection title="Quiet Hours">
          <View className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <ToggleRow
              label="Enable Quiet Hours"
              value={state.notifications.quietHours.enabled}
              onValueChange={(v) => setQuietHours({ ...state.notifications.quietHours, enabled: v })}
              last
            />
          </View>
          <View className="px-4 py-3">
            <Text className="text-ink-subtle text-xs mb-1">Range</Text>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => Alert.alert('Time Picker', 'Start time — Coming soon')} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 mr-3">
                <Text className="text-ink-title">{state.notifications.quietHours.start}</Text>
              </TouchableOpacity>
              <Text className="text-ink-subtle">to</Text>
              <TouchableOpacity onPress={() => Alert.alert('Time Picker', 'End time — Coming soon')} className="ml-3 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                <Text className="text-ink-title">{state.notifications.quietHours.end}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SettingsSection>

        {/* Privacy & Sharing */}
        <SettingsSection title="Privacy & Sharing">
          <ToggleRow label="Public Profile" value={state.privacy.publicProfile} onValueChange={(v) => setPrivacy('publicProfile', v)} />
          <ToggleRow label="Allow Coaches to view stats" value={state.privacy.allowCoachesView} onValueChange={(v) => setPrivacy('allowCoachesView', v)} />
          <ToggleRow label="Hide my name in team leaderboards" value={state.privacy.hideNameOnLeaderboards} onValueChange={(v) => setPrivacy('hideNameOnLeaderboards', v)} />
          <View className="border-t border-slate-200 dark:border-slate-700" />
          <View className="px-4 py-3">
            <TouchableOpacity onPress={onShareCard} className="px-4 py-2 bg-slate-900 rounded-lg">
              <Text className="text-white text-center">Share Player Card</Text>
            </TouchableOpacity>
          </View>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection title="Appearance">
          <View className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <Text className="text-ink-subtle text-xs mb-2">Theme</Text>
            <View className="flex-row">
              {(['light','dark','system'] as const).map((t) => (
                <TouchableOpacity key={t} onPress={() => setAppearance('theme', t)} className={`mr-2 px-3 py-2 rounded-lg ${state.appearance.theme === t ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  <Text className={`${state.appearance.theme === t ? 'text-white' : 'text-ink-title'}`}>{t[0].toUpperCase() + t.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="px-4 py-3">
            <Text className="text-ink-subtle text-xs mb-2">Font size</Text>
            <View className="flex-row">
              {(['small','default','large'] as const).map((s) => (
                <TouchableOpacity key={s} onPress={() => setAppearance('fontSize', s)} className={`mr-2 px-3 py-2 rounded-lg ${state.appearance.fontSize === s ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  <Text className={`${state.appearance.fontSize === s ? 'text-white' : 'text-ink-title'}`}>{s[0].toUpperCase() + s.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SettingsSection>

        {/* Support & Feedback */}
        <SupportCard />

        {/* About */}
        <AboutCard />

        {/* Sign Out */}
        <View className="px-5 py-6">
          <TouchableOpacity onPress={onSignOut} className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-3 rounded-xl">
            <Text className="text-red-600 dark:text-red-300 text-center">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


