# **⚙️ Settings Tab & Drawer Menu Revamp**

**Mission:** Make it the athlete’s control center — sleek, smart, and proudly StatLocker.

---

## **🧱 STRUCTURE OVERVIEW**

### **1️⃣ Drawer Menu (Quick Access)**

### **2️⃣ Settings Tab (Full Control Center)**

---

# **🧭 DRAWER MENU — “Your Locker Controls”**

**Goal:**  
 Turn the current Drawer from a flat list into a personalized quick hub that’s dynamic, visual, and value-driven.

---

## **🎨 DESIGN LAYOUT (Top → Bottom)**

### **🧍‍♂️ User Profile Header**

At the very top of the drawer:

* Circular avatar

* Name, Grad Year, Position

* Team toggle (HS / Club)

* “View Full Profile →” (navigates to Profile tab)

**Visual Design:**

`<View className="p-4 flex-row items-center border-b border-slate-200">`  
  `<Image source={{uri: avatarUrl}} className="w-12 h-12 rounded-full mr-3" />`  
  `<View>`  
    `<Text className="font-outfit-bold text-lg text-ink-title">{userName}</Text>`  
    `<Text className="text-ink-subtle text-sm">{gradYear} • {position}</Text>`  
  `</View>`  
`</View>`

---

### **🔖 Navigation Section**

Visually grouped by category with section headers and subtle icons:

**🏠 My Locker**

* Dashboard

* Stats

* Skills

* Goals

* Recruiting

* AI Coach

**👥 Team & Communication**

* Messages

* Calendar

* Coach Announcements

**🧩 Account & Settings**

* Settings

* Subscription Plan

* Support / Help Center

**🚪 Sign Out Button**

* Fixed to bottom, red or muted gray with “Log Out” label and icon.

**Microcopy example:**

“Logging out? Don’t worry — your stats are always saved.”

---

### **🧾 Subscription Badge**

Under “My Locker” section:

“Pro Plan — renews May 12, 2025”

* Colored badge (brand.accent if Pro, silver gradient if Elite)

* Tap → opens Paywall / RevenueCat subscription screen.

---

### **🔢 App Version Footer**

Bottom corner (tiny text):

“v1.2.4 • StatLocker Labs © 2025”

If Beta version → add label:

“Beta Build – Feedback Welcome 🧠”

---

### **🪄 Drawer Motion/UX Enhancements**

* Slide-in with **3D blur** background.

* Gradient header → `linear-gradient(180deg, #6366F1, #10B981)`

* Drawer handle → “Your Locker” label when opened.

* **Haptic tap** when opening.

---

# **⚙️ SETTINGS TAB — “Control Center”**

**Goal:**  
 Empower the athlete to customize their app experience — theme, privacy, subscription, notifications, and integrations — all organized into clean sections.

---

## **🎨 HEADER**

* Title: “Settings” (Outfit\_700, 28px)

* Subtitle: “Customize how you run your Locker.”

* Background gradient header with the StatLocker logo faintly watermarked.

---

## **🧭 SECTIONS OVERVIEW**

### **1️⃣ Account**

* Edit Profile → deep link to Profile Tab

* Change Email / Password (if email login)

* Manage Devices (view logged-in sessions)

* Delete Account (soft warning modal)

---

### **2️⃣ Subscription**

* Plan Card (Pro / Elite / Trial)

  * Icon \+ title (“Pro Plan”)

  * Description: “Full AI insights, badges, recruiting tools”

  * Renewal date

  * Button: “Manage Subscription” (links to RevenueCat)

* Upgrade CTA:

   “Want advanced AI breakdowns? Go Elite 🚀”

* Payment status (active / expired / trial days left)

---

### **3️⃣ Notifications**

* Toggles (all with haptics):

  * Game reminders

  * Coach messages

  * Badge unlocks

  * AI insights

  * Promotional content (off by default)

* Quiet Hours (select time range)

* Preview Example:

   “Example: ‘You’re 1 save away from The Wall 🧱’”

---

### **4️⃣ Privacy & Sharing**

* Toggle: “Public Profile”

* Toggle: “Allow Coaches to view stats”

* “Share Player Card” → opens share modal

* “Manage Linked Coaches” → connected accounts

* Optional: “Hide my name in team leaderboards”

---

### **5️⃣ Appearance**

* Theme toggle: Light / Dark / System

