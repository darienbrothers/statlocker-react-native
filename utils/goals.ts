import { GoalStatus, UserBadge, UserGoal } from '../types';

export const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

export const computeProgressPct = (currentValue: number, targetValue: number): number => {
  if (targetValue <= 0) return 0;
  return clamp((currentValue / targetValue) * 100);
};

export const deriveStatus = (progressPct: number): GoalStatus => {
  if (progressPct >= 100) return 'completed';
  if (progressPct >= 85) return 'ahead';
  if (progressPct >= 60) return 'on_track';
  return 'behind';
};

export const recalcGoal = (goal: UserGoal): UserGoal => {
  const progressPct = computeProgressPct(goal.currentValue, goal.targetValue);
  const status = deriveStatus(progressPct);
  const completed = progressPct >= 100 || goal.completed === true;
  return {
    ...goal,
    progressPct,
    status,
    completed,
    completedAt: completed && !goal.completedAt ? new Date().toISOString() : goal.completedAt,
    updatedAt: new Date().toISOString(),
  };
};

export const incrementGoal = (goal: UserGoal, delta: number): UserGoal => {
  const next = { ...goal, currentValue: Math.max(0, goal.currentValue + delta) };
  return recalcGoal(next);
};

// Simple badge awarding rules for mock
// Extend this with richer logic (stats-aware) when integrating FAB/Game Log
export const evaluateBadgesFromGoals = (goals: UserGoal[], badges: UserBadge[]): UserBadge[] => {
  const byTitle = new Map<string, UserGoal>(goals.map(g => [g.title, g]));
  return badges.map(b => {
    // Example mappings
    if (b.title === 'The Wall') {
      const g = byTitle.get('100 Season Saves') || byTitle.get('15 Saves in a Game');
      const unlocked = !!g && (g.completed || g.progressPct >= 100);
      return { ...b, unlocked, earnedAt: unlocked ? b.earnedAt ?? new Date().toISOString() : undefined };
    }
    if (b.title === 'First Goal Set') {
      const unlocked = goals.length > 0;
      return { ...b, unlocked, earnedAt: unlocked ? b.earnedAt ?? new Date().toISOString() : undefined };
    }
    if (b.title === 'Streak On Fire') {
      // Placeholder: streak evaluation is handled elsewhere; keep locked by default
      return b;
    }
    return b;
  });
};


