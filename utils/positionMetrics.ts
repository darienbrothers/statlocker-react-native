import type { IconName, AccentColor } from '../types';

export type Position = 'Goalie' | 'Attack' | 'Midfield' | 'Defense' | 'FOGO';

export interface PositionMetric {
  id: string;
  title: string;
  formula: string;
  purpose: string;
  icon: IconName;
  iconBgColor: AccentColor;
  unit: '%' | 'count' | 'avg' | '';
}

export const positionMetrics: Record<Position, PositionMetric[]> = {
  Goalie: [
    {
      id: 'save_pct',
      title: 'Save %',
      formula: '(Saves ÷ Shots Faced) × 100',
      purpose: 'Efficiency',
      icon: 'target',
      iconBgColor: 'purple',
      unit: '%',
    },
    {
      id: 'gaa',
      title: 'Goals Against Avg',
      formula: 'Goals Allowed ÷ Games Played',
      purpose: 'Defense anchor',
      icon: 'goalsAgainst',
      iconBgColor: 'purple',
      unit: 'avg',
    },
    {
      id: 'clear_pct',
      title: 'Clear %',
      formula: '(Successful ÷ Attempted) × 100',
      purpose: 'Transition success',
      icon: 'clear',
      iconBgColor: 'blue',
      unit: '%',
    },
    {
      id: 'ground_balls',
      title: 'Ground Balls',
      formula: 'Count',
      purpose: 'Hustle metric',
      icon: 'shield',
      iconBgColor: 'green',
      unit: 'count',
    },
    {
      id: 'turnovers',
      title: 'Turnovers',
      formula: 'Count',
      purpose: 'Risk indicator',
      icon: 'turnovers',
      iconBgColor: 'red',
      unit: 'count',
    },
  ],
  Attack: [
    {
      id: 'goals',
      title: 'Goals',
      formula: 'Count',
      purpose: 'Scoring output',
      icon: 'fire',
      iconBgColor: 'orange',
      unit: 'count',
    },
    {
      id: 'assists',
      title: 'Assists',
      formula: 'Count',
      purpose: 'Playmaking',
      icon: 'chart',
      iconBgColor: 'cyan',
      unit: 'count',
    },
    {
      id: 'shot_pct',
      title: 'Shooting %',
      formula: '(Goals ÷ Shots) × 100',
      purpose: 'Shot efficiency',
      icon: 'target',
      iconBgColor: 'purple',
      unit: '%',
    },
    {
      id: 'points',
      title: 'Points/G',
      formula: 'Goals + Assists',
      purpose: 'Total impact',
      icon: 'trophy',
      iconBgColor: 'green',
      unit: 'avg',
    },
  ],
  Midfield: [
    {
      id: 'draw_pct',
      title: 'Draw %',
      formula: '(Wins ÷ Attempts) × 100',
      purpose: 'Possession control',
      icon: 'target',
      iconBgColor: 'purple',
      unit: '%',
    },
    {
      id: 'faceoff_pct',
      title: 'Faceoff %',
      formula: '(Wins ÷ Attempts) × 100',
      purpose: 'Ground ball control',
      icon: 'shield',
      iconBgColor: 'green',
      unit: '%',
    },
    {
      id: 'points',
      title: 'Points/G',
      formula: 'Goals + Assists',
      purpose: 'Offensive production',
      icon: 'trophy',
      iconBgColor: 'orange',
      unit: 'avg',
    },
    {
      id: 'ground_balls',
      title: 'Ground Balls',
      formula: 'Count',
      purpose: 'Hustle metric',
      icon: 'fire',
      iconBgColor: 'blue',
      unit: 'count',
    },
  ],
  Defense: [
    {
      id: 'caused_turnovers',
      title: 'Caused Turnovers',
      formula: 'Count',
      purpose: 'Defensive impact',
      icon: 'shield',
      iconBgColor: 'green',
      unit: 'count',
    },
    {
      id: 'ground_balls',
      title: 'Ground Balls',
      formula: 'Count',
      purpose: 'Hustle metric',
      icon: 'fire',
      iconBgColor: 'blue',
      unit: 'count',
    },
    {
      id: 'clear_pct',
      title: 'Clear %',
      formula: '(Successful ÷ Attempted) × 100',
      purpose: 'Transition success',
      icon: 'clear',
      iconBgColor: 'cyan',
      unit: '%',
    },
    {
      id: 'turnovers',
      title: 'Turnovers',
      formula: 'Count',
      purpose: 'Risk indicator',
      icon: 'turnovers',
      iconBgColor: 'red',
      unit: 'count',
    },
  ],
  FOGO: [
    {
      id: 'faceoff_pct',
      title: 'FO%',
      formula: '(Wins ÷ Attempts) × 100',
      purpose: 'Possession control',
      icon: 'target',
      iconBgColor: 'purple',
      unit: '%',
    },
    {
      id: 'ground_balls',
      title: 'Ground Balls',
      formula: 'Count',
      purpose: 'Post-possession hustle',
      icon: 'fire',
      iconBgColor: 'green',
      unit: 'count',
    },
  ],
};

export function getMetricsForPosition(position: Position): PositionMetric[] {
  return positionMetrics[position] || [];
}

