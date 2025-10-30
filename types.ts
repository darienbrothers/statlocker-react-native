// This file defines all the custom types used throughout the application.

export type Tab = 'Dashboard' | 'Stats' | 'AI Coach' | 'Skills' | 'Goals';

export type Position = 'Goalie' | 'Attack' | 'Midfield' | 'Defense' | 'FOGO';

export type IconName = 
  'target' | 'shield' | 'goalsAgainst' | 'clear' | 'shotsFaced' | 
  'minutes' | 'turnovers' | 'fire' | 'home' | 'arrowRight' | 
  'dashboard' | 'stats' | 'ai' | 'skills' | 'goals' | 'plus' | 
  'arrowLeft' | 'close' | 'user' | 'location' | 'settings' | 
  'check' | 'video' | 'trophy' | 'recruiting' | 'messaging' | 
  'profile' | 'menu' | 'bell' | 'filter' | 'share' | 'chevronDown' |
  'brain' | 'send' | 'play' | 'camera' | 'sparkles' | 'chart' | 'weight' | 'medal' | 'calendar' | 'graduationCap' | 'lock';

export type AccentColor = 'purple' | 'green' | 'blue' | 'orange' | 'cyan' | 'red';

export interface Game {
  id: string;
  opponent: string;
  location: 'Home' | 'Away';
  result: 'W' | 'L';
  date: string;
  score: string;
  saves: number;
  savePercentage: number;
  goalsAllowed: number;
  shotsFaced: number;
  successfulClears: number;
  totalClearsAttempted: number;
  clearPercentage: number;
  groundBalls: number;
  turnovers: number;
  keyTakeaways: string;
  teamContext?: 'High School' | 'Club';
  quarterStats?: QuarterStats[];
}

export interface QuarterStats {
  quarter: 1 | 2 | 3 | 4;
  savePct?: number;
  goals?: number;
  groundBalls?: number;
  turnovers?: number;
  clearsMade?: number;
}

export interface GameLogFormData {
  opponent: string;
  gameDate: string;
  location: 'Home' | 'Away';
  myScore?: number;
  theirScore?: number;
  saves: number;
  goalsAllowed: number;
  successfulClears: number;
  totalClearsAttempted: number;
  groundBalls: number;
  turnovers: number;
  notes: string;
  keyTakeaways?: string;
}

export interface PerformanceMetric {
  id: string;
  icon: IconName;
  iconBgColor: AccentColor;
  title: string;
  value: string;
  delta?: string;
  subtitle: string;
}

export interface Goal {
  id: string;
  icon: IconName;
  iconBgColor: AccentColor;
  title: string;
  target: string;
  currentValue: string;
  progress: number;
  status: 'On Track' | 'Ahead' | 'Achieved!';
}

export interface UpcomingGame {
  id: string;
  opponent: string;
  location: 'Home' | 'Away';
  time: string;
  date: string;
  daysUntil: string;
}

export interface Streak {
  icon: IconName;
  title: string;
  description: string;
  count: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  // Optional AI Coach enrichments for rendering structured cards
  type?: 'stat' | 'drill' | 'goal' | 'motivation';
  createdAt?: number;
  meta?: Record<string, unknown>;
}

export interface Drill {
  id: string;
  title: string;
  category: string;
  tier: 'Foundation' | 'Advanced' | 'Elite' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  isCompleted: boolean;
  videoUrl?: string;
}

// Wall Ball specific types
export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface WallBallDrill {
  id: string;
  title: string;
  tier: Tier;
  positionTags: string[];
  type: string;
  targetReps: number;
  estTimeMin: number;
  description?: string;
}

export interface UserSkillsProgress {
  tier: Tier;
  completedDrillIds: string[];
  repsLogged: Record<string, number>;
}

export type DrillStatus = 'locked' | 'in_progress' | 'completed';

export interface Badge {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  isEarned: boolean;
}

export interface AIInsight {
  id: string;
  type: 'trend' | 'strength' | 'focus' | 'achievement';
  title: string;
  description: string;
  metric?: string;
  drillId?: string;
  goalId?: string;
  cta?: string;
  createdAt: string;
}

export interface StatSummary {
  metricId: string;
  currentValue: number;
  seasonAverage: number;
  trend: number;
  delta: number;
}

export interface ChartDataPoint extends Record<string, unknown> {
  name: string;
  value: number;
  opponent?: string;
  date?: string;
}

export interface TrendData {
  metricId: string;
  data: ChartDataPoint[];
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export type TimeRange = 'Last 7 Days' | 'Last 30 Days' | 'Season';

export interface StatsFilter {
  timeRange?: TimeRange;
  season?: string;
  team?: 'High School' | 'Club';
  opponent?: string;
  location?: 'Home' | 'Away';
}

// Goals v2 (non-breaking additions for Goals Tab CRUD)
export type GoalStatus = 'pending' | 'on_track' | 'ahead' | 'behind' | 'completed';

export interface UserGoal {
  id: string;
  title: string;
  metric: string; // e.g., 'savePct', 'goals', 'groundBalls'
  units?: string; // e.g., '%', 'count'
  targetValue: number;
  currentValue: number;
  progressPct: number; // 0..100
  status: GoalStatus;
  completed?: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  dueAt?: string; // ISO optional
  completedAt?: string; // ISO optional
  position?: Position;
  icon?: IconName;
  accent?: AccentColor;
}

export type BadgeTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Elite';

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  earnedAt?: string; // ISO
  icon?: IconName;
  tier?: BadgeTier;
  category?: 'performance' | 'consistency' | 'skill' | 'teamwork' | 'engagement' | string;
  position?: Position | 'All';
}

// AI Coach-specific types
export type AiTone = 'hype' | 'mentor' | 'analyst' | 'recruiting';

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  type?: 'stat' | 'drill' | 'goal' | 'motivation';
  createdAt: number;
  meta?: Record<string, unknown>;
}

export interface AiSession {
  id: string;
  topic?: string;
  messages: AiMessage[];
  updatedAt: number;
}

