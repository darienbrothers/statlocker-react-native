# Recruiting Tab

# **🏫 Recruiting — "Your Future, Organized"**

## **1\) Page Objectives**

* Give athletes **clarity** (what to do next), **organization** (schools, tasks, docs), and **momentum** (AI help \+ progress).

* Turn "overwhelming" into a **step-by-step roadmap** with visible wins.

---

## **2\) Top-Level Layout (Scrolling Page)**

### **A) App Bar**

* **Title:** Recruiting

* **Secondary actions (right):**

  * 🔍 Search (schools, tasks, coaches)

  * ⠇ Overflow: Import Schools (CSV), Export Profile (PDF), Share Read-Only Link

### **B) Sticky Overview Strip**

* **Progress Ring** (overall roadmap %)

* **Next Action Chip** (primary CTA, dynamic):

  * Examples: "Add your transcript", "Pick 3 target schools", "Generate first outreach email"

* **Status Pills**: Docs (✅/⚠️), Emails Sent (count), Campus Visits (count)

Microcopy (under the strip): *"Every task you complete moves a coach closer to knowing you. Let's stack wins."*

---

## **3\) Sections (Cards)**

### **3.1 🎯 Roadmap (Timeline)**

**Purpose:** A guided checklist that adapts to grade/season.

**UI**

* Horizontal, snap-scrolling timeline with **milestone chips**:

  * NCAA/NAIA Eligibility ✔️

  * Build Player Card ✔️

  * Shortlist Schools ✔️

  * Email Coaches ✉️

  * Share Film Link (optional)

  * Unofficial Visit 📍

  * Academic Check (GPA/test)

  * Application Windows

* Each milestone opens a **Detail Sheet**:

  * What & Why (short, friendly)

  * Requirements (checklist items)

  * AI Assist (contextual tool)

  * Mark Done / Snooze

**Functionality**

* **Auto-complete** sub-steps when related data is uploaded or created (e.g., transcript file → "Academics: Transcript on file" ✔️).

* **Snooze** with reminder (1w/2w/custom).

* **Progress calculation** updates the sticky ring.

**States**

* Empty: "Let's pick 3 starter milestones." → pre-select recommended based on grade.

* Partial: Show % and the **Next Action** in the sticky strip.

---

### **3.2 🏫 Target Schools (Boards)**

**Purpose:** Manage and compare **Reach / Realistic / Safe** schools.

**UI**

* 3 **Kanban columns** with subtle dividers:

  * **Reach**, **Realistic**, **Safe**

* **School Card** (compact):

  * Logo (or initials)

  * Name, Division badge (DI/DII/DIII/Club)

  * Interest Status chip: Not Contacted / Emailed / In Conversation / Campus Visit / Offer

  * "…" opens quick actions: View Profile, Move Column, Add Note, Set Reminder, Archive

**Tap → School Profile Sheet**

* **Header**: Name, logo, division, conference; Save/Star

* **Quick facts**: Location, Enrollment, Tuition est., Major tags

* **Program**: Head coach name/email (if known), team website link

* **Fit Meter** (derived from your position \+ goals \+ GPA/test if available)

* **Notes & Interactions**:

  * Threaded notes (date-stamped)

  * Emails sent (counts, with template titles)

  * Visits & calls log

* **Actions**:

  * ✉️ **Generate Email** (AI—opens template builder using your profile/goals)

  * 🗓 **Plan Visit** (creates calendar event; optional reminder)

  * 📌 **Move to** Reach/Realistic/Safe

  * 🗑 Archive

**Functionality**

* **Add School**:

  * Quick-add (name \+ division) OR

  * **Lookup** (College Scorecard API later): name autocomplete → prefill campus info.

* **Bulk**:

  * Import CSV (Name, Division, City, Notes)

  * Multi-select → Move Column / Set Status / Archive

* **Sorting/Filters**:

  * Sort by interest status, distance, tuition, division

  * Filters: State, Major, Size, Public/Private

**States**

* Empty:

  * Illustration \+ CTA: "Start with 6—2 Reach, 2 Realistic, 2 Safe."

  * Button: "Browse Schools" (opens search modal).

---

### **3.3 ✉️ AI Outreach (Assistant)**

**Purpose:** Reduce friction writing to coaches; keep tone confident.

**UI**

* Gradient card: "Need help writing to a coach?"

* **Buttons**:

  * **Generate Email** → opens **Composer Modal**:

    * Inputs on left (read-only defaults from Profile \+ Position \+ Latest Stats/Goals)

    * Preview on right (live-updating)

    * Tone selector: Professional / Warm / Direct

    * Goal toggle: include 1–2 key stats/goals automatically

    * Attach: Player Card (PDF), Transcript, Stat Snapshot

    * **Copy**, **Save to Log**, **Open Mail App**

  * **Build Player Résumé** (premium)

  * **Follow-up Email** (suggest follow-up cadence)

**Functionality**

* Templates versioned (A/B test friendly)

* Auto-logs "Email Generated" with target school context

* Premium gate for advanced variants (multi-coach, sport-specific nuance)

**States**

* First-time tip: "Use short paragraphs, 1–2 highlights, 1 clear ask."

---

### **3.4 📄 Documents**

**Purpose:** Store recruiting-critical files.

**UI**

* Grid of document tiles:

  * **Transcript**, **Test Scores**, **Player Card**, **Coach References**, **Highlight Link** (URL)

  * Each shows status pill: Uploaded / Missing / Expiring

* Tap to **View/Replace**, **Share**, **Copy link** (read-only profile URL)

**Functionality**

* Upload (PDF, JPG, PNG)

* Parse basic metadata (name, size); optional OCR later

* Mark **Verified by Coach** (if coach role endorses a doc)

**States**

* Empty: "Add transcript to unlock your Academics milestone."

---

### **3.5 🔔 Reminders & Activity**

**Purpose:** Keep momentum.

**UI**

* **Upcoming** list (chronological): "Follow up with Richmond (7d)"

* **Recent Activity**: Emails generated, schools added, milestones completed

**Functionality**

* Tap reminder → edit date or complete

* Push notifications: follow-ups, task deadlines, visit days

---

## **4\) Interactions & Navigation**

### **Primary FAB (bottom-right)**

* **Add School** (default)

* Long-press or expand menu for:

  * Add Multiple (CSV)

  * Add Milestone

  * Generate Email

### **Search (global within Recruiting)**

* Search schools, coaches, notes, tasks

* Recent searches chips

### **Deep Links**

* From Messaging → "View Stat Card" or "Player Card" can route into Recruiting to share with a coach thread

* From Profile → "Share Player Card" routes to **AI Outreach** composer

---

## **5\) Data Model (high-level, Firestore-friendly)**

`users/{userId}`  
  `recruiting:`  
    `roadmap:`  
      `milestones: [`  
        `{ id, title, status: 'todo|done|snooze', dueAt, completedAt }`  
      `]`  
    `schools: [`  
      `{ id, name, division, board: 'reach|realistic|safe',`  
        `location, tuition, majors[], coach: { name, email },`  
        `status: 'not_contacted|emailed|conversation|visit|offer',`  
        `notes[], lastContactAt, fitScore (0–100), createdAt, updatedAt }`  
    `]`  
    `documents: [`  
      `{ id, type: 'transcript|resume|test|player_card|reference|highlight',`  
        `url, fileName, size, uploadedAt, verifiedByCoach: boolean }`  
    `]`  
    `emails: [`  
      `{ id, schoolId, subject, templateId, bodyPreview, createdAt }`  
    `]`  
    `reminders: [`  
      `{ id, type: 'followup|visit|deadline', title, dueAt, done }`  
    `]`  
    `settings:`  
      `outreachTone: 'professional|warm|direct'`  
      `publicProfile: { enabled, url }`

**Coach read**: if connected/verified, coach can **view (read-only)** athlete recruiting boards \+ leave notes (coach-owned).

---

## **6\) Edge Cases & States**

* **No data at all** → Guided onboarding strip inside tab:

  * "Pick 3 schools" → opens search; after 3 selected, shows Roadmap step.

* **Over 50 schools** → Show "Consolidate" nudge (try to keep boards focused).

* **Missing transcript** but "Email Coaches" milestone selected → inline tip: "Coaches often ask for academics—upload transcript to strengthen your email."

* **Premium Gating** (if applicable):

  * Advanced AI templates, Résumé builder, Bulk import sizes over X, Read-only public card

  * Always show a tasteful lock with benefit clarity.

---

## **7\) Copy & Microcopy Library**

* **Empty Schools:** "Choose 2–2–2: Two Reach, Two Realistic, Two Safe. That's a winning start."

* **Roadmap CTA:** "Clear steps beat wishful thinking. Let's get one done now."

* **AI Composer Tip:** "Keep it under 150 words. One stat, one story, one ask."

* **Docs Empty:** "Your transcript turns 'maybe' into 'let's talk.'"

* **Reminders Title:** "Momentum Maker"

---

## **8\) Visual Design Notes (NativeWind / RN)**

* **Headers:** Outfit 700 (h2/h3 scales)

* **Body/Data:** Inter Tight 400–600

* **Cards:** rounded-2xl, `shadow-card`, separators `border-line`

* **Pills/Chips:** subtle radius, `text-[12]`, `font-medium`