* Accent color selector (future): Purple, Blue, Green

* Font size: Small / Default / Large (NativeWind variant)

---

### **6️⃣ Integrations**

* Apple Health / Google Fit (future training data)

* Calendar Sync (pulls team schedule)

* Push notification management (Expo)

---

### **7️⃣ Support & Feedback**

* Help Center → opens webview (`support.statlocker.app`)

* FAQ → quick list inside modal

* Report a Bug → opens email template (`support@statlocker.com`)

* “Give Feedback” → opens modal:

   “We read every message. What can we improve?”

---

### **8️⃣ About**

* Version: `v1.2.4`

* Terms of Service

* Privacy Policy

* Credits (Erica Brothers, Darien Brothers)

* Build environment label: “Production” or “Sandbox”

---

### **9️⃣ Sign Out**

Bottom section (sticky).

* Icon: 🚪

* Label: “Sign Out”

* Confirm modal:

   “Are you sure you want to sign out?”  
   \[Cancel\] \[Sign Out\]

* Short haptic \+ toast: “Signed out successfully.”

---

## **🎨 VISUAL DESIGN TOKENS**

| Element | Font | Weight | Color |
| ----- | ----- | ----- | ----- |
| Headers | Outfit | 700 | `#111827` |
| Body text | Inter Tight | 400–500 | `#6B7280` |
| Card background | `#FFFFFF` (light) / `#1F2937` (dark) |  |  |
| Accent | `#10B981` |  |  |
| Divider | `#E5E7EB` |  |  |

**Card Style:** rounded-xl, subtle shadow (`shadow-card`), ripple effect on tap.

---

## **🧠 Microcopy Library**

| Context | Text |
| ----- | ----- |
| Empty subscription | “You’re on the Free Plan. Unlock Pro for full AI insights.” |
| Sign out | “Logging out? We’ll keep your progress safe.” |
| Version footer | “Built by athletes, for athletes.” |
| Privacy toggle | “Control how others see your Locker.” |
| Feedback | “Your feedback fuels future updates.” |

---

## **⚡ Functional Hooks**

**onSignOut →**

`await auth.signOut();`  
`showToast("Signed out successfully 👋");`  
`navigation.replace("WelcomeScreen");`

**Manage Subscription →**  
 Opens RevenueCat customer portal (sandbox or prod based on env).

**Sync Calendar →**  
 Pulls team and user events into Firestore `/calendar_events/`.

**Notification Settings →**  
 Writes to `/users/{uid}/preferences/notifications`.

---

## **🧩 COMPONENT CHECKLIST**

| Component | Purpose |
| ----- | ----- |
| `<SettingsHeader />` | Gradient title section |
| `<SettingsSection />` | Reusable group container |
| `<ToggleRow />` | For on/off controls |
| `<PlanCard />` | Subscription overview |
| `<SupportCard />` | Feedback & links |
| `<AboutCard />` | Version info & legal links |

---

## **🔔 Drawer \+ Settings Integration**

When user taps “Settings” in Drawer:

* Drawer closes smoothly → navigates to `/settings`

* Background blur transitions → gives that premium polish

* Drawer shows current plan & version dynamically:

  * “Pro • v1.2.4”

  * “Elite • v2.0 Beta” (if on testflight)

---

## **✨ Future Enhancements**

✅ **Coach/Parent Mode Switcher**

“Switch to Coach View” (for multi-role users)

✅ **Team Management Section (Coach accounts)**

“Invite Players” / “Create Practice Schedule”

✅ **Data Export (Pro/Elite)**

Export season stats as PDF/CSV

✅ **Feedback Rewards System**

Earn “Community Helper” badge for sending suggestions.

---

## **💬 Brand Voice (consistent across Drawer \+ Settings)**

“We built StatLocker for athletes who care about their growth.”  
 “Own your game. Control your journey.”  
 “Your data. Your story. Your future.”

---

## **🚀 MVP ORDER**

1️⃣ Drawer Menu redesign (profile header, grouped nav, sign out, version footer)  
 2️⃣ Settings tab sections:

* Account

* Subscription

* Notifications

* Privacy

* Support  
   3️⃣ Wire up Sign Out \+ Version info dynamically  
   4️⃣ Add “Manage Subscription” via RevenueCat  
   5️⃣ Theme toggle & public profile controls

