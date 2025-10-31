import type { Position } from '../types';

// Export AITone enum for use in onboarding
export enum AITone {
  Hype = 'hype',
  Mentor = 'mentor',
  Analyst = 'analyst',
  Captain = 'captain',
}

// Goal tier types
export type GoalTier = 'core' | 'challenge' | 'elite';

// Goal item interface
export interface GoalItem {
  id: string;
  title: string;
  tier: GoalTier;
}

// Position-based goal library structure
export interface PositionGoalLibrary {
  boys_goalie: GoalItem[];
  boys_defense: GoalItem[];
  boys_midfield: GoalItem[];
  boys_attack: GoalItem[];
  boys_lsm: GoalItem[];
  boys_fogo: GoalItem[];
  girls_goalie: GoalItem[];
  girls_defense: GoalItem[];
  girls_midfield: GoalItem[];
  girls_attack: GoalItem[];
}

// Position data structure
export interface PositionData {
  id: Position;
  name: string;
  icon: string;
  description: string;
}

export const POSITIONS = {
  Boys: [
    { id: 'Goalie' as Position, name: 'Goalie', icon: '🧤', description: 'Last line of defense. First line of attack.' },
    { id: 'Attack' as Position, name: 'Attack', icon: '🎯', description: 'Finish plays, create opportunities.' },
    { id: 'Midfield' as Position, name: 'Midfield', icon: '🏃‍♂️', description: 'Run the field, play both ends.' },
    { id: 'Defense' as Position, name: 'Defense', icon: '🛡️', description: 'Lock down opponents, start the transition.' },
    { id: 'LSM' as Position, name: 'LSM', icon: '🚀', description: 'Long-stick midfielder, a defensive threat.' },
    { id: 'FOGO' as Position, name: 'FOGO', icon: '💪', description: 'Own the X, control the game.' },
  ],
  Girls: [
    { id: 'Goalie' as Position, name: 'Goalie', icon: '🧤', description: 'Guardian of the net, leader of the defense.' },
    { id: 'Attack' as Position, name: 'Attack', icon: '🎯', description: 'Score goals and create scoring chances.' },
    { id: 'Midfield' as Position, name: 'Midfield', icon: '🏃‍♀️', description: 'Dominate the draw and transition game.' },
    { id: 'Defense' as Position, name: 'Defense', icon: '🛡️', description: 'Protect the goal with skill and strategy.' },
  ],
} as const;