* **Kanban Columns:** `gap-3`, column titles sticky while scrolling inside the board

* **Progress Ring:** SVG or Lottie, stroke matches `brand.primary`

---

## **9\) Performance & UX Polish**

* Skeleton loaders for:

  * School cards (logo circle \+ two lines)

  * Roadmap chips (pill placeholders)

* Optimistic UI:

  * Moving a school between boards updates instantly, sync in background

* Offline-first:

  * Queue "email generated" logs; documents upload when online

* Haptics:

  * Light impact on drag-drop across boards

  * Success notification on milestone complete

---

## **10\) Analytics (events you'll thank yourself for later)**

* `recruiting_opened`

* `roadmap_milestone_completed` {id}

* `school_added` {source: manual|lookup|csv}

* `school_moved_board` {from, to}

* `email_generated` {templateId, schoolId}

* `document_uploaded` {type}

* `reminder_created` {type}

* `public_profile_toggled` {on|off}

---

## **11\) Accessibility**

* All icons have labels ("Generate email", "Move to Safe")

* Minimum 4.5:1 contrast on chips and text

* Drag/drop has keyboard alternative: "Move to…" action sheet

---

## **12\) Coach Mode (optional, read-only for v1)**

* Coach can see a player's **boards** and **doc statuses** (not download, unless athlete shares).

* Coach can **leave a private note** on a school (visible to athlete as "Coach Note" with coach avatar).

* Quick suggestions:

  * "Recommend follow-up to these 2 schools"

  * "Strong academic match—highlight GPA"

---

### **TL;DR: What gets built first (MVP slice)**

1. **Roadmap** (3–5 milestones),

2. **Target Schools** (3 columns, add/view/move),

3. **AI Email Composer v1**,

4. **Documents** (Transcript \+ Player Card),

5. **Reminders** (basic follow-up).



# Stats Tab

# **📈 Stats Tab — "See Trends. Find Edges."**

## **🎯 Purpose**

The **Stats tab** transforms raw data into visual stories — highlighting patterns, efficiency, and growth over time. It's where athletes and coaches **see performance trends, compare, and act**.

---

## **🧱 Structure Overview**

**Header Section**

* **Title:** "My Stats"

* **Subtitle:** contextual label → e.g., "Performance analysis for Duxbury High School"

* **Filters:** Season | Team | Opponent | Home/Away | Timeframe

* **FAB (floating right corner):** "Add Game" → opens Game Log modal

**Core Sections**

1. AI Callout (Insights)

2. Charts & Analytics

3. Position Metrics Grid

4. Comparison Tools

5. Export & Share

---

## **🪄 1\. AI Callout (Top Insight Card)**

**Purpose:** Provide instant takeaways.

**UI:**

* Gradient card (brand.primary → brand.accent)

* Icon: "📈" or stat symbol (dynamic by trend)

* Text example:

   "Your save percentage improved by 9% over the last 30 days — strongest against top-ranked opponents."

* CTA chip: "View Breakdown" → scrolls to chart section

**States:**

* Empty: "Play 3+ games to unlock insights."

* Premium: adds "AI Compare Mode" toggle (HS vs Club / Week vs Week).

---

## **🧮 2\. Charts & Visual Analytics**

### **A) Line Chart — Performance Over Time**

* Default metric: Save % (Goalies) or Shooting % (Field Players).

* X-axis: Game dates; Y-axis: % values.

* Hover tooltip → shows stat \+ opponent.

* Trend line shows growth or dip.

**Goalie Example:**

* 5 games (Mar 1–Mar 22\)

* Trendline rising from 75% → 85%.

* AI note: "Consistency improving — 4/5 games above target."

### **B) Bar Chart — Category Breakdown**

* Visualize averages or counts by opponent or week.

* Goalie: Goals Allowed / Game

* Attack: Goals per Opponent

* Midfield: Draw % / Faceoff %

* Defender: Clears, Turnovers, Ground Balls.

**Interaction:**

* Tap a bar → opens game summary modal.

* Long press → "Compare to Team Avg."

### **C) Pie/Donut Chart — Shot Distribution (future upgrade)**

* Shows where shots/goals occurred if shot zones are tracked.

* Example: "45% low-left, 35% mid-right."

---

## **🧩 3\. Position Metrics Grid (Dynamic by Position)**

**Goalie (based on [Lacrosse Stat Guide]):**

| Metric | Formula | Purpose |
| ----- | ----- | ----- |
| Save % | (Saves ÷ Shots Faced) × 100 | Efficiency |
| GAA | (Goals Allowed ÷ Games Played) | Defense anchor |
| Clears % | (Successful ÷ Attempted) × 100 | Transition success |
| Ground Balls | Count | Hustle metric |
| Turnovers | Count | Risk indicator |

**Midfield / Attack / FOGO dynamically render via `position` state.**

**UI:**

* Grid layout (2x2 or 3x2 cards)

* Each card → `ChartCard` component with:

  * Icon, title, stat, mini trend arrow

  * Subtext: "+3% from last game"

**Interaction:**

* Tap → full-screen detail view

* Swipe left → toggle to season average / game-by-game

---

## **🔄 4\. Comparison Tools**

### **A) Team vs Player View**

* Toggle (Top Right): "My Stats" | "Team Avg"

* Line overlay adds team trend for visual comparison.

### **B) High School vs Club Mode**

* Switch below title:

  * "High School | Club" toggle

  * Animates charts & cards based on source collection.

### **C) Game-by-Game Compare Modal**

* Opens when tapping a data point or bar.

* Modal includes:

  * Opponent, Date, W/L, Key Metrics

  * AI Insight summary → "Your clears dropped to 75% due to higher pressure rides."

---

## **🧠 5\. AI Insights Section**

After **3+ games**, auto-generates trend cards:

* "Best Quarter"

* "Stat to Watch"

* "Consistency Index"

**Examples:**

* "3rd quarter = strongest (Save % 89%)"

* "Clears efficiency dipped 12% in away games."

* "Game-to-game variance decreased 40% this month."

**UI:**

* `AiCalloutCard` carousel (swipe horizontally)

* Each card has icon, title, summary, and CTA → "See Drill Recommendation" (links to Skills tab).

---

## **📊 6\. Export & Share (Pro Feature)**

**Button:** "Generate Season Report"  
 **Modal:** selects:

* Team (HS/Club)

* Time Range

* Format → Share Card (Image) / PDF / CSV

**Share Card Example:**

* Athlete photo \+ name

* 3 key metrics (Save %, GAA, Clears %)

* StatLocker branding \+ "Your Stats. Your Story. Your Future." tagline

---

## **🧭 Interaction Flow Summary**

1️⃣ User lands on Stats tab → sees headline \+ filters.  
 2️⃣ Scrolls → AI Callout \+ chart visuals load progressively.  
 3️⃣ Filters update charts dynamically (season, last 30 days, etc.).  
 4️⃣ User taps chart → full-screen compare view.  
 5️⃣ User shares or exports via button or FAB option.

---

## **💡 Design Notes (NativeWind \+ Typography)**

From your [Typography spec]:

| Element | Font | Weight | Size | Color |
| ----- | ----- | ----- | ----- | ----- |
| Title | Outfit | 700 | 28px | brand.ink |
| Subtitles | Inter Tight | 400 | 14px | ink.subtle |
| Stat Numbers | Inter Tight | 700 | 24px | brand.primary |
| Labels | Inter Tight | 500 | 13px | ink.subtle |
| Callouts | Outfit | 600 | 18px | brand.accent |

**Colors:**

* Background: `#F7F7F9`

* Card: `#FFFFFF`

* Brand.Primary: `#6366F1`

* Accent: `#10B981`

* Ink: `#111827`

---

## **📱 Motion \+ UX Details**

* **Chart Animations:** smooth line draw-in (`Reanimated` spring).

* **Card Entrance:** fade-up cascade on scroll.

* **Haptics:** light impact on toggle/filter change.

* **Skeleton loaders:** shimmer bars for charts while fetching.

---

## **🧩 Data Model (Firestore Example)**

`users/{uid}/stats`  
  `- { gameId, date, opponent, team, position }`  
  `- metrics: { saves, shotsFaced, goalsAllowed, clearsSuccess, turnovers }`  
  `- derived: { savePct, gaa, clearPct }`  
  `- tags: ['home', 'away', 'playoff']`  
  `- createdAt, updatedAt`

Auto-calculated fields match formulas in the Stat Guide.

---

## **🧭 MVP Priorities**

✅ 1\. Filter bar  
 ✅ 2\. AI Callout card  
 ✅ 3\. Line chart (save % or shooting %)  
 ✅ 4\. Bar chart (goals allowed / shots by opponent)  
 ✅ 5\. Export/share modal (image first)

---

## **🏁 Example Copy Snippets**

* **Empty State:** "Track at least 3 games to unlock your Stat Trends."

* **AI Callout:** "Save % trending up — your last three games averaged 82%."

* **Export CTA:** "Your season. Visualized."

* **Premium Lock (Pro plan):** "Unlock advanced charts and team comparisons."



# Skills Tab

# **⭐ Skills Tab — "Master Your Craft. Earn Every Tier."**

## **🎯 Purpose**

The **Skills tab** helps athletes track their development through **tiered training programs** (Bronze → Platinum) while unlocking **AI-powered recommendations** and coach feedback loops.

