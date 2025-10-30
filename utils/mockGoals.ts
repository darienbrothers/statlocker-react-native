import { AccentColor, IconName, Position, UserGoal } from '../types';

const nowIso = () => new Date().toISOString();

type Seed = Omit<UserGoal, 'id' | 'createdAt' | 'updatedAt'> & { id?: string };

const makeGoal = (seed: Seed): UserGoal => ({
  id: seed.id ?? Math.random().toString(36).slice(2),
  title: seed.title,
  metric: seed.metric,
  units: seed.units,
  targetValue: seed.targetValue,
  currentValue: seed.currentValue,
  progressPct: seed.progressPct,
  status: seed.status,
  completed: seed.completed,
  createdAt: nowIso(),
  updatedAt: nowIso(),
  dueAt: seed.dueAt,
  completedAt: seed.completedAt,
  position: seed.position,
  icon: seed.icon as IconName | undefined,
  accent: seed.accent as AccentColor | undefined,
});

export const getMockGoalsForPosition = (position: Position): UserGoal[] => {
  switch (position) {
    case 'Goalie':
      return [
        makeGoal({
          title: '80% Save Percentage',
          metric: 'savePct',
          units: '%',
          targetValue: 80,
          currentValue: 72,
          progressPct: 72 / 80 * 100,
          status: 'on_track',
          icon: 'shield',
          accent: 'purple',
          position,
        }),
        makeGoal({
          title: '100 Season Saves',
          metric: 'saves',
          units: 'count',
          targetValue: 100,
          currentValue: 64,
          progressPct: 64,
          status: 'on_track',
          icon: 'trophy',
          accent: 'green',
          position,
        }),
      ];
    case 'Attack':
      return [
        makeGoal({
          title: '20 Goals This Season',
          metric: 'goals',
          units: 'count',
          targetValue: 20,
          currentValue: 9,
          progressPct: 45,
          status: 'behind',
          icon: 'target',
          accent: 'orange',
          position,
        }),
        makeGoal({
          title: '10 Assists',
          metric: 'assists',
          units: 'count',
          targetValue: 10,
          currentValue: 6,
          progressPct: 60,
          status: 'on_track',
          icon: 'sparkles',
          accent: 'blue',
          position,
        }),
      ];
    default:
      return [
        makeGoal({
          title: '50 Ground Balls',
          metric: 'groundBalls',
          units: 'count',
          targetValue: 50,
          currentValue: 18,
          progressPct: 36,
          status: 'pending',
          icon: 'weight',
          accent: 'cyan',
          position,
        }),
      ];
  }
};