// NOTE TO DEV: This local JSON will be replaced by a fetch from a remote library.
export const GOALS_LIBRARY: PositionGoalLibrary = {
  boys_goalie: [
    { id: "bg_core_1", title: "Maintain a 60%+ Save Percentage over the season.", tier: "core" },
    { id: "bg_core_2", title: "Record 100+ total saves this season.", tier: "core" },
    { id: "bg_core_3", title: "Complete 85%+ of clears successfully.", tier: "core" },
    { id: "bg_core_4", title: "Log 25+ ground balls this season.", tier: "core" },
    { id: "bg_core_5", title: "Limit turnovers to under 3 per game.", tier: "core" },
    { id: "bg_challenge_1", title: "Allow fewer than 7 goals per game on average.", tier: "challenge" },
    { id: "bg_challenge_2", title: "Achieve 3+ shutout quarters this season.", tier: "challenge" },
    { id: "bg_challenge_3", title: "Record 10+ saves in a single game.", tier: "challenge" },
    { id: "bg_challenge_4", title: "Improve save percentage by 5% compared to last season.", tier: "challenge" },
    { id: "bg_challenge_5", title: "Make 5+ one-on-one saves in a season.", tier: "challenge" },
    { id: "bg_challenge_6", title: "Record 1+ assist from a successful clear.", tier: "challenge" },
    { id: "bg_challenge_7", title: "Save 3+ penalty shots in a season.", tier: "challenge" },
    { id: "bg_challenge_8", title: "Record 3+ games allowing 5 or fewer goals.", tier: "challenge" },
    { id: "bg_elite_1", title: "Achieve a Goals Against Average (GAA) under 7.0.", tier: "elite" },
    { id: "bg_elite_2", title: "Record a save streak of 5+ consecutive stops in a game.", tier: "elite" },
    { id: "bg_elite_3", title: "Maintain at least 10+ saves per game across 5 straight games.", tier: "elite" },
    { id: "bg_elite_4", title: "Record 3+ games with 70%+ save percentage.", tier: "elite" },
    { id: "bg_elite_5", title: "Earn 1+ Defensive MVP or Player of the Game award.", tier: "elite" },
    { id: "bg_elite_6", title: "Earn an All-Conference nomination by season end.", tier: "elite" },
  ],
  boys_defense: [
    { id: "bd_core_1", title: "Cause 30+ turnovers this season.", tier: "core" },
    { id: "bd_core_2", title: "Recover 40+ ground balls.", tier: "core" },
    { id: "bd_core_3", title: "Maintain 90%+ clear success rate.", tier: "core" },
    { id: "bd_core_4", title: "Commit fewer than 10 penalties all season.", tier: "core" },
    { id: "bd_core_5", title: "Limit turnovers to under 1 per game.", tier: "core" },
    { id: "bd_challenge_1", title: "Limit assigned attacker to under 2 goals per game.", tier: "challenge" },
    { id: "bd_challenge_2", title: "Score 1+ goal this season.", tier: "challenge" },
    { id: "bd_challenge_3", title: "Record 3+ assists off fast breaks.", tier: "challenge" },
    { id: "bd_challenge_4", title: "Log 3+ caused turnovers in a single game.", tier: "challenge" },
    { id: "bd_challenge_5", title: "Be part of 3+ defensive shutout quarters.", tier: "challenge" },
    { id: "bd_challenge_6", title: "Recover 10+ ground balls in playoffs.", tier: "challenge" },
    { id: "bd_challenge_7", title: "Improve clear success rate by 5% from prior season.", tier: "challenge" },
    { id: "bd_challenge_8", title: "Record 2+ assists in transition plays.", tier: "challenge" },
    { id: "bd_challenge_9", title: "Win 10+ ground ball battles in a single game.", tier: "challenge" },
    { id: "bd_elite_1", title: "Record 5+ caused turnovers in playoff games.", tier: "elite" },
    { id: "bd_elite_2", title: "Record 20+ successful clears in playoffs.", tier: "elite" },
    { id: "bd_elite_3", title: "Hold opponents to under 8 goals per game in 5 consecutive games.", tier: "elite" },
    { id: "bd_elite_4", title: "Record 15+ caused turnovers against top 5 opponents.", tier: "elite" },
    { id: "bd_elite_5", title: "Maintain under 1.5 penalties per game.", tier: "elite" },
    { id: "bd_elite_6", title: "Earn an All-Defensive Team selection.", tier: "elite" },
  ],
  boys_midfield: [
    { id: "bm_core_1", title: "Score 20+ goals this season.", tier: "core" },
    { id: "bm_core_2", title: "Record 15+ assists.", tier: "core" },
    { id: "bm_core_3", title: "Recover 40+ ground balls.", tier: "core" },
    { id: "bm_core_4", title: "Cause 15+ turnovers.", tier: "core" },
    { id: "bm_core_5", title: "Commit under 20 turnovers this season.", tier: "core" },
    { id: "bm_challenge_1", title: "Maintain 50%+ shooting percentage.", tier: "challenge" },
    { id: "bm_challenge_2", title: "Play in 100% of regular-season games.", tier: "challenge" },
    { id: "bm_challenge_3", title: "Record 5+ multi-goal games.", tier: "challenge" },
    { id: "bm_challenge_4", title: "Score in 5+ consecutive games.", tier: "challenge" },
    { id: "bm_challenge_5", title: "Log 3+ game-winning goals.", tier: "challenge" },
    { id: "bm_challenge_6", title: "Record 1+ hat trick this season.", tier: "challenge" },
    { id: "bm_challenge_7", title: "Record 2+ assists in one game.", tier: "challenge" },
    { id: "bm_challenge_8", title: "Recover 5+ ground balls per game.", tier: "challenge" },
    { id: "bm_challenge_9", title: "Improve shot accuracy by 10% from last season.", tier: "challenge" },
    { id: "bm_elite_1", title: "Win 10+ faceoffs if rotating on the draw team.", tier: "elite" },
    { id: "bm_elite_2", title: "Average 2+ points per game.", tier: "elite" },
    { id: "bm_elite_3", title: "Record 5+ caused turnovers in a single game.", tier: "elite" },
    { id: "bm_elite_4", title: "Log 50%+ clear success rate individually.", tier: "elite" },
    { id: "bm_elite_5", title: "Earn 1+ Offensive MVP or Player of the Game award.", tier: "elite" },
    { id: "bm_elite_6", title: "Earn an All-League Midfield recognition.", tier: "elite" },
  ],
  boys_attack: [
    { id: "ba_core_1", title: "Score 35+ goals this season.", tier: "core" },
    { id: "ba_core_2", title: "Record 25+ assists.", tier: "core" },
    { id: "ba_core_3", title: "Maintain 55%+ shooting percentage.", tier: "core" },
    { id: "ba_core_4", title: "Commit under 20 turnovers.", tier: "core" },
    { id: "ba_core_5", title: "Recover 25+ ground balls in the offensive zone.", tier: "core" },
    { id: "ba_challenge_1", title: "Score in 10+ consecutive games.", tier: "challenge" },
    { id: "ba_challenge_2", title: "Record 3+ hat tricks.", tier: "challenge" },
    { id: "ba_challenge_3", title: "Score 2+ game-winning goals.", tier: "challenge" },
    { id: "ba_challenge_4", title: "Score 5+ man-up goals.", tier: "challenge" },
    { id: "ba_challenge_5", title: "Draw 10+ penalties through dodges or rides.", tier: "challenge" },
    { id: "ba_challenge_6", title: "Convert 80%+ of shots on goal.", tier: "challenge" },
    { id: "ba_challenge_7", title: "Record 5+ assists in playoffs.", tier: "challenge" },
    { id: "ba_challenge_8", title: "Improve shooting percentage by 5% from last season.", tier: "challenge" },
    { id: "ba_challenge_9", title: "Log 5+ rides that lead to turnovers.", tier: "challenge" },
    { id: "ba_elite_1", title: "Lead team in total points.", tier: "elite" },
    { id: "ba_elite_2", title: "Average 3+ points per game.", tier: "elite" },
    { id: "ba_elite_3", title: "Record 10+ multi-assist games.", tier: "elite" },
    { id: "ba_elite_4", title: "Score 10+ goals with off-hand.", tier: "elite" },
    { id: "ba_elite_5", title: "Record 2+ assists per game over a 5-game stretch.", tier: "elite" },
    { id: "ba_elite_6", title: "Earn an All-Conference or Team MVP award.", tier: "elite" },
  ],
  boys_lsm: [
    { id: "blsm_core_1", title: "Cause 25+ turnovers.", tier: "core" },
    { id: "blsm_core_2", title: "Recover 50+ ground balls.", tier: "core" },
    { id: "blsm_core_3", title: "Maintain 85%+ clear success rate.", tier: "core" },
    { id: "blsm_core_4", title: "Commit fewer than 15 penalties.", tier: "core" },
    { id: "blsm_core_5", title: "Limit turnovers to under 1 per game.", tier: "core" },
    { id: "blsm_challenge_1", title: "Record 2+ goals this season.", tier: "challenge" },
    { id: "blsm_challenge_2", title: "Earn 3+ assists from clears.", tier: "challenge" },
    { id: "blsm_challenge_3", title: "Record 5+ caused turnovers in a single game.", tier: "challenge" },
    { id: "blsm_challenge_4", title: "Recover 5+ ground balls per game.", tier: "challenge" },
    { id: "blsm_challenge_5", title: "Record 10+ interceptions.", tier: "challenge" },
    { id: "blsm_challenge_6", title: "Score 1+ fast-break goal off transition.", tier: "challenge" },
    { id: "blsm_challenge_7", title: "Record 20+ successful clears in playoffs.", tier: "challenge" },
    { id: "blsm_challenge_8", title: "Improve clear success by 10% from last season.", tier: "challenge" },
    { id: "blsm_elite_1", title: "Lead team in ground balls or caused turnovers.", tier: "elite" },
    { id: "blsm_elite_2", title: "Log 3+ assists during playoff play.", tier: "elite" },
    { id: "blsm_elite_3", title: "Maintain under 2 penalties per game.", tier: "elite" },
    { id: "blsm_elite_4", title: "Record 5+ multi-turnover games.", tier: "elite" },
    { id: "blsm_elite_5", title: "Record 40%+ ground ball win rate on faceoff wings.", tier: "elite" },
    { id: "blsm_elite_6", title: "Record 15+ caused turnovers against ranked opponents.", tier: "elite" },
    { id: "blsm_elite_7", title: "Earn All-Defensive or All-League honors.", tier: "elite" },
  ],
  boys_fogo: [
    { id: "bfogo_core_1", title: "Maintain 65%+ faceoff win rate.", tier: "core" },
    { id: "bfogo_core_2", title: "Win 200+ faceoffs this season.", tier: "core" },
    { id: "bfogo_core_3", title: "Recover 50+ ground balls.", tier: "core" },
    { id: "bfogo_core_4", title: "Commit fewer than 10 faceoff violations.", tier: "core" },
    { id: "bfogo_core_5", title: "Maintain under 3 turnovers per game.", tier: "core" },
    { id: "bfogo_challenge_1", title: "Win 75% of faceoffs in a single game.", tier: "challenge" },
    { id: "bfogo_challenge_2", title: "Score 3+ transition goals.", tier: "challenge" },
    { id: "bfogo_challenge_3", title: "Record 5+ assists off faceoff breaks.", tier: "challenge" },
    { id: "bfogo_challenge_4", title: "Win 10+ consecutive faceoffs in a game.", tier: "challenge" },
    { id: "bfogo_challenge_5", title: "Improve faceoff percentage by 5% over last season.", tier: "challenge" },
    { id: "bfogo_challenge_6", title: "Win 80%+ of first-quarter faceoffs.", tier: "challenge" },
    { id: "bfogo_challenge_7", title: "Record 2+ assists from fast breaks.", tier: "challenge" },
    { id: "bfogo_challenge_8", title: "Record 10+ ground balls in one game.", tier: "challenge" },
    { id: "bfogo_challenge_9", title: "Record 100+ ground balls across season.", tier: "challenge" },
    { id: "bfogo_elite_1", title: "Lead team in possession wins.", tier: "elite" },
    { id: "bfogo_elite_2", title: "Win 60%+ faceoffs against top-5 opponents.", tier: "elite" },
    { id: "bfogo_elite_3", title: "Limit faceoff losses to under 5 in 3 straight games.", tier: "elite" },
    { id: "bfogo_elite_4", title: "Maintain 70%+ win rate in playoff games.", tier: "elite" },
    { id: "bfogo_elite_5", title: "Win 50%+ of defensive zone faceoffs.", tier: "elite" },
    { id: "bfogo_elite_6", title: "Earn an All-League Faceoff nomination.", tier: "elite" },
  ],
  girls_goalie: [
    { id: "gg_core_1", title: "Maintain 55%+ save percentage.", tier: "core" },
    { id: "gg_core_2", title: "Record 100+ total saves.", tier: "core" },
    { id: "gg_core_3", title: "Complete 85%+ of clears successfully.", tier: "core" },
    { id: "gg_core_4", title: "Recover 25+ ground balls.", tier: "core" },
    { id: "gg_core_5", title: "Limit turnovers to under 3 per game.", tier: "core" },
    { id: "gg_challenge_1", title: "Allow under 7 goals per game.", tier: "challenge" },
    { id: "gg_challenge_2", title: "Achieve 3+ shutout quarters.", tier: "challenge" },
    { id: "gg_challenge_3", title: "Record 10+ saves in a game.", tier: "challenge" },
    { id: "gg_challenge_4", title: "Keep GAA under 7.5.", tier: "challenge" },
    { id: "gg_challenge_5", title: "Improve save percentage by 5%.", tier: "challenge" },
    { id: "gg_challenge_6", title: "Save 3+ penalty shots this season.", tier: "challenge" },
    { id: "gg_challenge_7", title: "Record 1+ assist from a clear.", tier: "challenge" },
    { id: "gg_challenge_8", title: "Save 10+ shots in playoff games.", tier: "challenge" },
    { id: "gg_elite_1", title: "Record 5+ games with 60%+ save rate.", tier: "elite" },
    { id: "gg_elite_2", title: "Log 3+ games allowing 5 or fewer goals.", tier: "elite" },
    { id: "gg_elite_3", title: "Make 5+ one-on-one saves this season.", tier: "elite" },
    { id: "gg_elite_4", title: "Achieve 5+ consecutive saves in a game.", tier: "elite" },
    { id: "gg_elite_5", title: "Improve GAA by 0.5 from last season.", tier: "elite" },
    { id: "gg_elite_6", title: "Earn an All-Conference Goalie award.", tier: "elite" },
  ],
  girls_defense: [
    { id: "gd_core_1", title: "Cause 25+ turnovers.", tier: "core" },
    { id: "gd_core_2", title: "Recover 35+ ground balls.", tier: "core" },
    { id: "gd_core_3", title: "Maintain 90%+ clear success rate.", tier: "core" },
    { id: "gd_core_4", title: "Commit under 10 penalties.", tier: "core" },
    { id: "gd_core_5", title: "Maintain under 2 turnovers per game.", tier: "core" },
    { id: "gd_challenge_1", title: "Limit assigned attacker to under 2 goals per game.", tier: "challenge" },
    { id: "gd_challenge_2", title: "Record 5+ caused turnovers in a single game.", tier: "challenge" },
    { id: "gd_challenge_3", title: "Record 10+ clears in playoffs.", tier: "challenge" },
    { id: "gd_challenge_4", title: "Recover 5+ ground balls in a game.", tier: "challenge" },
    { id: "gd_challenge_5", title: "Record 15+ successful clears per game average.", tier: "challenge" },
    { id: "gd_challenge_6", title: "Improve clear rate by 5% from last season.", tier: "challenge" },
    { id: "gd_challenge_7", title: "Record 3+ assists off successful clears.", tier: "challenge" },
    { id: "gd_challenge_8", title: "Record 1+ goal this season.", tier: "challenge" },
    { id: "gd_elite_1", title: "Hold opponents under 6 goals per game in 5 straight matches.", tier: "elite" },
    { id: "gd_elite_2", title: "Record 3+ interceptions.", tier: "elite" },
    { id: "gd_elite_3", title: "Lead team in caused turnovers or clears.", tier: "elite" },
    { id: "gd_elite_4", title: "Record 25+ successful clears in playoffs.", tier: "elite" },
    { id: "gd_elite_5", title: "Maintain under 1.5 penalties per game.", tier: "elite" },
    { id: "gd_elite_6", title: "Record 10+ ground balls in playoffs.", tier: "elite" },
    { id: "gd_elite_7", title: "Earn an All-Defensive Team selection.", tier: "elite" },
  ],
  girls_midfield: [
    { id: "gm_core_1", title: "Score 25+ goals.", tier: "core" },
    { id: "gm_core_2", title: "Record 15+ assists.", tier: "core" },
    { id: "gm_core_3", title: "Win 50+ draw controls.", tier: "core" },
    { id: "gm_core_4", title: "Recover 40+ ground balls.", tier: "core" },
    { id: "gm_core_5", title: "Commit under 25 turnovers this season.", tier: "core" },
    { id: "gm_challenge_1", title: "Maintain 50%+ shooting percentage.", tier: "challenge" },
    { id: "gm_challenge_2", title: "Cause 20+ turnovers.", tier: "challenge" },
    { id: "gm_challenge_3", title: "Record 10+ multi-goal games.", tier: "challenge" },
    { id: "gm_challenge_4", title: "Score in 8+ consecutive games.", tier: "challenge" },
    { id: "gm_challenge_5", title: "Average 3+ points per game.", tier: "challenge" },
    { id: "gm_challenge_6", title: "Improve draw win rate by 10%.", tier: "challenge" },
    { id: "gm_challenge_7", title: "Win 5+ draw controls in a single game.", tier: "challenge" },
    { id: "gm_challenge_8", title: "Record 30+ ground balls by midseason.", tier: "challenge" },
    { id: "gm_challenge_9", title: "Record 5+ assists in playoffs.", tier: "challenge" },
    { id: "gm_elite_1", title: "Score 2+ game-winning goals.", tier: "elite" },
    { id: "gm_elite_2", title: "Score 1+ hat trick this season.", tier: "elite" },
    { id: "gm_elite_3", title: "Maintain 90%+ clear success rate.", tier: "elite" },
    { id: "gm_elite_4", title: "Lead team in draw controls or assists.", tier: "elite" },
    { id: "gm_elite_5", title: "Recover 60+ ground balls in the full season.", tier: "elite" },
    { id: "gm_elite_6", title: "Earn an All-League Midfield award.", tier: "elite" },
  ],
  girls_attack: [
    { id: "ga_core_1", title: "Score 40+ goals.", tier: "core" },
    { id: "ga_core_2", title: "Record 25+ assists.", tier: "core" },
    { id: "ga_core_3", title: "Maintain 55%+ shooting percentage.", tier: "core" },
    { id: "ga_core_4", title: "Commit under 15 turnovers.", tier: "core" },
    { id: "ga_core_5", title: "Recover 20+ ground balls.", tier: "core" },
    { id: "ga_challenge_1", title: "Score in every game this season.", tier: "challenge" },
    { id: "ga_challenge_2", title: "Record 5+ hat tricks.", tier: "challenge" },
    { id: "ga_challenge_3", title: "Log 10+ multi-assist games.", tier: "challenge" },
    { id: "ga_challenge_4", title: "Score 2+ game-winning goals.", tier: "challenge" },
    { id: "ga_challenge_5", title: "Draw 10+ shooting space penalties.", tier: "challenge" },
    { id: "ga_challenge_6", title: "Improve shot percentage by 5%.", tier: "challenge" },
    { id: "ga_challenge_7", title: "Convert 80%+ of free position shots.", tier: "challenge" },
    { id: "ga_challenge_8", title: "Score 10+ man-up goals.", tier: "challenge" },
    { id: "ga_challenge_9", title: "Record 5+ assists in playoffs.", tier: "challenge" },
    { id: "ga_elite_1", title: "Lead team in total points.", tier: "elite" },
    { id: "ga_elite_2", title: "Score 10+ goals in playoffs.", tier: "elite" },
    { id: "ga_elite_3", title: "Maintain 80%+ of shots on goal accuracy.", tier: "elite" },
    { id: "ga_elite_4", title: "Average 3+ points per game.", tier: "elite" },
    { id: "ga_elite_5", title: "Score 25%+ of team's total goals.", tier: "elite" },
    { id: "ga_elite_6", title: "Earn an All-Conference or Team MVP award.", tier: "elite" },
  ],
};