* For **lacrosse**, this starts with **Wall Ball training**.

* Future sports (basketball, soccer, etc.) will have sport-specific routines (e.g., shooting workouts, footwork drills).

---

## **🧱 Top-Level Layout (UX Hierarchy)**

1️⃣ **Header Section (Motivational)**  
 2️⃣ **AI Recommendations**  
 3️⃣ **Tier Progression Overview**  
 4️⃣ **Drill Library (Filtered by Tier \+ Position)**  
 5️⃣ **Coach Feedback \+ Milestones**  
 6️⃣ **Offseason Mode (toggle)**

---

## **🏁 1\. Header Section**

**Title:** "Skills & Drills"  
 **Subtitle:** "Sharpen your game — one rep, one tier, one season at a time."

**Microcopy example:**

"You're in Silver Tier — your next milestone: complete 3 advanced reaction saves to reach Gold."

**Visuals:**

* Player avatar next to Tier Badge (Bronze/Silver/Gold/Platinum)

* Progress ring around badge showing tier completion %

* Animated background with faint lacrosse texture (wall \+ stick shadow)

---

## **🤖 2\. AI Recommendations (Smart Coach)**

**Purpose:** Personalized guidance using recent game stats and trends.

**Section Title:** "AI Coach Recommends"  
 **Card Example (dynamic):**

* **Header:** "Reaction Time Focus"

* **Body:** "Your low-shot save % dropped 8% in the last 3 games. Run Bronze Drill 3: 'Low Save Control' twice this week."

* **CTA:** "Add to Plan" (logs it in the weekly tracker).

**Alternate cards:**

* "Stick Control Boost" → recommends Off-Hand drills.

* "Passing Precision" → recommends Bounce Pass Challenges for field players.

**UI:**

* Horizontal carousel (scrollable cards)

* Each card uses color gradient (`brand.primary → brand.accent`) with icons (🔥 Speed / 🎯 Accuracy / 💪 Endurance)

---

## **🪜 3\. Tier Progression Overview**

**Design:**

* Tier selector (Bronze, Silver, Gold, Platinum) → current tier highlighted with glow border.

* Below selector, progress card shows:

  * `Tier: Silver`

  * `Completed: 8 / 25 drills`

  * `Progress: 32%`

  * Animated progress bar

  * "Time to Complete: 8–10 weeks"

**Microcopy:**

"Stay consistent — Silver Tier builds speed, confidence, and off-hand precision."

**AI Button:** "View AI Insights for this Tier" → modal with progress analysis:

"You're 2 drills away from unlocking Gold. Based on your logs, your weak hand reaction drills need more reps."

---

## **🧱 4\. Drill Library (Wall Ball Drills)**

**Dynamic Filters:**

* Tier → Bronze / Silver / Gold / Platinum

* Position → Goalie / Attack / Midfield / Defense

* Drill Type → Passing / Catching / Reaction / Clearing / Saving

**UI Cards (List or Grid View):**  
 Each **Drill Card** shows:

* Drill name ("Quick Stick Passing")

* Category tag (Passing / Reflex / Agility)

* Tier icon (color-coded by difficulty)

* Checkmark if completed

* **Tap → Drill Detail Modal**

**Drill Detail Modal:**

* Drill title \+ tier badge

* Steps overview (1–3 bullet points from your PDF)

* Goal reps (e.g., "50 reps @ full speed")

* Estimated time to complete

* Motivational Quote: "Precision beats power when power isn't precise."

* Buttons:

  * ✅ "Log Reps" (records count or sets)

  * 📹 "Start Live Tracking" (future AI vision mode)

  * 💬 "Ask Coach" (sends message to coach via Messaging tab)

**Progression Logic:**

* Auto-progress when all drills in a tier are checked (Bronze → Silver → Gold → Platinum).

* AI-driven promotion check (based on time, reps, and accuracy % if available).

---

## **🏆 5\. Milestones & Coach Feedback**

**Section Title:** "Milestones & Feedback"

* Displays badges earned for each tier (Bronze Completion, 100 Wall Reps, Elite Reflex, etc.)

* Each badge has:

  * Icon, Title, Description, Earned Date

* **Coach Comment Box:** Coach can leave a comment on any drill or tier.

* AI quote for motivation:

   "Elite players aren't made in games — they're made in the wall ball sessions no one sees."

---

## **🌤 6\. Offseason Mode (New Toggle)**

**Purpose:** Focused offseason skill tracking.

**Toggle on/off:** "Offseason Mode: Active"  
 When on:

* Wall Ball routines become "Weekly Goals"

* Adds "Track Daily Reps" counter

* AI adjusts pacing to simulate a training plan (e.g., "3x/week Reflex Drills \+ 2x Passing Accuracy")

**Progress Ring:**

* Shows weekly completion %

* AI displays insight: "You're pacing for 400 reps this month — that's elite consistency."

---

## **⚙️ Data Flow & Logic**

**Firestore Collections Example:**

`users/{uid}/skills`  
  `- tier: "Silver"`  
  `- completedDrills: ["drill_01", "drill_02"]`  
  `- repsLogged: { drill_01: 50, drill_03: 20 }`  
  `- aiRecommendations: [ { id, title, reason, createdAt } ]`  
  `- milestones: [ { id, title, earnedAt, tier } ]`  
  `- offseasonMode: true`

**Coach Integration:**

* Coaches can view athlete's drill completion status and leave tier-specific notes.

* Athletes see those under "Coach Feedback" in-app.

---

## **🎨 Design System Integration**

Using [StatLocker Typography & Colors]:

| Element | Font | Weight | Color | Notes |
| ----- | ----- | ----- | ----- | ----- |
| Section Headers | Outfit_700 | Bold | `#111827` | Motivational tone |
| Body / Descriptions | InterTight_400 | Regular | `#6B7280` | Compact |
| Drill Titles | InterTight_600 | Semibold | `brand.primary` | Clean clarity |
| Progress Numbers | InterTight_700 | Bold | `brand.accent` | Motivating |
| Buttons | InterTight_600 | Medium | `#FFFFFF` on `brand.primary` | Rounded-xl |

**Tier Colors:**

* Bronze → `#CD7F32`

* Silver → `#C0C0C0`

* Gold → `#FFD700`

* Platinum → `#E5E4E2`

**Card Shadows:**

* Soft gray with `shadow-card` defined in typography doc.

---

## **🔥 Motion & Gamification**

* Each tier unlock animates a "Tier Up!!" confetti burst.

* Drill completion adds sound/haptic vibration.

* Progression bar pulses when near 100%.

* AI recommendation cards slide in dynamically with gradient motion.

---

## **🧠 AI Logic (Future Expansion)**

* Uses player stat history to recommend drills.

  * Low save % → Reaction drills

  * Turnovers → Passing accuracy drills

  * Slow clears → Clearing speed drills

* Reinforces with messages:

   "Let's strengthen your weak-hand passing — try Drill 27 (Silver)."

* Connects directly to AI Coach tab ("Explain why this drill helps me").

---

## **🗓 MVP Build Priorities**

✅ Wall Ball drill library by position (Bronze–Platinum)  
 ✅ Tier selector \+ progress tracking  
 ✅ AI recommendation card (mock or live Gemini API)  
 ✅ Log reps modal  
 ✅ Milestones view \+ badge collection

---

## **📣 Example Microcopy**

* **Empty state:** "Start your journey with Bronze drills. 25 reps a day beats 100 once a week."

* **AI Tip:** "You're one week from Gold Tier. Don't skip your off-hand work."

* **Motivational line:** "Consistency creates confidence."

* **Coach note:** "Erica: Great improvement in reaction speed\! Let's push into Gold next week."

# Wall Ball

Let's hard-gate Wall Ball progression behind full completion **and** a **coach sign-off**. Here's the drop-in spec to layer on top of the Skills tab we just designed.

# **🔒 Wall Ball Progression — Coach-Verified Unlocks**

## **1\) Core Rule (Authoritative)**

A player **cannot** unlock the next Wall Ball drill (or advance tiers) until:

1. They **complete all required reps** for the current drill at full speed with no drops (per drill criteria), and

2. A **verified coach** reviews the attempt and **approves** it.

If either fails → drill stays locked; athlete receives feedback \+ can resubmit.

---

## **2\) Athlete UX Flow**

**A. Start Drill (Locked state visible for next drills)**

* Drill Card shows lock 🔒 and "Coach sign-off required to unlock."

* CTA: **Start Drill** (current drill) → Log Reps.

**B. Log Reps → Complete Attempt**

* Rep logger enforces target reps (e.g., "50 clean reps").

* Anti-spam guardrails:

  * Minimum elapsed time gate (e.g., ≥ 90 sec for 50 reps).

  * Pace sanity check (no impossible reps/sec spikes).

  * Optional "No drops" self-attest checkbox (if no AI/video).

* Optional: **Attach proof** (15–30s clip or selfie video) for remote coaches.

**C. Submit for Review**

* CTA changes to **Submit to Coach**.

* Athlete must pick the reviewing coach (if multiple), add optional note.

* Drill goes to **Pending Coach Review** (badge \+ greyed CTA).

* Banner: "Waiting for Coach sign-off. You'll get a notification."

**D. Outcomes**

* **Approved ✅** → toast \+ confetti; next drill unlocks; tier % updates.

