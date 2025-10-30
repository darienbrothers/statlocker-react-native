# 🧠 StatLocker — Players & Coaches Only (v3)

## 🏷️ Name & Mission

**StatLocker — Your Stats. Your Story. Your Future.**

Turn raw stats into momentum: track, understand, and improve with clarity and confidence.

## 👥 Founders

**Darien Brothers (Co-Founder & CTO)** — D1 athlete, QA engineer, product builder.

**Erica Brothers (Co-Founder & CEO)** — D1 lacrosse goalie, HS coach, sports ops.

**Policy:** No parent accounts. App is for players and coaches only. (A family may use the athlete's login at their discretion.)

## 🚨 The Problem

Players log stats inconsistently and don't know what to do next.

Coaches lack time and tools to give personalized feedback.

Recruiting tasks are confusing and scattered across sites.

Existing "stat apps" show numbers, not meaning.

## 💡 The Solution

StatLocker is a performance OS for high school/club athletes and coaches:

- Effortless logging with position-aware inputs.
- AI insights that translate stats into next actions.
- Goals & skills that close the loop from weakness → training → progress.
- Coach tools for team messaging, dashboards, and accountability.
- Recruiting organizer (education, tasks, school lists)—no video/film.

## 🎯 Target Users

**Primary:** High school & club athletes (13–18).

**Secondary:** Coaches (team management, analytics).

**Future:** Program admins (HS/club), recruiters (view-only tools).

## 🧱 StatLocker MOAT (Defensible Edge)

**AthleteDNA™ (Data Moat):**
Longitudinal, position-aware data: performance trends, context (team/opponent), behavior (log cadence), goals, and response to training.

**AI Coaching Engine (Tech Moat):**
Tone-selectable feedback (Hype/Mentor/Analyst/Captain), goal-linked insights, and next-drill suggestions; increasingly personalized over time.

**Motivation Loop (Behavioral Moat):**
Log → AI insight → goal progress → badge → nudge → repeat. Turns seasonal usage into weekly habits.

**Athlete ↔ Coach Network (Ecosystem Moat):**
Rosters, team chat, shared context, and verified coaches—teams get sticky.

**Brand & Credibility (Brand Moat):**
Built by D1 athletes/coaches with elite UI and clear outcomes (perform better, get organized, tell your story).

## 📲 Product Experience (Onboarding BEFORE Account Creation)

### 0) Splash / Welcome

**Visual:** Jet Black background, Royal Blue logo glow, subtle locker haze animation.

**Copy:**

**Title:** Stat tracking made easy. Progress made visible.

**CTA:** Get Started (primary), Log In (secondary, text link).

### 1) Onboarding Intro Slides (3–4 screens)

**Slide 1 — Track Every Stat**
Every rep counts. Log games with position-specific stats that matter.

**Slide 2 — AI That Gets You**
Turn data into dominance. Your AI Coach learns and guides.

**Slide 3 — Goals & Skills**
See trends, set targets, and train smarter with recommended drills.

**Slide 4 — Built By Athletes**
D1-born. Coach-approved. Made for progress.

**CTA → Build Your Locker**

### 2) Onboarding Steps (no account yet)

**Step A — Role**

Cards: Athlete / Coach (no parent).

Tooltip: Roles are permanent for this account.

**Step B — Sport & Gender**

Lacrosse; Boys/Girls → informs positions & stat schema.

**Step C — Position**

Athlete: Goalie, Attack, Midfield, Defense, LSM, FOGO.

Coach: Team level(s) and focus area(s).

**Step D — Team Context**

Fields: High School, Level (F/JV/Varsity), optional Club toggle → Org & Team name.

**Step E — Season Goals (Athlete)**

Pick up to 3 from position-specific library (quantified).

Microcopy: Choose goals that push you.

**Step F — Tone Style (Athlete)**

Hype / Mentor / Analyst / Captain. Preview sample message.

**Step G — Preview Locker**

Show mock dashboard based on selections (stat cards, example AI insight, goals ring).

**CTA:** Create Account to Save

### 3) Account Creation (after onboarding)

Options: Sign in with Apple, Google, or Email/Password.

Copy: Secure your Locker to sync across devices.

On success → Enter Locker.

## 🏠 Main App Design (Bottom Tabs + FAB)

**Bottom Nav (5 tabs):**

Dashboard

Stats

AI Coach (center tab)

Skills

Goals

**FAB:** Bottom-right floating button → Log Game (Live / After Game / Scan [future]).

### Tab 1 — 🏠 Dashboard (Locker)

**Purpose:** Daily command center; quick confidence and clarity.

**Hero Greeting:** "Welcome back, [Name]. Let's make today count."

**Toggle:** HS | Club (applies to all widgets).

**Stat Cards (position-aware):**

Goalie: Save %, Total Saves, Shots Faced, Goals Against.

Skaters: Goals, Assists, Shots, TOs; specialized (FO% for FOGO, GBs for LSM/DEF).

Microcopy: "+4% from last game," "New season high."

**AI Insights Card (tone-driven):**

"3rd-quarter save % jumped 12%. Keep reaction sharp—add Reflex Drill 2x this week."

**Goals Progress:** Ring + on-track/at-risk/ stretch (GoalPace AI).

**Recent Games Feed:** last 3; tap for game detail.

**Coach View (if role=coach):**

Team Snapshot: upcoming fixtures, last results, "Players needing attention."

Quick Actions: Post Announcement, Message Team, Review Player Stats.

**FAB (bottom-right):** Log Game

- Live (simple +/– counters by position)
- After Game (form with auto-percentages)
- Scan Sheet (future)

### Tab 2 — 📈 Stats

**Purpose:** Turn trends into coaching clarity.

**Header:** Every trend tells a story.

**Filters:** Season | Team | Opponent | Home/Away | Timeframe.

**Charts:**

- Line: Save% / Points per Game over time.
- Bar: Shots by zone (if tracked); Clears success by game.
- Compare: HS vs Club; pre/post injury; last 5 vs season avg.

**AI Callouts:**

"Home games +8% save compared to away. Focus on travel routine."

**Share:** Export Season Card (team colors; name/position, key metrics).

**Coach Add-ons:** Team aggregates, player ranking by metric, trend alerts.

### Tab 3 — 🧠 AI Coach (Center Tab)

**Purpose:** Conversational guidance and instant coaching.

**Chat Threads:**

- Performance Chat: "What should I work on before Saturday?"
- Goal Chat: "Am I pacing for 60% save this month?"
- Scouting/Prep (light): "What should our middies focus on vs. high-tempo teams?"

**Context Buttons:**

Review Last Game, Set Weekly Focus, Recommend Drills, Explain This Trend.

**Tone:** Uses selected style (Hype/Mentor/Analyst/Captain).

**Actions:**

- Add recommended drill to Skills.
- Adjust Goals target.
- Create a Reminder (local notification).

**Coach Mode:**

"Summarize team's last 2 games in 5 bullet points."

"Who needs extra reps on clears?" (surface players below threshold).

### Tab 4 — ⭐ Skills

**Purpose:** Close the loop from weakness → drill → progress.

**AI-Recommended (top):**
"Based on last 3 games: Reflex Drill A (3×/wk), Footwork B (2×/wk)."

**Library Filters:** Position, Skill Type (Reflex/Agility/Speed/Stick), Duration, Difficulty.

**Drill Card:** steps, target reps, est. time, video/GIF (future).

**Progress Tracker:** streaks, weekly plan, "Done/Partial/Skip."

**Coach Mode:** assign drills to players, bulk reminders.

### Tab 5 — 🏆 Goals

**Purpose:** Make ambition measurable and motivating.

**Rings:** top 3 goals with percent complete.

**Status Chips:** On Track / Catch Up / Stretch (GoalPace AI).

**History:** mini timeline of progress events.

**Badges:** "10-Save Club," "Clutch Finisher," "Clean Clears 85%+ (3 games)."

**Edit:** swap goals, adjust targets (with AI suggestion).

**Coach Mode:** team goals, who's off-pace, quick encouragement templates.

## Global: Drawer / Secondary Screens

**Recruiting (Organizer):**

Checklist (Clearinghouse, transcripts, outreach), Target Schools (Reach/Realistic/Safe), AI emails (paid), timeline reminders, college links.

**Messaging:** Team chat & DMs; role tags; share stat cards; coach announcements; polls; threads; moderation.

**Profile:** Player card (avatar, HS/Club logos, key stats, GPA/SAT if added), emergency info (coach-visible only), shareable card.

**Settings:** Subscription tier, notifications, privacy (coach visibility controls), data export, help.

## 🧰 Tech Stack (No Cloud Functions)

**App:** React Native + Expo

**Navigation:** Expo Router + TypeScript

**Styling:** NativeWind (Tailwind classes + tokens for consistency)

**State:** Zustand (simple predictable store; Redux Toolkit is a valid swap)

**Animations:** React Native Reanimated

**Forms/Validation:** react-hook-form + Zod

**Data Fetching:** TanStack Query (cache & retries; optional)

**Backend & Data:**

- Firebase Auth (Apple/Google/Email)
- Firestore (document DB for users, games, drills, goals, chats)
- Firebase Storage (avatars, transcripts, assets)
- Firebase Security Rules (role-aware: athlete/coach)
- App Check (protects API keys/abuse)

No Cloud Functions (for now): move server logic client-side or to lightweight serverless later if needed.

**Monetization & Ops:**

- RevenueCat (subscriptions, trials, entitlements)
- expo-notifications + FCM/APNs (push)
- Analytics: Firebase Analytics (starter) + PostHog/Amplitude (when needed)
- Crash/Perf: Sentry (errors), Firebase Performance (optional)
- CI/CD: EAS Build/Submit; OTA via Expo Updates

**Media & Util:**

- expo-image-picker, document-picker, file-system
- expo-calendar (for reminders/add-to-calendar)
- expo-haptics, expo-device (UX polish)

## 🔌 External APIs / Services

**Recruiting & Schools**

- College Scorecard API (US Dept. of Ed.) — metadata (name, location, size, cost, admission).
- IPEDS — extended academic datasets.
- NCAA/NAIA — deep links to Clearinghouse/eligibility (no public API).

**AI & Insights**

- OpenAI/Anthropic — AI Coach chat, email templates, insights summaries.
- ML Kit (on-device) or Cloud Vision/AWS Textract (future AutoStat OCR).
- OpenWeatherMap — context on game day for insights.

**Maps & Places**

- Mapbox or Google Places — fields, schools, geocoding.

**Email (optional later)**

- Resend / SendGrid — transactional emails if needed.
- Gmail API / Microsoft Graph — send-from-user for recruiting outreach (optional).

**Messaging**

- Firestore chat (recommended to keep data in your moat).
- (Alt: Stream if you want speed to market, with custom "Stat Summary" attachments.)

## ✅ UX Writing & Microcopy (selected)

**Empty State (Dashboard):** No games yet? Tap "Log Game" and start your story.

**AI Nudge:** Pace check: you're 80% there—finish strong this week.

**Badge Unlock:** You just leveled up. Keep your foot on the gas 💪

**AI Coach Welcome:** I've got your tape and your trends. What are we locking in this week?

**Coach Quick Post:** Practice moved to 5:30. Goalies—arrive 10 early for reflex work.

## 🗺️ Phase Plan (high level)

**Phase 1 (MVP Core):**

Onboarding (pre-auth), Auth, Dashboard v1, Log Game, Stats basic, Goals basic, AI Coach chat v1 (rules + LLM), Skills library starter, Coach verification.

**Phase 2:**

Messaging, Recruiting organizer, Goals/Skills deepening (badges, pacing), Team snapshots, Shareable season cards.

**Phase 3:**

Advanced analytics (comparisons, HS vs Club), Drill assignments & team tasks, Notifications intelligence, Season recap generator.

**Phase 4:**

OCR capture, Admin/org plans, Deeper recruiting analytics, Web coach portal.
