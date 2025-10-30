# StatLocker Typography

Outfit + Inter Tight in React Native (Expo) with NativeWind

## 0) Why this pairing

- Outfit → headlines only (athletic, bold, confident).
- Inter Tight → UI/body/data (crisp, compact, numeric clarity).
- Look = sports branding × data dashboard.

## 1) Add the files

Place the static TTFs you already have:

- assets/fonts/Outfit/Outfit-Regular.ttf
- assets/fonts/Outfit/Outfit-Medium.ttf
- assets/fonts/Outfit/Outfit-SemiBold.ttf
- assets/fonts/Outfit/Outfit-Bold.ttf

- assets/fonts/InterTight/InterTight-Regular.ttf
- assets/fonts/InterTight/InterTight-Medium.ttf
- assets/fonts/InterTight/InterTight-SemiBold.ttf
- assets/fonts/InterTight/InterTight-Bold.ttf

## 2) Configure Expo

app.json / app.config.ts

```json
{
  "expo": {
    "assetBundlePatterns": ["**/*"],
    "plugins": [["expo-font"]]
  }
}
```

Install deps:

```bash
expo install expo-font
```

## 3) Load fonts (App.tsx)

```tsx
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  const [ready] = useFonts({
    Outfit_400: require("./assets/fonts/Outfit/Outfit-Regular.ttf"),
    Outfit_500: require("./assets/fonts/Outfit/Outfit-Medium.ttf"),
    Outfit_600: require("./assets/fonts/Outfit/Outfit-SemiBold.ttf"),
    Outfit_700: require("./assets/fonts/Outfit/Outfit-Bold.ttf"),

    InterTight_400: require("./assets/fonts/InterTight/InterTight-Regular.ttf"),
    InterTight_500: require("./assets/fonts/InterTight/InterTight-Medium.ttf"),
    InterTight_600: require("./assets/fonts/InterTight/InterTight-SemiBold.ttf"),
    InterTight_700: require("./assets/fonts/InterTight/InterTight-Bold.ttf"),
  });

  if (!ready)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return <RootLayout />; // your router/layout
}
```

## 4) NativeWind setup (Tailwind)

Install:

```bash
npm i nativewind tailwindcss
npx tailwindcss init
```

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // UI default
        sans: ["InterTight_400", "System"],
        // Headlines only
        display: ["Outfit_700", "System"],
        outfit: ["Outfit_600", "System"],
        inter: ["InterTight_400", "System"],
      },
      fontSize: {
        // app scale (light mode first)
        h1: ["28px", { lineHeight: "34px" }], // displayLarge
        h2: ["24px", { lineHeight: "30px" }], // displayMedium
        h3: ["20px", { lineHeight: "26px" }], // headline
        body: ["14px", { lineHeight: "20px" }],
        "body-lg": ["16px", { lineHeight: "22px" }],
        caption: ["12px", { lineHeight: "16px" }],
        stat: ["24px", { lineHeight: "28px" }], // big number
      },
      colors: {
        // light palette
        base: "#F9FAFB",
        card: "#FFFFFF",
        ink: {
          DEFAULT: "#111827",
          subtle: "#6B7280",
        },
        brand: {
          primary: "#6366F1",
          accent: "#10B981",
        },
        line: "#E5E7EB",
        warn: "#F59E0B",
        danger: "#EF4444",
      },
      borderRadius: {
        xl: 20,
      },
      boxShadow: {
        card: "0 8px 16px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
```

## 5) Text helpers (optional but recommended)

Create a tiny wrapper so typography is consistent.

`src/ui/Text.tsx`

```tsx
import { Text as RNText, TextProps } from "react-native";
import React from "react";
import { cn } from "./cn"; // your className combiner if you have one

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "stat"
  | "body"
  | "body-lg"
  | "caption"
  | "label";

export function Text({ className, children, ...rest }: TextProps & { variant?: Variant }) {
  const variant = (rest as any).variant as Variant;

  const map: Record<Variant, string> = {
    h1: "font-display text-h1 text-ink",
    h2: "font-display text-h2 text-ink",
    h3: "font-outfit text-h3 text-ink",
    stat: "font-inter font-semibold text-stat text-ink",
    body: "font-inter text-body text-ink",
    "body-lg": "font-inter text-body-lg text-ink",
    caption: "font-inter text-caption text-ink-subtle",
    label: "font-inter font-semibold text-[14px] text-ink",
  };

  const vClass = map[variant ?? "body"];
  return (
    <RNText className={cn(vClass, className)} {...rest}>
      {children}
    </RNText>
  );
}
```

Usage:

```tsx
<Text variant="h1">What brings you to StatLocker?</Text>
<Text variant="caption">Pick all that fit — this tunes your Locker.</Text>
<Text variant="stat">62%</Text>
```

## 6) Where to use which font (quick map)

Outfit (headlines only):

- Onboarding step titles, section headers, dashboard hero, AI insight titles, drill titles.

Inter Tight (everything else):

- Body, labels, inputs, buttons, chips, list rows, chat bubbles, numbers (stats).

Recommended weights:

- Outfit: 700 (big titles), 600 (section/card headers).
- Inter Tight: 400 (body), 500/600 (labels/buttons), 700 (stats).

## 7) Design tokens (copy into your theme docs)

- Background.Base `#F9FAFB`
- Card.Surface `#FFFFFF`
- Text.Primary `#111827`
- Text.Secondary `#6B7280`
- Brand.Primary `#6366F1`
- Brand.Accent `#10B981`
- Line `#E5E7EB`
- Progress Gradient `linear(180deg,#6366F1,#10B981)`

## 8) QA checklist

- Default font visually looks like Inter Tight (headlines switch to Outfit).
- Onboarding screens use ≤ 3 text sizes each.
- Buttons use Inter Tight 600 / 14 consistently.
- Stat numbers use Inter Tight 700 / 20–24.
- Caption/microcopy uses 12–13 and the subtle color (ink.subtle).

## 9) Troubleshooting

- Android bold not applying? Ensure you loaded the exact weight file and referenced the right family (InterTight_700, Outfit_700).
- Fonts not found in prod EAS build? Confirm `assetBundlePatterns: ["**/*"]` and paths are correct.
- Text looks cramped? Use InterTight_500 for labels, keep body at 400. Reduce letter-spacing rather than bumping size.

I will add my fonts and logo after.