* **Rejected ❌** → toast; reason \+ coach note shown; CTA switches to **Try Again**.

---

## **3\) Coach UX Flow**

**Entry points**

* **Skills \> Approvals** queue (coach app)

* Messaging inbox card: "3 drills awaiting approval"

* Player profile \> Skills tab \> Pending items

**Approval Screen (per submission)**

* Header: Player, Drill, Tier, Position

* Evidence: Rep log summary (reps, duration, pace), video thumbnail (if any)

* **Criteria checklist** (coach must tick):

  * ✅ Required reps reached

  * ✅ Speed standard met (full speed)

  * ✅ No drops / clean execution

* Comment box (required on reject, optional on approve)

* Actions: **Approve** / **Reject**

**Bulk workflow**

* Multi-select → Approve/Reject with identical comment (optional).

---

## **4\) States & UI**

* **Locked (up next):** Grey card, lock icon, "Complete previous drill \+ coach sign-off."

* **In Progress:** Progress ring, "32/50 reps logged."

* **Pending Review:** Yellow badge "Pending Coach," disable log edits, show submitted timestamp.

* **Approved:** Green badge, confetti on unlock; next drill activates.

* **Rejected:** Red badge, reason pill (tap to view full note), **Try Again** CTA.

**Microcopy**

* Pending: "Good work. We've sent this to your coach for a quick review."

* Rejected: "Almost there. Coach feedback: keep stick head out in front; reduce cradles."

* Approved: "Signed off. Unlocking your next challenge."

---

## **5\) Notifications**

**Athlete**

* Submitted → "Drill sent to Coach."

* Approved → "Coach signed off. Next drill unlocked."

* Rejected → "Coach left feedback. Try again."

**Coach**

* New submission → "Review requested: \[Player\] • \[Drill\]"

* Daily digest (if pending \> N)

---

## **6\) Data Model (Firestore-friendly)**

`users/{athleteId}/skills_progress/{programId}   // programId = "wallball_lacrosse"`  
`{`  
  `tier: "Silver",`  
  `currentDrillId: "WB_SLV_14",`  
  `completedDrillIds: ["WB_BRZ_01", "..."],`  
  `pendingSubmissions: [submissionId],`  
  `lastUpdatedAt: TS`  
`}`

`skills_submissions/{submissionId}`  
`{`  
  `athleteId,`  
  `programId: "wallball_lacrosse",`  
  `drillId: "WB_SLV_14",`  
  `tier: "Silver",`  
  `repsLogged: 50,`  
  `durationSec: 120,`  
  `dropsReported: 0,`  
  `evidence: { videoUrl?, frames? },   // optional`  
  `status: "pending" | "approved" | "rejected",`  
  `coachReview: {`  
    `coachId?,`  
    `checked: { reps: bool, speed: bool, clean: bool },`  
    `comment?,`  
    `decidedAt?: TS`  
  `},`  
  `createdAt: TS`  
`}`

**Unlock logic (deterministic):**

* A drill **unlocks** only if:

  * previous drill has a **submission.status == 'approved'** (or is the first drill in tier), and

  * any program-level prerequisites are satisfied (e.g., "Complete all Bronze to unlock Silver").

---

## **7\) Security Rules (essentials)**

* Only the **athlete** can create a submission for their userId.

* Only **verified coaches** linked to athlete's team/roster can write `coachReview` and change `status` from `pending`.

* Athletes cannot edit a submission once created (only cancel if `pending` and no review yet).

* Server-side rules (or callable function) recompute **unlock state** — never trust client toggles.

---

## **8\) Anti-Cheat & Integrity**

* **Pace sanity** check: average reps/sec within human bounds (configurable per drill).

* **Minimum session time** threshold tied to rep targets.

* **Streak randomness**: If exact same timestamps appear across attempts, flag for manual review.

* **Optional vision add-on**: spot check via short video; random coach audits.

---

## **9\) Edge Cases**

* **Multiple coaches:** Athlete selects reviewer; any coach on roster can approve.

* **Coach offline:** Submission stays pending; gentle reminders (24h).

