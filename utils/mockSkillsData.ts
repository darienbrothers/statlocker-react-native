// Mock Wall Ball data for Skills Tab
// Implements tiers: Bronze → Silver → Gold → Platinum

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export type Position = 'Goalie' | 'Attack' | 'Midfield' | 'Defense';
export type DrillType = 'Passing' | 'Catching' | 'Reaction' | 'Clearing' | 'Saving' | 'Shooting';

export interface WallBallDrill {
  id: string;
  title: string;
  tier: Tier;
  positionTags: Position[];
  type: DrillType;
  targetReps: number; // Minimum reps to complete
  estTimeMin: number;
  description?: string;
}

// Wall Ball drill library
export const wallBallDrills: WallBallDrill[] = [
  // BRONZE TIER
  {
    id: 'WB_BRZ_01',
    title: 'Basic Dominant Hand Bounce Passes',
    tier: 'Bronze',
    positionTags: ['Attack', 'Midfield', 'Defense'],
    type: 'Passing',
    targetReps: 50,
    estTimeMin: 10,
    description: 'Wall ball from 10 feet with your dominant hand. Focus on accuracy and consistent bounces.',
  },
  {
    id: 'WB_BRZ_02',
    title: 'Quick Stick Passing',
    tier: 'Bronze',
    positionTags: ['Attack', 'Midfield'],
    type: 'Passing',
    targetReps: 50,
    estTimeMin: 15,
    description: 'Quick passes against wall without cradling. Build hand speed and muscle memory.',
  },
  {
    id: 'WB_BRZ_03',
    title: 'Low Save Control',
    tier: 'Bronze',
    positionTags: ['Goalie'],
    type: 'Saving',
    targetReps: 40,
    estTimeMin: 12,
    description: 'Roll ball against wall low, catch with stick in bottom hand position.',
  },
  {
    id: 'WB_BRZ_04',
    title: 'Off-Hand Ground Balls',
    tier: 'Bronze',
    positionTags: ['Goalie', 'Midfield', 'Defense'],
    type: 'Passing',
    targetReps: 30,
    estTimeMin: 15,
    description: 'Practice ground ball pickups with your weak hand. Build two-way threat.',
  },
  {
    id: 'WB_BRZ_05',
    title: 'One-Hand Catches',
    tier: 'Bronze',
    positionTags: ['Attack', 'Midfield'],
    type: 'Catching',
    targetReps: 40,
    estTimeMin: 10,
    description: 'Wall ball with catches using only your top hand for ball security.',
  },

  // SILVER TIER
  {
    id: 'WB_SLV_01',
    title: 'Split Dodges with Passes',
    tier: 'Silver',
    positionTags: ['Attack', 'Midfield'],
    type: 'Passing',
    targetReps: 60,
    estTimeMin: 20,
    description: 'Dodge around cone/pillar while maintaining clean pass rhythm.',
  },
  {
    id: 'WB_SLV_02',
    title: 'Behind-the-Back Passes',
    tier: 'Silver',
    positionTags: ['Attack'],
    type: 'Passing',
    targetReps: 50,
    estTimeMin: 18,
    description: 'Advanced passing technique. Start slow, focus on control over speed.',
  },
  {
    id: 'WB_SLV_03',
    title: 'Rapid Fire Reaction Saves',
    tier: 'Silver',
    positionTags: ['Goalie'],
    type: 'Reaction',
    targetReps: 60,
    estTimeMin: 15,
    description: 'Wall ball mixed high/mid/low. React fast, secure with two hands.',
  },
  {
    id: 'WB_SLV_04',
    title: 'Cross-Body Save Drills',
    tier: 'Silver',
    positionTags: ['Goalie'],
    type: 'Saving',
    targetReps: 45,
    estTimeMin: 15,
    description: 'Wall ball high to opposite side, catch across body position.',
  },
  {
    id: 'WB_SLV_05',
    title: 'Clearing Under Pressure',
    tier: 'Silver',
    positionTags: ['Goalie', 'Defense'],
    type: 'Clearing',
    targetReps: 50,
    estTimeMin: 20,
    description: 'Simulate clearing situations. Target specific zones on wall.',
  },
  {
    id: 'WB_SLV_06',
    title: 'Off-Hand Quick Reactions',
    tier: 'Silver',
    positionTags: ['Attack', 'Midfield'],
    type: 'Reaction',
    targetReps: 40,
    estTimeMin: 18,
    description: 'Quick catches and releases with weak hand. No cradling.',
  },
  {
    id: 'WB_SLV_07',
    title: 'Ground Ball → Quick Pass',
    tier: 'Silver',
    positionTags: ['Midfield', 'Defense'],
    type: 'Passing',
    targetReps: 50,
    estTimeMin: 22,
    description: 'Pick up ground ball, immediately pass to wall on first touch.',
  },

  // GOLD TIER
  {
    id: 'WB_GLD_01',
    title: 'Elite Hand Speed Training',
    tier: 'Gold',
    positionTags: ['Attack', 'Midfield'],
    type: 'Passing',
    targetReps: 100,
    estTimeMin: 25,
    description: 'Maximum speed passing for 60 seconds, rest 30s, repeat.',
  },
  {
    id: 'WB_GLD_02',
    title: 'Full-Body Extension Saves',
    tier: 'Gold',
    positionTags: ['Goalie'],
    type: 'Saving',
    targetReps: 50,
    estTimeMin: 20,
    description: 'Reach full extension for high shots. Maintain control on return.',
  },
  {
    id: 'WB_GLD_03',
    title: 'Advanced Stick Fakes',
    tier: 'Gold',
    positionTags: ['Attack', 'Midfield', 'Goalie'],
    type: 'Passing',
    targetReps: 60,
    estTimeMin: 25,
    description: 'Incorporate fakes into passing rhythm. Keep passer off balance.',
  },
  {
    id: 'WB_GLD_04',
    title: 'Long-Range Clearing Passes',
    tier: 'Gold',
    positionTags: ['Goalie', 'Defense'],
    type: 'Clearing',
    targetReps: 40,
    estTimeMin: 20,
    description: 'Wall ball from 15-20 feet. Strengthen clearing distance.',
  },
  {
    id: 'WB_GLD_05',
    title: 'Weak Hand Scoring Shots',
    tier: 'Gold',
    positionTags: ['Attack', 'Midfield'],
    type: 'Shooting',
    targetReps: 50,
    estTimeMin: 22,
    description: 'Shoot on goal with off-hand. Focus on power and accuracy.',
  },
  {
    id: 'WB_GLD_06',
    title: 'Multi-Angle Goalie Reactions',
    tier: 'Gold',
    positionTags: ['Goalie'],
    type: 'Reaction',
    targetReps: 80,
    estTimeMin: 30,
    description: 'Wall ball from three angles around crease. Rapid fire changes.',
  },

  // PLATINUM TIER
  {
    id: 'WB_PLT_01',
    title: 'Platinum Pace Drills',
    tier: 'Platinum',
    positionTags: ['Attack', 'Midfield'],
    type: 'Passing',
    targetReps: 150,
    estTimeMin: 30,
    description: 'Maximum speed and accuracy for extended time. Elite conditioning.',
  },
  {
    id: 'WB_PLT_02',
    title: 'Complete Goalie Reflexes',
    tier: 'Platinum',
    positionTags: ['Goalie'],
    type: 'Reaction',
    targetReps: 100,
    estTimeMin: 35,
    description: 'Combines all save types, all angles, no drops allowed.',
  },
  {
    id: 'WB_PLT_03',
    title: 'Ambidextrous Wall Ball Mastery',
    tier: 'Platinum',
    positionTags: ['Attack', 'Midfield'],
    type: 'Passing',
    targetReps: 120,
    estTimeMin: 35,
    description: 'Alternate hands every 10 reps. Maintain identical form and speed.',
  },
  {
    id: 'WB_PLT_04',
    title: 'Game-Speed Clearing Series',
    tier: 'Platinum',
    positionTags: ['Goalie', 'Defense'],
    type: 'Clearing',
    targetReps: 80,
    estTimeMin: 30,
    description: 'Pressure simulation with moving targets and directional changes.',
  },
  {
    id: 'WB_PLT_05',
    title: 'Elite Two-Way Threat',
    tier: 'Platinum',
    positionTags: ['Attack', 'Midfield'],
    type: 'Passing',
    targetReps: 200,
    estTimeMin: 40,
    description: 'Dominant + off-hand hybrid. Pass/catch/shoot from both sides.',
  },
  {
    id: 'WB_PLT_06',
    title: 'Championship Goalie Conditioning',
    tier: 'Platinum',
    positionTags: ['Goalie'],
    type: 'Saving',
    targetReps: 120,
    estTimeMin: 40,
    description: 'High intensity, all save types, sustained speed. 4th quarter mindset.',
  },
];

