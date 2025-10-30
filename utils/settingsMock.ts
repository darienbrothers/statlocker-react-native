import { useMemo, useState } from 'react';

// Version helpers
export function getAppVersion(): string {
  try {
    // Lazy require to avoid hard dependency if not in runtime
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Constants = require('expo-constants').default;
    const version: string | undefined = Constants?.expoConfig?.version || Constants?.manifest?.version;
    return version || 'v0.0.0';
  } catch {
    return 'v0.0.0';
  }
}

// Mock user & plan
export type MockUser = {
  name: string;
  gradYear: number;
  position: string;
  avatarUrl: string;
};

export type MockPlan = {
  planName: 'Free' | 'Pro' | 'Elite';
  renewalLabel?: string; // e.g., "renews May 12, 2025"
};

export function getMockUser(): MockUser {
  return {
    name: 'Erica Brothers',
    gradYear: 2026,
    position: 'Goalie',
    avatarUrl: 'https://i.pravatar.cc/100?img=68',
  };
}

export function getMockPlan(): MockPlan {
  return {
    planName: 'Pro',
    renewalLabel: 'renews May 12, 2025',
  };
}

// Settings local state (UI-only)
export type ThemeOption = 'light' | 'dark' | 'system';
export type FontSizeOption = 'small' | 'default' | 'large';

export type QuietHours = {
  enabled: boolean;
  start: string; // "22:00"
  end: string;   // "07:00"
};

export type NotificationPrefs = {
  gameReminders: boolean;
  coachMessages: boolean;
  badgeUnlocks: boolean;
  aiInsights: boolean;
  promotional: boolean;
  quietHours: QuietHours;
};

export type PrivacyPrefs = {
  publicProfile: boolean;
  allowCoachesView: boolean;
  hideNameOnLeaderboards: boolean;
};

export type AppearancePrefs = {
  theme: ThemeOption;
  fontSize: FontSizeOption;
};

export type SettingsState = {
  notifications: NotificationPrefs;
  privacy: PrivacyPrefs;
  appearance: AppearancePrefs;
};

export function useSettingsState() {
  const [state, setState] = useState<SettingsState>({
    notifications: {
      gameReminders: true,
      coachMessages: true,
      badgeUnlocks: true,
      aiInsights: true,
      promotional: false,
      quietHours: { enabled: false, start: '22:00', end: '07:00' },
    },
    privacy: {
      publicProfile: true,
      allowCoachesView: true,
      hideNameOnLeaderboards: false,
    },
    appearance: {
      theme: 'system',
      fontSize: 'default',
    },
  });

  const actions = useMemo(() => ({
    setNotification<K extends keyof NotificationPrefs>(key: K, value: NotificationPrefs[K]) {
      setState((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [key]: value },
      }));
    },
    setQuietHours(value: QuietHours) {
      setState((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, quietHours: value },
      }));
    },
    setPrivacy<K extends keyof PrivacyPrefs>(key: K, value: PrivacyPrefs[K]) {
      setState((prev) => ({ ...prev, privacy: { ...prev.privacy, [key]: value } }));
    },
    setAppearance<K extends keyof AppearancePrefs>(key: K, value: AppearancePrefs[K]) {
      setState((prev) => ({ ...prev, appearance: { ...prev.appearance, [key]: value } }));
    },
    reset() {
      setState({
        notifications: {
          gameReminders: true,
          coachMessages: true,
          badgeUnlocks: true,
          aiInsights: true,
          promotional: false,
          quietHours: { enabled: false, start: '22:00', end: '07:00' },
        },
        privacy: {
          publicProfile: true,
          allowCoachesView: true,
          hideNameOnLeaderboards: false,
        },
        appearance: {
          theme: 'system',
          fontSize: 'default',
        },
      });
    },
  }), []);

  return { state, ...actions };
}


