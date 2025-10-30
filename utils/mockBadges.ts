import { Position, UserBadge } from '../types';

const makeBadge = (b: Omit<UserBadge, 'id' | 'unlocked'> & { id?: string; unlocked?: boolean }): UserBadge => ({
  id: b.id ?? Math.random().toString(36).slice(2),
  title: b.title,
  description: b.description,
  unlocked: b.unlocked ?? false,
  earnedAt: b.earnedAt,
  icon: b.icon,
  tier: b.tier,
  category: b.category,
  position: b.position,
});

export const getBadgeCatalogForPosition = (position: Position | 'All'): UserBadge[] => {
  const universal: UserBadge[] = [
    makeBadge({ title: 'First Goal Set', description: 'Create your first goal.', icon: 'target', category: 'engagement', position: 'All', tier: 'Bronze' }),
    makeBadge({ title: 'Streak On Fire', description: '10 active days in a row.', icon: 'fire', category: 'consistency', position: 'All', tier: 'Silver' }),
  ];

  if (position === 'Goalie') {
    return [
      ...universal,
      makeBadge({ title: 'The Wall', description: '15+ saves in a game.', icon: 'trophy', category: 'performance', position: 'Goalie', tier: 'Gold' }),
      makeBadge({ title: 'Quick Clear King', description: '90%+ clear success.', icon: 'clear', category: 'performance', position: 'Goalie', tier: 'Silver' }),
    ];
  }

  if (position === 'Attack') {
    return [
      ...universal,
      makeBadge({ title: 'Sniper', description: '5+ goals in a game.', icon: 'target', category: 'performance', position: 'Attack', tier: 'Gold' }),
      makeBadge({ title: 'Assist Artist', description: '3 assists in one game.', icon: 'sparkles', category: 'teamwork', position: 'Attack', tier: 'Silver' }),
    ];
  }

  return universal;
};