// Default user progress (starting state)
export interface UserSkillsProgress {
  tier: Tier;
  completedDrillIds: string[];
  repsLogged: Record<string, number>;
}

export const defaultProgress: UserSkillsProgress = {
  tier: 'Bronze',
  completedDrillIds: [],
  repsLogged: {},
};

// Helper: Get drills for a specific tier
export function getDrillsByTier(tier: Tier): WallBallDrill[] {
  return wallBallDrills.filter(d => d.tier === tier);
}

// Helper: Get all drills
export function getAllDrills(): WallBallDrill[] {
  return wallBallDrills;
}

// Helper: Get next tier
export function getNextTier(currentTier: Tier): Tier | null {
  const tierOrder: Tier[] = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const currentIndex = tierOrder.indexOf(currentTier);
  if (currentIndex === -1 || currentIndex === tierOrder.length - 1) {
    return null;
  }
  return tierOrder[currentIndex + 1];
}

// Helper: Get tier color
export function getTierColor(tier: Tier): string {
  switch (tier) {
    case 'Bronze':
      return '#CD7F32';
    case 'Silver':
      return '#C0C0C0';
    case 'Gold':
      return '#FFD700';
    case 'Platinum':
      return '#E5E4E2';
    default:
      return '#6B7280';
  }
}