export const TONES = [
  { id: AITone.Hype, title: 'Hype', description: "Let's go! Energy up, focus sharp.", sample: "You're on fire! That last game was epic. Let's keep that momentum rolling into practice this week!" },
  { id: AITone.Mentor, title: 'Mentor', description: 'Guidance, patience, long-term progress.', sample: "Great effort. I noticed you excelled in X. Let's focus on refining Y to build a more complete game." },
  { id: AITone.Analyst, title: 'Analyst', description: 'Data-driven, no sugarcoating.', sample: "Your save percentage dropped 5% in the 4th quarter. Data suggests fatigue. Let's add conditioning drills." },
  { id: AITone.Captain, title: 'Captain', description: 'Accountability and leadership.', sample: "We need you to step up. Your clears are solid, but let's lead the defense by being more vocal. Let's get it done." },
];

export const DNA_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'What motivates you most?',
    options: ['Beating competition', 'Personal growth', 'Recognition and rewards', 'Team success'],
  },
  {
    id: 'q2',
    question: 'How do you react after a tough game?',
    options: ['Analyze mistakes immediately', 'Forget and move on', 'Use it to fuel training', 'Talk with coach/team'],
  },
  {
    id: 'q3',
    question: 'Which describes your training style?',
    options: ['Consistent and steady', 'All-in before big games', 'Competitive with teammates', 'Self-motivated, solo work'],
  },
  {
    id: 'q4',
    question: "What's your preferred feedback style?",
    options: ['Direct and honest', 'Supportive and encouraging', 'Motivational challenges', 'Quiet accountability'],
  },
  {
    id: 'q5',
    question: 'How often do you reflect on your games currently?',
    options: ['Every game', 'Once a week', 'Rarely', 'Never (starting now!)'],
  },
];

// Helper function to get goals for a position and gender
export function getGoalsForPosition(
  position: Position,
  gender: 'Boys' | 'Girls'
): GoalItem[] {
  const positionKey = `${gender.toLowerCase()}_${position.toLowerCase()}` as keyof PositionGoalLibrary;
  return GOALS_LIBRARY[positionKey] || [];
}

// Helper function to get goals by tier
export function getGoalsByTier(
  goals: GoalItem[],
  tier: GoalTier
): GoalItem[] {
  return goals.filter((goal) => goal.tier === tier);
}