* **Wrong team coach:** Block approval (not on athlete's roster).

* **Resubmission:** Fresh submissionId; keep audit trail.

* **Tier completion:** All drills approved → **Tier Up** ceremony; next tier's first drill unlocks.

---

## **10\) Coach Feedback Loop**

* Coach rejection **requires comment**; suggested quick-replies:

  * "Form breaks at rep ~30; reduce cradles."

  * "Off-hand too slow; repeat Bronze 7 tomorrow."

  * "Great pace; ready for next."

* Feedback appears in athlete's **Milestones & Feedback** section and in drill history.

---

## **11\) Analytics**

* `skills_submission_created` { drillId, tier }

* `skills_submission_approved` { coachId }

* `skills_submission_rejected` { reasonTag }

* `skills_unlock_next_drill` { nextDrillId }

* `skills_tier_up` { from, to }

---

## **12\) UI Components to Add**

* `<ApprovalBadge status="pending|approved|rejected" />`

* `<CoachChecklist />` (reps/speed/clean toggles)

* `<EvidenceBlock />` (video thumbnail, duration)

* `<GateBanner variant="locked|pending|rejected" />`

* `<UnlockCelebration />` (confetti \+ haptic)

---

## **13\) MVP Cut (shippable now)**

* Manual rep logging \+ submit for review

* Coach approvals with checklist & comment

* Locked/Unlocked UI \+ Pending state

* Notifications (local first, push next)

* Analytics \+ audit trail

# Goals Tab

Let's design this like a cross between **Duolingo streaks**, **Apple Fitness rings**, and **Dunkin' rewards milestones**, built specifically for athletes.

Below is the complete **revamped Goals Tab specification**, matching your existing React Native \+ NativeWind architecture, your typography, and theme standards.

---


# **🏆 Goals Tab — "Grind. Earn. Repeat."**

## **🎯 Purpose**

Turn player development into a game: athletes earn badges, streaks, and milestones for **performance, skill growth, and engagement** inside StatLocker.

Gamification keeps players coming back — not because they have to, but because it feels *rewarding* to build their stat legacy.

---

## **🧱 Structure Overview**

**Sections:**  
 1️⃣ Hero Section (Motivational header \+ streak ring)  
 2️⃣ Personal Season Goals  
 3️⃣ Badge Library (Dynamic & Position-Specific)  
 4️⃣ Milestone Tracker (Progress ring \+ timeline)  
 5️⃣ XP & Level System (Future addition)

---

## **🏁 1\. Hero Section – "Your Legacy Tracker"**

**UI Layout:**

* Top header: "My Goals"

* Subheader: "Earn badges. Build streaks. Level up."

* Visual centerpiece:

  * Animated ring (like Apple Fitness) showing **Season Progress %**

  * Inside ring:

    * Fire emoji or bolt 🔥 icon with "14-Day Active Streak"

    * Tagline: "Every rep counts."

**Microcopy Examples:**

"Keep your streak alive — you're 2 days from your next milestone badge!!"  
 "Grind mode unlocked 💪 — you've logged 3 games this week."

**Behavior:**

* Progress ring updates when user logs games, drills, or hits goals.

* "XP sparkles" animation for recent activity.

---

## **🎯 2\. Personal Goals Section**

**Purpose:** Track measurable, position-based goals (e.g., "80% Save %", "10+ Assists", "50 Ground Balls").

**UI Layout:**

* Cards (like your `GoalCard` component) but animated with glow borders when "On Track".

* Each card shows:

  * Icon (🏹 target / 🧤 glove / 🛡️ shield)

  * Title: "80% Save Percentage"

  * Progress bar: 72% → 80%

  * Status Chip: "Ahead", "On Track", "Behind"

  * Button: "View Trend" (opens mini chart overlay)

**Microcopy Example:**

"Consistency wins championships — 2 saves away from goal."

**AI Assist (Pro Feature):**

* "Suggest New Goal" → Based on stat trends:

  * e.g., "You're averaging 9.8 saves/game. Set a goal to hit 12 by next week?"

* Uses AI Coach logic to auto-generate new achievable challenges.

---

## **🏅 3\. Badge System (Gamified Core)**

### **🎨 Badge Categories**

Each badge has a **color**, **icon**, and **tier** (Bronze → Silver → Gold → Platinum → Elite).  
 Grouped by skill domain and activity:

| Category | Examples | Triggers |
| ----- | ----- | ----- |
| **Performance Badges** | "The Wall" (15 saves), "Lockdown D" (0 GA game), "Sniper" (5+ goals) | In-game stats |
| **Consistency Badges** | "7-Day Streak", "30 Days Logged", "No Miss Weeks" | Daily app use |
| **Skill Badges** | "Reflex Master", "Off-Hand Warrior", "Clear King" | Drill completions |
| **Teamwork Badges** | "Assist Machine", "Game MVP", "Coach's Shoutout" | Team feedback |
| **App Engagement** | "First Game Logged", "Recruiting Profile Complete", "AI Chat 10x" | In-app actions |

### **🧩 Badge Card UI**

Each Badge Card includes:

* Badge icon (glowing border if unlocked)

* Title: "The Wall"

* Description: "15 saves in one game."

* Tier: "Gold"

* Earned date (if unlocked)

* Locked badges show grayscale with hint: "Keep grinding to reveal."

### **🏅 Example Position-Specific Badges**

**Goalie:**

* "The Wall" — 15+ saves in a game.

* "100 Club" — 100 total saves this season.

* "Clean Sheet" — 0 goals allowed.

* "Quick Clear King" — 90%+ clearing accuracy.

**Attack:**

* "Sniper" — 5+ goals in a game.

* "Hat Trick Hero" — 3+ goals x3 games.

* "Assist Artist" — 3 assists in one game.

* "Two-Hand Threat" — scores with both hands in one match.

**Midfield/Defense:**

* "Ground Ball Beast" — 50 GBs total.

* "Anchor" — 4Q Defensive Stops.

* "Enforcer" — 10+ caused turnovers.

**Universal (All Players):**

* "Streak On Fire" — 10 active days in a row.

* "Perfect Attendance" — logged every week for a month.

* "Locker Legend" — earned 25 badges.

* "Coach Approved" — received feedback on all drills in a tier.

---

## **🎯 4\. Milestone Tracker (Progress & Timeline)**

**Purpose:** Visualize progression across the season and show upcoming milestones.

**UI Layout:**

* Horizontal **timeline scroll** (like Duolingo path):

  * Milestone nodes: 🎖️ icons along a curved route.

  * Each milestone lights up as achieved.

  * Tap node → show stat summary popup:  
     "Week 4 — Hit 80% Save % and earned 'The Wall' badge."

* Next milestone preview card:

  * "Up Next: Hit 10 Clean Games for Platinum Reflex Badge."

  * CTA: "Track My Progress"

**Color coding:**

* Green = completed

* Gray = upcoming

* Purple glow = current challenge

---

## **🔥 5\. XP & Level System (Future Phase)**

Introduce "Locker Level" — every action gives XP.  
 Players earn XP by:

* Logging games

* Completing drills

* Earning badges

* Maintaining streaks

| Level | XP Required | Unlocks |
| ----- | ----- | ----- |
| Rookie | 0 XP | Basic tracking |
| Starter | 500 XP | Custom goals |
| Captain | 1500 XP | AI drill access |
| Legend | 5000 XP | Exclusive cosmetic themes |

XP display: progress bar at bottom of Goals screen.

"200 XP to reach Level 3: Captain."

---

## **🧩 In-App Task Badges (Engagement Layer)**

* "Created First Goal" 🏁

* "Completed Onboarding" ✅

* "Logged 10 Games" 📊

* "Used AI Coach 5 Times" 🧠

* "Earned First Badge" 🥇

* "Subscribed to Pro" 💎

🎮 Think Duolingo-style pop-ups: celebratory animation \+ confetti \+ haptic feedback.

---

## **🪄 Interactions & Motion**

* **Confetti** for every badge unlock.

* **Badge spin** animation when tapped (3D rotation).

* **Progress ring pulse** when nearing a goal.

* **Tier transition animation:** color flash \+ vibration.

* **Daily reminder:** "Don't lose your streak 🔥" push.

---

## **🧠 AI Integration (Goal Suggestions)**

* AI Coach monitors trends and suggests new badges or goals:

  * "You've saved 40 shots this month — let's aim for the 50 Saves Milestone next."

  * "Your clear % dropped 5%. Want a badge for improving it next week?"

**Tone:** Motivational, concise, and personalized — like a digital coach texting encouragement.

---

## **⚙️ Data Model (Firestore)**

`users/{uid}/achievements`  
  `- badges: [`  
      `{ id, title, tier, earnedAt, category, position, description, iconUrl, unlocked: true }`  
    `]`  
  `- streak: { daysActive, lastActivityDate }`  
  `- xp: totalXP`  
  `- milestones: [`  
      `{ id, title, targetValue, currentValue, completed: bool, earnedAt }`  
    `]`  
  `- goals: [`  
      `{ id, title, metric, targetValue, currentValue, progressPct, status }`  
    `]`

---

## **🧩 Coach View Integration**

* Coaches can assign "Team Goals" (e.g., "90% Clear Success").

* Team badges ("Team Lockdown" 🛡️) unlock when all players meet thresholds.

* Leaderboard view (optional): ranks players by badges earned.

---

## **🎨 Design System Alignment**

| Element | Font | Weight | Size | Color |
| ----- | ----- | ----- | ----- | ----- |
| Headline | Outfit 700 | 28px | `#1D2333` |  |
| Subhead | InterTight 500 | 14px | `#6B7280` |  |
| Badges | InterTight 600 | 16px | `brand.primary` |  |
| Status Chips | InterTight 500 | 12px | `#10B981` or `#F59E0B` |  |
| Progress Numbers | InterTight 700 | 20px | `#111827` |  |

**Color Palette:**

* Bronze: `#CD7F32`

* Silver: `#C0C0C0`

* Gold: `#FFD700`

* Platinum: `#E5E4E2`

* Elite Purple: `#8B5CF6`

---

## **🧩 MVP Build Order**

✅ Display active goals (cards \+ progress)  
 ✅ Show earned badges (animated cards)  
 ✅ Lock/Unlock logic with streaks  
 ✅ Confetti celebration \+ animations  
 ✅ Coach feedback integration (comment on badges)  
 ✅ AI-driven "Goal Suggestion"

---

## **💬 Microcopy Library**

* **Unlock message:** "Badge earned — The Wall! 🧱 You stopped 15+ shots this game."

* **Milestone hint:** "2 more clean sheets until your Platinum Reflex badge!!"

* **Streak reminder:** "🔥 Keep your streak alive — 3 days left for next milestone."

* **Coach comment:** "You've earned this one. Hard work showing in your clears."

* **AI quote:** "Elite habits stack — you're 5 saves from 'Legend Status.'"

---

## **🧩 Future Expansion**

* **Badge Shop** (cosmetic items, themes, sounds).

* **Team Leaderboards** → see who's grinding hardest.

* **Share Badge** → social sharing template ("Just earned The Wall on StatLocker 🧱").

* **Coach Challenges** → team-wide milestones during season.




# AI Coach Tab

# **🧠 AI Coach Tab — "Your Personal Locker Room Mentor"**

## **🎯 Mission**

Transform the current chat window into a **hybrid interface** — equal parts conversation, analysis, and actionable insight.

The AI Coach becomes:

* **Analyst** (reads your stats & performance)

* **Mentor** (motivational feedback)

* **Trainer** (recommends drills or goals)

* **Recruiting Advisor** (for older athletes)

Think **Strava Coach \+ Apple Fitness Rings \+ ChatGPT personality** — all within StatLocker.

---

## **🧱 Layout Overview**

1️⃣ Hero Header (Avatar \+ Role Tone Selector)  
 2️⃣ Conversation Feed (Smart & Visual)  
 3️⃣ Insight Modules (AI-Generated Cards)  
 4️⃣ Suggested Actions (Quick AI buttons)  
 5️⃣ Session Log / History

---

## **🏁 1\. Hero Header — "Meet Your AI Coach"**

**Visual:**

* Full-width banner gradient (brand.primary → accent)

* Circular avatar that **changes expression or gear** by tone:

  * 💪 *Hype Mode*: electric purple

  * 🎯 *Analyst Mode*: calm blue

  * 🧘 *Mentor Mode*: soft gold

  * 🗣️ *Recruiting Mode*: collegiate navy

**Top elements:**

* Greeting: "Hey Alex, I reviewed your last 3 games — ready for your weekly breakdown?"

* Toggle group → Tone selector chips (Hype / Mentor / Analyst / Recruiting)

**Microcopy Examples:**

"Let's break down your weekend tournament."  
 "🔥 You're trending up — want me to build a custom drill list?"

---

## **💬 2\. Conversation Feed — "Smart Threads, Not Plain Text"**

Instead of plain chat bubbles:

* **AI messages** are cards with **context icons**:

  * 📊 Stat breakdown

  * 🎯 Goal feedback

  * 🧩 Skill suggestion

  * 🎓 Recruiting insight

**Example Threads**

| Icon | Context | AI Message |
| ----- | ----- | ----- |
| 📊 | Stat Breakdown | "Save % improved 6% — best quarter: 3rd (92%). Keep that momentum." |
| 🧩 | Drill Rec | "Run Bronze Drill #4 'Low Save Control' — matches your current reaction trend." |
| 🎯 | Goal Progress | "You're 3 saves away from 'The Wall' badge. Let's close it this week." |
| 💬 | Motivation | "Pressure makes diamonds. Stay sharp this weekend." |

**Player Input Enhancements**

* Input bar with *smart suggestions above keyboard*:

  * "What should I work on next?"

  * "Analyze my last game."

  * "Show my streak stats."

  * "Recommend drills."

* Quick-send voice button 🎤 for conversational flow.

* Typing indicator \+ subtle pulse animation during AI thinking.

---

## **🔍 3\. Insight Modules — "AI-Generated Cards Below Chat"**

Below the main chat feed (scrolls together):

* **Performance Insights Carousel**

  * Each card is auto-generated weekly or after 3+ games.

  * Example:

    * **🔥 Momentum Meter**: "You've increased Save % by +9% this month."

    * **🎯 Focus Area**: "Low-left reactions dropped to 70%. Try Goalie Drill #3."

    * **💪 Strength Highlight**: "You're elite at clearing — top 10% among peers."

* **Stat Trends Mini Graphs**

  * Sparkline visuals for Save %, Clear %, Goals Allowed.

  * Tap → open Stats tab deep-link.

* **AI Skill Recommendations** (from Skills data):

  * Drill name, Tier, and progress ring.

  * CTA → "Start Drill."

**Microcopy Example:**

"Your off-hand stick speed improved 15%. Let's add the Silver 'Quick Stick Reactions' drill next."

---

## **⚙️ 4\. Suggested Actions — "Quick Interactions with AI"**

Persistent buttons above input bar (horizontal scroll):

* 🧱 "Analyze My Game"

* 🧤 "Goalie Drill Plan"

* 🧩 "Recommend 3 Skills"

* 📈 "Show Trend Graphs"

* 🎓 "Recruiting Tips"

* 🔁 "Daily Motivation"

These trigger AI prompts pre-filled with contextual data (grad year, position, stats).

**Example Flow:**  
 Tap "Analyze My Game" → AI pulls last logged game from Firestore → responds with structured breakdown:

`GAME SUMMARY`  
`Save %: 81%`  
`Shots Faced: 14`  
`Clears: 8/9 (89%)`  
`Coach Note: "Elite focus today."`  
`AI Insight: "You controlled rebounds better — keep your top hand relaxed."`

---

## **🧩 5\. Session Log / History**

**Purpose:** Let users revisit past chats and insights like a training diary.

**Layout:**

* "Session History" button → opens modal

* Shows recent conversations labeled by topic:

  * "Game Review – 10/12"

  * "Skill Plan – 10/20"

  * "Recruiting Advice – 10/25"

* Tap → reloads that chat context (AI remembers thread ID if stored).

---

## **🎨 Visual Design & Motion**

| Element | Font | Weight | Color |
| ----- | ----- | ----- | ----- |
| Headers | Outfit_700 | 700 | brand.primary |
| Body | InterTight_400 | 400 | ink.subtle |
| Insight Titles | InterTight_600 | 600 | brand.accent |
| Input Field | InterTight_500 | 500 | \#111827 |

**Animations**

* Lottie pulse for AI "thinking"

* Slide-up motion for Insight Cards

* Confetti \+ haptic for milestone mention ("Congrats! New badge unlocked 🏆")

* Avatar glow changes color with tone (using Reanimated transitions).

---

## **🔮 AI Personality System**

**Modes**

| Mode | Tone | Example Prompt Behavior |
| ----- | ----- | ----- |
| 🧠 Analyst | Data-driven | "Based on your 4Q stats, reaction speed is improving." |
| 🔥 Hype | Motivational | "Let's go! You're playing like a wall out there." |
| 🎯 Mentor | Calm & wise | "Every save teaches patience — let's refine your setup." |
| 🎓 Recruiting | Professional | "Let's refine your intro email to coaches." |

Each mode adjusts:

* Avatar color

* Message tone

* Suggested actions

---

## **🧠 AI Context Data (behind the scenes)**

Every AI prompt is enriched with:

* Player name, sport, position, grad year

* Stat averages (from `StatsScreen`)

* Active tier (from `SkillsScreen`)

* Goal progress (from `GoalsScreen`)

* Recent coach feedback

Example system prompt (to Gemini/OpenAI):

"You are StatLocker's AI Coach mentoring [Erica Brothers], a 2026 lacrosse goalie. Her Save % is 81%, she's in Gold Tier drills, and is chasing 'The Wall' badge. Respond concisely with encouragement and 1 actionable step."

---

## **📊 Data Model Additions**

`users/{uid}/ai_sessions`  
  `- { id, topic, messages[], createdAt, updatedAt, toneMode }`  
`users/{uid}/ai_insights`  
  `- { id, type: 'stat'|'drill'|'goal', content, createdAt, linkedGameId?, linkedDrillId? }`

---

## **⚡ MVP Implementation Plan**

✅ Add **Tone Selector \+ Avatar**  
 ✅ Replace plain bubbles with **AI Insight Cards**  
 ✅ Introduce **Quick Actions Carousel**  
 ✅ Add **Performance Insights Carousel** below chat  
 ✅ Enable **Session History Modal**  
 ✅ Animate "thinking" \+ haptic cues

---

## **✍️ Microcopy & Personality**

* "You're not chasing perfection — you're building consistency."

* "Let's push for Gold Tier drills next. You're ready."

* "Recruiting starts with confidence. I'll help craft your first email."

* "🔥 Save % trending up — don't let off the gas."

* "One wall ball session away from unlocking your next badge."

---

## **🌐 Future Expansion**

* **Voice Mode (TTS)** → spoken encouragement after games.

* **Weekly Report PDF** → AI auto-generates "Weekly Performance Summary."

* **AI Challenges** → "Complete 3 drills I assign this week to earn a bonus badge."

* **Coach AI Companion** → Team dashboards with summarized player AI insights.




# Messages Tab

# **💬 Messages — "Keep the Team in Sync"**

## **🎯 Objectives**

* Fast team communication with **channels** \+ **DMs**.

* **Coach-first tools** (announcements, polls, assignments).

* Share **StatLocker objects** (game stats, drills, goals, badges) as rich cards.

* Read receipts, mentions, reactions, typing — the expected comforts.

---

## **🧱 Information Architecture**

**Inbox (root)**

* **Channels** (per team): `#announcements` (read-only, coach), `#team-chat`, `#goalie-room`, `#attackers`, `#game-day`

* **DMs**: one-to-one and small groups (≤9)

* **Requests**: new chat invites, coach verifications

**Thread**

* Message list (virtualized)

* Composer (with quick actions)

* Threaded replies (optional MVP+1)

* Pinned messages

**Profile Peek**

* Tap avatar → mini card (position, team, last 3 games button, quick DM)

---

## **🎨 UI Layout (NativeWind-ready)**

**Header**

* Title: Channel / DM name

* Right actions: Search, Info (members, pins), Overflow

**Message List**

* Virtualized list, grouped by date

* Message row:

  * Avatar \+ display name \+ role chip (Coach/Verified)

  * Bubble (text or rich attachment)

  * Reactions bar (👍🔥👏) \+ "Reply" \+ timestamp

  * Read receipts avatar stack (first 3 \+ "+2")

**Composer**

* Text input with `@mention` \+ `#channel` autocomplete

* Quick actions row:

  * 📎 Attach → Stat Card / Drill / Badge / File / Photo

  * 📊 Poll (coach)

  * 📣 Announcement (coach, channel = announcements)

  * ✅ Assign (coach → drill/goal to players)

* Send button; press+hold → schedule send (optional)

**Channel Info Sheet**

* Members list (role chips)

* Pins (message previews)

* Mute/Notify settings

* Coach-only tools (manage members, lock channel)

---

## **🧩 Message Types (rich, tappable cards)**

1. **Text** — baseline bubble (supports markdown-lite, links).

2. **Stat Summary Card** (from Stats)

   * Opponent, date, key metrics (Save %, GA, Clears %)

   * Tap → opens Game Detail

3. **Drill Assignment Card** (from Skills)

   * Drill, tier, due date, "Mark Done" / "Ask Coach"

   * Auto-updates completion

4. **Goal/Badge Card** (from Goals)

   * "Badge earned: The Wall 🧱" with shareable flair

5. **Announcement** (coach)

   * Highlight style, "Acknowledge" button \+ reactions

6. **Poll**

   * Options \+ live percentages; one-tap vote

7. **File/Media**

   * Thumbnail \+ open; limit file types (pdf, jpg, mp4)

All cards should deep-link into their home tab.

---

## **🛠 Functionality & Behaviors**

**Channels**

* Anyone can chat; **#announcements** read-only for coaches

* Pin up to 5 messages per channel

* Slow mode (optional): coach can set message cooldown

**DMs**

* Create from profile peek or composer "New"

* Leave group; rename; add/remove members (creator/coach)

**Mentions & Notifications**

* `@all` (coach only), `@position` (e.g., @goalies), `@name`

* Per-channel mute; notify on mention/assignments always-on override

**Reactions & Threads**

* Long-press → react; tap count to see who

* Reply-in-thread keeps main chat clean (MVP+1 if needed)

**Presence**

* Typing indicator

* Online dot (last seen if offline)

**Search**

* Search in channel or global

* Filters: has:attachment, from:@name, before:/after:

**Moderation (Coach)**

* Delete/hide message

* Timeout (prevent sending for N minutes)

* Lock channel (read-only)

---

## **🔐 Roles & Permissions (core)**

* **Coach (verified)**: create/lock channels, announcements, polls, assignments, moderate

* **Athlete**: text, reactions, upload within limits, request to join groups

* **Verified** badge on coach names in UI

---

## **🗄 Firestore Data Model (flat, scalable)**

`teams/{teamId}`  
  `channels/{channelId}`  
    `meta: { name, type: 'announcements|chat', createdBy, createdAt }`  
    `members/{userId}: { role: 'coach|athlete', joinedAt, isMuted }`  
    `messages/{messageId}:`  
      `{`  
        `type: 'text|stat|drill|badge|announcement|poll|file',`  
        `text?, attachments?, statRef?, drillRef?, goalRef?, badgeRef?,`  
        `authorId, createdAt, editedAt?,`  
        `reactions: { '👍': ['u1','u2'], '🔥': ['u3'] },`  
        `replyToId?, threadCount?`  
      `}`  
    `readReceipts/{userId}: { lastReadAt }`

`users/{userId}`  
  `dms/{dmId}`  
    `meta: { name?, isGroup, members[], createdAt }`  
    `messages/{messageId} { ...as above }`  
  `settings:`  
    `notifications: { mutedChannels: [channelId], mentionsOnly: boolean }`

**Indexes**

* `messages.createdAt` (per channel/dm)

* `messages.type` \+ `createdAt` (for quick filtering)

* `readReceipts.lastReadAt` composite for unread counts

---

## **🧯 Security Rules (essentials)**

* Only channel members can read/write its messages

* Only **coach** can write to `type='announcement'` and modify `channels.meta`

* Users can only write their own `readReceipts`

* Attachment uploads scoped to team paths; validate mime/size server-side (or in app with preflight)

---

## **⚡ Performance**

* Use Firestore **cursors** for infinite scroll (page by createdAt desc)

* **Local cache** (persisted) \+ optimistic updates for reactions

* **Batch writes** when adding reactions / read receipts

* **Thumbnailing** for media (Storage resize functions or client-side precompress)

---

## **📊 Analytics (name them once, thank yourself forever)**

* `chat_opened` { channelId }

* `message_sent` { type, channelId }

* `message_reacted` { emoji }

* `announcement_ack` { channelId }

* `poll_voted` { pollId, option }

* `drill_assigned` / `drill_completed_from_chat`

* `badge_shared_from_chat`

---

## **🔔 Push & In-App Notices**

* Push for: mentions, coach announcements, assignments, DMs

* In-app toast for: poll results updated, coach pinned a message

* Digest (optional): "3 unread in #team-chat, 1 assignment due tomorrow"

---

## **🧩 Component Checklist (RN \+ NativeWind)**

* `<InboxList />` (sections: Channels, DMs, Requests)

* `<MessageList />` (virtualized, date dividers)

* `<MessageRow />` \+ `<ReactionBar />` \+ `<ReadAvatars />`

* `<Composer />` with `<QuickActions />`

* `<AttachmentSheet />` (Stat/Drill/Badge pickers)

* `<AnnouncementCard />`, `<StatCard />`, `<DrillCard />`, `<BadgeCard />`, `<PollCard />`

* `<ChannelInfoSheet />` \+ `<MemberItem />` \+ `<PinItem />`

* `<SearchModal />`

---

## **🪄 Microcopy (on-brand)**

* Empty channel: "Break the ice. Share a win or set a goal."

* Announcements: "Acknowledge to let coach know you're locked in."

* Poll CTA: "Vote now — closes in 2 hours."

* Assignment toast: "Coach assigned 'Quick Stick Reactions' due Fri."

---

## **🚀 MVP Slice (ship in stages)**

1. Channels \+ DMs: text, mentions, reactions, read receipts, typing

2. Coach **Announcements** \+ **Pins**

3. Attach **Stat/Drill/Badge** cards (tap → deep-link)

4. **Assignments** (coach → drill/goal) with completion sync

5. **Polls** (simple, single-choice)

---

## **🔭 Nice-to-haves (after MVP)**

* Voice notes, image markup, location (field pin)

* Threaded replies

* Scheduled send & recurring announcements

* Auto-summaries ("AI: summarize last 200 messages")

* Coach approval workflows surfaced in-chat ("Approve wall ball submission")




# Profile Tab

# **🧍‍♀️ Profile — "Your Stats. Your Story. Your Future."**

## **🎯 Purpose**

1. Showcase identity \+ performance at a glance.

2. Be instantly **shareable** (QR / public link).

3. Centralize **academics \+ recruiting docs** (optional).

4. Pull in **goals, badges, skills**, and **coach feedback**.

---

## **🧱 Information Architecture (top → bottom)**
1. **Header Card (Hero)**
2. **Toggle: High School | Club**
3. **Highlight Stats (position-aware)**
4. **Goals & Badges**
5. **Skills / Tier Status (Wall Ball)**
6. **Academics & Docs (optional)**
6b. **Health & Safety** (private by default; per-field share)
7. **Coach Feedback**
8. **About & Links**
9. **Privacy & Share**
A persistent **Edit** button (top-right) opens a sheet with sectioned forms.
---

## **🎨 1\) Header Card (Hero)**

**Layout**

* Avatar (editable) \+ Name (Outfit 700), Position, Grad Year

* School \+ Team (logo chips), City/State

* Action row:

  * **Share** (public profile link \+ QR)

  * **Add Highlight** (link to external video)

  * **Edit**

**Microcopy**

"Every rep writes your story. Keep logging."

**Visual**

* Subtle team-color banner; pulse on first visit of the week ("Welcome back").

---

## **🔀 2\) HS | Club Toggle**

Switch context for the entire profile—stats, goals, highlights, and badges filter by org.

* Toggle changes:

  * Highlight stat cards (averages)

  * Recent games feed (if included later)

  * Goals progress (scope = HS or Club)

---

## **📊 3\) Highlight Stats (Position-Aware Cards)**

**Goalie (example):** Save %, GAA, Clears %  
 **Attack:** Goals, Assists, Shot %  
 **Midfield:** Points/G, GBs, TOs  
 **Defense/LSM:** CTs, GBs, Clear %  
 **FOGO:** FO% (season \+ last 5), GBs

**Card Anatomy**

* Title (e.g., "Save %") \+ Sparkline (last 5\)

* Big number (Inter Tight 700\) \+ delta chip ("+4% vs season")

* Tap → deep-link to Stats \> detail

**Empty state**

"Log 3 games to unlock trends."

---

## **🎯 4\) Goals & Badges**

**Goals block**

* 3 active goals → progress bars \+ status chips (On Track / Catch Up / Stretch)

* CTA: "View all goals" → Goals tab; "Adjust target" (Pro)

**Badges block**

* Horizontal scroller of **latest 6** badges (colored if unlocked, grayscale if not)

* Tap badge → sheet with criteria and earned date

**Microcopy**

"One game away from 'The Wall' badge."

---

## **⭐ 5\) Skills & Tiers (Wall Ball)**

* Current Tier badge (Bronze/Silver/Gold/Platinum) with % complete

* Next Drill tile (locked until coach sign-off if you enabled that rule)

* CTA: "Resume Drill" / "Submit to Coach" (pending state)

**Coach note inline** if previous submission was rejected (one-liner \+ "See why").

---

## **🎓 6\) Academics & Documents (optional but powerful)**

**Fields (private by default; toggle to share in public link):**

* GPA, Test scores (if provided)

* Transcript (PDF), Player Résumé (PDF), References

* Highlight link(s)

**UI**

* Document tiles with status: Uploaded / Missing / Expiring

* Tap → view/replace/share

**Tip**

"Coaches often ask for transcripts early—add yours to stay ready."

---

## **🩺 6b) Health & Safety (Athlete-owned with per-field sharing)**

**Purpose:** Centralize critical health information for the athlete, with explicit per-field controls to optionally share specific items with verified coaches.

**Visibility & Privacy (Phase 1):**

* Default: All health data is private to the athlete.
* Per-field "Share with coach" indicator (read-only for Phase 1). Actual toggling/persistence ships in Phase 2.
* Coaches will only ever see fields explicitly shared (Phase 2 coach view).

**Fields (read-only UI for Phase 1):**

* Emergency Contacts (multiple): name, relation, phone, notes • Share state pill
* Allergies: item name + severity (mild | moderate | severe) • Share state pill
* Conditions: e.g., asthma, concussion history • Share state pill
* Medications: name, dosage, schedule, notes • Share state pill
* Blood Type: O+ | O- | A+ | A- | B+ | B- | AB+ | AB-
* Medical Notes (optional): free text • Share state pill

**UI Layout (NativeWind-ready):**

* Section Card: `rounded-2xl shadow-card border-line p-4`
* Header: "Health & Safety" (Outfit 700)
* Sub-blocks:
  * Emergency Contacts list (stacked cards)
  * Health Info grid (Allergies, Conditions, Medications, Blood Type, Notes)
* Share indicator component: `SharePill` with states:
  * Private (slate/neutral)
  * Shared (brand.primary)

**Coach View (Phase 2):**

* Derived rendering limited to items where `shared: true`.
* No edit rights for coaches; read-only access.

**Phase 2 Implementation Notes:**

* Add edit forms, CRUD, per-field `shared` toggles.
* Persist to Firestore with role-based read rules.
* Optional: emergency PDF/QR export for sideline staff.

---

## **🗣️ 7\) Coach Feedback (light CRM feel)**

* Last 3 coach comments with avatar \+ time

* Pill filters: All | Skills | Game | Recruiting

* "Request Feedback" button → opens message prefilled with last game link

---

## **🔗 8\) About & Links**

**Fields**

* Short bio (2–3 lines)

* Dominant/Off-hand, Height/Weight (optional)

* Social links (YouTube highlight, Instagram sports account)

**Safety**

* Socials are **off** by default in public view; user must enable.

---

## **🔒 9\) Privacy & Share**

* **Public Profile** toggle: ON/OFF

* **Permissions:**

  * Show Stats (season summary only)

  * Show Goals (read-only)

  * Show Badges (earned only)

  * Show Academics (if toggled)

  * Show Skills Tier (yes/no)

* **Share**:

  * "Copy Link"

  * "Show QR" (fullscreen)

  * "Export Player Card (PNG/PDF)" (branded one-pager)

**Public profile route:** `/a/{username-or-id}` (read-only, SEO-blocked).

---

## **🧭 Interactions & Motion**

* Section headers slide-in on scroll; stat numbers count-up on first render

* Haptic success on "Copy Link,", "Doc Uploaded,", "Coach Sign-off Approved"

* Confetti when a badge is earned (if it happened since last visit)

---

## **🧩 Edit Sheet (sectioned)**

* **Identity:** name, preferred name, avatar, banner

* **Teams:** HS \+ level, Club \+ team

* **Basics:** grad year, position, dominant hand

* **Academics:** GPA, tests, transcript upload

* **Links:** highlight URLs, socials

* **Privacy:** public profile sections, coach visibility

* **Theme (optional):** choose accent color variant for Player Card export

Inline validation \+ autosave on close.

---

## **🔐 Roles**

* **Athlete:** edit everything for self; toggle public link

* **Coach (verified, linked):** can leave feedback; can **endorse** a stat or drill completion (adds "Coach-Verified" stamp)

* **Public:** read-only per athlete's privacy choices

---

## **🗄 Firestore Model (example)**

`users/{uid}`  
  `profile: {`  
    `name, preferredName?, avatarUrl, bannerUrl?,`  
    `position, gradYear, dominantHand?, height?, weight?,`  
    `hs: { school, level, city, state, logoUrl? },`  
    `club?: { org, team, city, state, logoUrl? },`  
    `bio?, socials: { youtube?, instagram? },`  
    `publicProfile: {`  
      `enabled: true|false,`  
      `showStats: true|false,`  
      `showGoals: true|false,`  
      `showBadges: true|false,`  
      `showAcademics: false|true,`  
      `showSkillsTier: true|false,`  
      `slug: "erica-brothers"`  
    `}`  
  `}`

  `academics?: {`  
    `gpa?, tests?: { sat?, act? },`  
    `docs: [`  
      `{ id, type: 'transcript|resume|reference|highlight', url, name, uploadedAt }`  
    `]`  
  `}`

  `highlights?: [{ id, title, url, createdAt }]`

  `coaching_feedback: [`  
    `{ id, coachId, context: 'skills|game|recruiting', text, createdAt }`  
  `]`

Derived collections for display:

`stats_summary/{contextId}      // precomputed HS/Club season summaries`  
`goals_active/{goalId}`  
`badges_recent/{badgeId}`  
`skills_status/{programId}      // wall ball tier, pending submissions, etc.`

`// Phase 2 example: health profile stored with per-field share flags`
`health: {`
`  emergencyContacts: [{ id, name, relation, phone, notes, shared }],`
`  allergies: [{ id, name, severity: 'mild|moderate|severe', shared }],`
`  conditions: [{ id, name, shared }],`
`  medications: [{ id, name, dosage, schedule, notes?, shared }],`
`  bloodType: 'O+|O-|A+|A-|B+|B-|AB+|AB-',`
`  medicalNotes?: string`
`}`

---

## **🧰 Dev Notes (Expo \+ NativeWind)**

* **Screen:** `/profile` (self) and `/profile/[uid]` (coach view)

* **Components:**

  * `<HeroCard />` (avatar, chips, actions)

  * `<ContextToggle />` (HS|Club)

  * `<HighlightStatCard />` (sparkline, delta)

  * `<GoalRow />`, `<BadgeRow />`

  * `<SkillsTierCard />` (lock/pending states)

  * `<DocsGrid />`

  * `<CoachFeed />`

  * `<AboutBlock />`

  * `<PrivacyPanel />`

  * `<ShareSheet />` (link \+ QR)

  * `<EditProfileSheet />` (sectioned forms)

* **Typography:** Outfit for headers; Inter Tight for data & labels

* **Color tokens:** brand.primary for actions; accent for progress; ink/subtle for meta

---

## **⚡ Performance**

* Precompute `stats_summary` by context (HS/Club) to avoid recalculating on render

* Use **Suspense-style** skeletons for stat cards & badges

* Lazy-load coach feedback after main fold

---

## **📊 Analytics**

* `profile_opened` { context: hs|club }

* `profile_shared` { public: true, method: link|qr|export }

* `doc_uploaded` { type }

* `coach_feedback_viewed`

* `badge_clicked` { id }

* `toggle_public_profile` { enabled }

---

## **🪄 Microcopy Library**

* **Header tagline:** "Show the work. Celebrate the wins."

* **Share sheet:** "Send your Player Card to coaches or friends."

* **Privacy tip:** "Control exactly what appears on your public link."

* **Docs prompt:** "Upload your transcript to be recruiting-ready."

* **Coach note empty:** "No feedback yet — ask your coach for a quick review."

---

## **🚀 MVP Slice (ship sequence)**

1. **Hero \+ HS/Club toggle \+ Highlight Stats**

2. **Goals & Badges rows** (read-only, deep-link to tabs)

3. **Skills Tier card** (with lock/pending states)

4. **Public Profile toggle \+ Share (link/QR) \+ Export PNG**

5. **Academics \+ docs upload (optional in MVP if recruiting isn't day-1)**

6. **Coach feedback feed (read-only)**

---

## **🔭 Nice-to-Haves (post-MVP)**

* Themeable Player Card (brand overlays, gradients)

* "Coach Endorsement" stamps on stat cards

* Public micro-landing with contact button (masked relay email)

* Social share templates (image card with name \+ key stat \+ badge)




# Game Details Screen

# **🏟️ Game Details — "Every Game Tells a Story"**

## **🎯 Purpose**

Display everything about a single game — stats, insights, trends, and milestones — in a way that's visual, motivational, and coach-friendly.

---

## **🧱 Layout Overview**

**Top-Level Structure:**  
 1️⃣ Game Header (Date, Opponent, Result)  
 2️⃣ Performance Summary (Quick Stats)  
 3️⃣ Trend Graphs (Visual analytics)  
 4️⃣ AI Insights (Smart takeaways)  
 5️⃣ Milestones & Badges (Gamification)  
 6️⃣ Coach Feedback  
 7️⃣ Actions (Edit, Share, Delete)

---

## **🏁 1\. Game Header**

**Layout:**

* Banner showing opponent logo/name (if available)

* Subtitle: `@Home` or `Away`

* Date \+ Time

* Scoreline: "Duxbury 10 — Scituate 7"

* Tag: ✅ **Win** or ❌ **Loss**

**Optional fields:**

* Weather, Venue, Notes (expandable info card)

**Visual:**

* Background gradient changes based on outcome:

  * Win → green accent (`#10B981`)

  * Loss → crimson accent (`#DC2626`)

* Add a **share icon** → generates social card ("StatLocker Game Summary")

**Microcopy:**

"Defense wins games — this one showed it."

---

## **📊 2\. Performance Summary**

**Purpose:** Quick snapshot of the player's game performance vs season average.

**Layout:**

* Card grid (3x2 metrics) with big numbers \+ icons

  * Goalie: Saves, Save %, Shots Faced, Goals Allowed, Clears %

  * Attack/Midfield: Goals, Assists, Shots %, GBs, TOs

  * Defense: CTs, Clears, GBs, TOs

* Each card shows:

  * Value (big)

  * Mini sparkline (last 5 games)

  * Subtext: "↑ +4% vs season avg"

**Interaction:**

* Tap a stat → full breakdown modal showing:

  * Game context (periods, opponents)

  * Graph comparing season trend

  * AI comment ("You were strongest in 2nd half – 91% saves")

---

## **📈 3\. Trend Graphs (Performance Visuals)**

### **A) Stat Trend Graph**

* Line chart or bar chart (Save %, Goals, Clears)

* Dual lines: Game vs Season Average

* Tooltip: stat value, time segment (1Q, 2Q, etc.)

### **B) Quarter Breakdown**

* Horizontal bar (4 segments)

  * Each quarter: Save %, Goals Scored, or TOs

  * Best quarter highlighted in accent color.

### **C) Team Contribution Ring**

* Pie chart showing athlete's % contribution to total team stats

  * "You accounted for 40% of team saves this game."

---

## **🤖 4\. AI Insights (Smart Takeaways)**

**Section Title:** "AI Coach Review"

* Display 2–3 insights derived from player data, like:

  * 📊 *Consistency*: "Save % rose from 75 → 88 between Q1–Q4."

  * ⚡ *Momentum*: "You started slow but finished strong."

  * 🎯 *Focus Point*: "Clears under pressure dropped to 60% — practice quick resets."

**UI:**

* Insight cards with gradient header (brand.primary → accent)

* Each card = title \+ summary \+ CTA:

  * "Add to Drills" → Suggests relevant wall ball drill.

  * "Set Goal" → Opens goal creation pre-filled with target metric.

**Voice:** motivational, concise, data-aware.

---

## **🏅 5\. Milestones & Badges Earned**

**Purpose:** Reward progress and show what was unlocked in this game.

**Layout:**

* Horizontal badge scroll

  * Example: "The Wall 🧱 (15+ Saves)" earned

  * "Clean Sheet" — 0 GA

* Each badge animates in with confetti and haptics.

* Tap badge → modal with description \+ date