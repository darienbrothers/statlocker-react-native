# StatLocker Documentation

Welcome to the StatLocker documentation. This repo contains a React Native app (Expo SDK 54, RN 0.81) focused on athlete development, performance tracking, and AI-powered coaching.

## Getting Started

1. Install prerequisites: Node 20+, Xcode/Android Studio, Expo CLI.
2. Install dependencies:
   - `npm install`
3. Run the app:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## App Architecture

- `components/`: Reusable UI (cards, charts, forms, aicoach UI)
- `screens/`: Tab screens (Dashboard, Stats, AI Coach, Skills, Goals)
- `navigation/`: AppNavigator and tab configuration
- `utils/`: Services, fonts
- `types.ts`: Shared types and icon names

State is screen-local with React hooks; navigation via React Navigation. Charts use Victory Native; styles use Tailwind tokens with inline StyleSheet where appropriate.

## UI System

- Typography: Outfit (headlines), InterTight (UI text)
- Color accents: purple primary `#4F46E5` with a neutral slate palette
- Cards: Rounded corners, soft shadows, consistent padding

### Hero Card (current)

- ESPN-style layout
- Verified badge next to player name
- Sport tag (pill)
- HS | Club pill toggle inside card
- Stats: Record, Saves, Games (switch on toggle)
- Team name + Hometown row

## Features

- Game logging (modal, recent/upcoming games)
- AI Coach chat and insights
- Goals with progress
- Skills with tiers and drills
- Stats visualizations (bar/line charts)

## Image Picker

We use `expo-image-picker` with the new API:

```ts
await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ['images'] as any,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
});
```

This replaces deprecated `MediaTypeOptions`.

## Contributing

1. Branch from `main`
2. Conventional commits (feat, fix, chore, docs)
3. PR with screenshots for UI changes

## Roadmap (high-level)

- Profile completion + verification badge gating
- Persistent storage + sync
- Analytics and performance summaries
- Sharing and recruiting profile export
