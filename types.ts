// This file defines all the custom types used throughout the application.

export type Tab = 'Dashboard' | 'Stats' | 'AI Coach' | 'Skills' | 'Goals';

export type IconName = 
  'target' | 'shield' | 'goalsAgainst' | 'clear' | 'shotsFaced' | 
  'minutes' | 'turnovers' | 'fire' | 'home' | 'arrowRight' | 
  'dashboard' | 'stats' | 'ai' | 'skills' | 'goals' | 'plus' | 
  'arrowLeft' | 'close' | 'user' | 'location' | 'settings' | 
  'check' | 'video' | 'trophy' | 'recruiting' | 'messaging' | 
  'profile' | 'menu' | 'bell' | 'filter' | 'share' | 'chevronDown' |
  'brain' | 'send' | 'play' | 'camera' | 'sparkles' | 'chart' | 'weight' | 'medal' | 'calendar' | 'graduationCap';

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
}

export interface Drill {
  id: string;
  title: string;
  category: string;
  tier: 'Foundation' | 'Advanced' | 'Elite';
  isCompleted: boolean;
  videoUrl?: string;
}

export interface Badge {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  isEarned: boolean;
}

