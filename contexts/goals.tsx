import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Position, UserBadge, UserGoal } from '../types';
import { getMockGoalsForPosition } from '../utils/mockGoals';
import { getBadgeCatalogForPosition } from '../utils/mockBadges';
import { evaluateBadgesFromGoals, incrementGoal, recalcGoal } from '../utils/goals';

type GoalsContextValue = {
  position: Position;
  goals: UserGoal[];
  badges: UserBadge[];
  daysActive: number;
  addGoal: (goal: Omit<UserGoal, 'id' | 'createdAt' | 'updatedAt' | 'progressPct' | 'status'>) => void;
  updateGoal: (goalId: string, updates: Partial<UserGoal>) => void;
  deleteGoal: (goalId: string) => void;
  toggleComplete: (goalId: string) => void;
  incrementMetric: (goalId: string, delta: number) => void;
  awardBadgesForStats: (stats: Record<string, number>) => void; // stub for future FAB integration
};

export const GoalsContext = createContext<GoalsContextValue | undefined>(undefined);

type ProviderProps = { children: React.ReactNode };

export const GoalsProvider: React.FC<ProviderProps> = ({ children }) => {
  // Mock position for seeding; integrate with profile later
  const [position] = useState<Position>('Goalie');
  const [goals, setGoals] = useState<UserGoal[]>(() => getMockGoalsForPosition(position));
  const [badges, setBadges] = useState<UserBadge[]>(() => getBadgeCatalogForPosition(position));

  const recalcBadges = useCallback((nextGoals: UserGoal[]) => {
    setBadges(prev => evaluateBadgesFromGoals(nextGoals, prev));
  }, []);

  const addGoal: GoalsContextValue['addGoal'] = useCallback((goalInput) => {
    const id = Math.random().toString(36).slice(2);
    const base: UserGoal = {
      ...goalInput,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progressPct: 0,
      status: 'pending',
    };
    const next = recalcGoal(base);
    setGoals(prev => {
      const arr = [next, ...prev];
      recalcBadges(arr);
      return arr;
    });
  }, [recalcBadges]);

  const updateGoal: GoalsContextValue['updateGoal'] = useCallback((goalId, updates) => {
    setGoals(prev => {
      const arr = prev.map(g => g.id === goalId ? recalcGoal({ ...g, ...updates, updatedAt: new Date().toISOString() }) : g);
      recalcBadges(arr);
      return arr;
    });
  }, [recalcBadges]);

  const deleteGoal: GoalsContextValue['deleteGoal'] = useCallback((goalId) => {
    setGoals(prev => {
      const arr = prev.filter(g => g.id !== goalId);
      recalcBadges(arr);
      return arr;
    });
  }, [recalcBadges]);

  const toggleComplete: GoalsContextValue['toggleComplete'] = useCallback((goalId) => {
    setGoals(prev => {
      const arr = prev.map(g => g.id === goalId ? recalcGoal({ ...g, completed: !g.completed }) : g);
      recalcBadges(arr);
      return arr;
    });
  }, [recalcBadges]);

  const incrementMetric: GoalsContextValue['incrementMetric'] = useCallback((goalId, delta) => {
    setGoals(prev => {
      const arr = prev.map(g => g.id === goalId ? incrementGoal(g, delta) : g);
      recalcBadges(arr);
      return arr;
    });
  }, [recalcBadges]);

  const awardBadgesForStats: GoalsContextValue['awardBadgesForStats'] = useCallback((_stats) => {
    // Placeholder: integrate with real stats later
    setBadges(prev => evaluateBadgesFromGoals(goals, prev));
  }, [goals]);

  const daysActive = useMemo(() => {
    // Simple streak mock: count distinct days with any goal updatedAt in last 30 days
    const set = new Set<string>();
    const now = Date.now();
    goals.forEach(g => {
      const t = new Date(g.updatedAt).getTime();
      if (now - t <= 30 * 24 * 60 * 60 * 1000) {
        set.add(new Date(g.updatedAt).toDateString());
      }
    });
    return set.size;
  }, [goals]);

  const value: GoalsContextValue = {
    position,
    goals,
    badges,
    daysActive,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleComplete,
    incrementMetric,
    awardBadgesForStats,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const ctx = React.useContext(GoalsContext);
  if (!ctx) throw new Error('useGoals must be used within GoalsProvider');
  return ctx;
};


