import type { Game, AIInsight, ChartDataPoint, QuarterStats, Position } from '../types';
import { getMetricsForPosition } from './positionMetrics';

// Mock games consistent with DashboardScreen data
export const mockGames: Game[] = [
  {
    id: 'gm1',
    opponent: 'Riverside High',
    location: 'Home',
    result: 'W',
    date: '2025-03-15',
    score: '12-2',
    saves: 12,
    savePercentage: 85,
    goalsAllowed: 2,
    shotsFaced: 14,
    successfulClears: 8,
    totalClearsAttempted: 9,
    clearPercentage: 89,
    groundBalls: 5,
    turnovers: 1,
    keyTakeaways: "Fantastic work in the cage! An 85% save percentage was a huge factor in the win.",
    teamContext: 'High School',
    quarterStats: [
      { quarter: 1, savePct: 80, goals: 1, groundBalls: 1, turnovers: 0, clearsMade: 2 },
      { quarter: 2, savePct: 88, goals: 1, groundBalls: 1, turnovers: 0, clearsMade: 2 },
      { quarter: 3, savePct: 83, goals: 0, groundBalls: 2, turnovers: 1, clearsMade: 2 },
      { quarter: 4, savePct: 86, goals: 0, groundBalls: 1, turnovers: 0, clearsMade: 2 },
    ],
  },
  {
    id: 'gm2',
    opponent: 'Central Academy',
    location: 'Away',
    result: 'L',
    date: '2025-03-12',
    score: '8-9',
    saves: 8,
    savePercentage: 72,
    goalsAllowed: 3,
    shotsFaced: 11,
    successfulClears: 6,
    totalClearsAttempted: 8,
    clearPercentage: 75,
    groundBalls: 2,
    turnovers: 3,
    keyTakeaways: "Tough loss, but you held strong. A 72% save percentage is solid.",
    teamContext: 'High School',
    quarterStats: [
      { quarter: 1, savePct: 66, goals: 1, groundBalls: 0, turnovers: 1, clearsMade: 1 },
      { quarter: 2, savePct: 71, goals: 1, groundBalls: 1, turnovers: 1, clearsMade: 2 },
      { quarter: 3, savePct: 75, goals: 1, groundBalls: 1, turnovers: 1, clearsMade: 1 },
      { quarter: 4, savePct: 78, goals: 0, groundBalls: 0, turnovers: 0, clearsMade: 2 },
    ],
  },
  {
    id: 'gm3',
    opponent: 'North Valley',
    location: 'Home',
    result: 'W',
    date: '2025-03-08',
    score: '15-2',
    saves: 15,
    savePercentage: 88,
    goalsAllowed: 2,
    shotsFaced: 17,
    successfulClears: 10,
    totalClearsAttempted: 10,
    clearPercentage: 100,
    groundBalls: 6,
    turnovers: 0,
    keyTakeaways: "Dominant performance! An 88% save percentage and zero turnovers is elite.",
    teamContext: 'High School',
    quarterStats: [
      { quarter: 1, savePct: 83, goals: 1, groundBalls: 2, turnovers: 0, clearsMade: 3 },
      { quarter: 2, savePct: 90, goals: 1, groundBalls: 2, turnovers: 0, clearsMade: 2 },
      { quarter: 3, savePct: 92, goals: 0, groundBalls: 1, turnovers: 0, clearsMade: 3 },
      { quarter: 4, savePct: 86, goals: 0, groundBalls: 1, turnovers: 0, clearsMade: 2 },
    ],
  },
  {
    id: 'gm4',
    opponent: 'South Hills',
    location: 'Away',
    result: 'W',
    date: '2025-03-01',
    score: '10-4',
    saves: 10,
    savePercentage: 71,
    goalsAllowed: 4,
    shotsFaced: 14,
    successfulClears: 7,
    totalClearsAttempted: 9,
    clearPercentage: 78,
    groundBalls: 4,
    turnovers: 2,
    keyTakeaways: "Good win on the road. Let's work on consistency in clears.",
    teamContext: 'High School',
    quarterStats: [
      { quarter: 1, savePct: 60, goals: 1, groundBalls: 1, turnovers: 1, clearsMade: 1 },
      { quarter: 2, savePct: 75, goals: 2, groundBalls: 1, turnovers: 0, clearsMade: 2 },
      { quarter: 3, savePct: 80, goals: 1, groundBalls: 1, turnovers: 1, clearsMade: 2 },
      { quarter: 4, savePct: 71, goals: 0, groundBalls: 1, turnovers: 0, clearsMade: 2 },
    ],
  },
  {
    id: 'gm5',
    opponent: 'West Park',
    location: 'Home',
    result: 'W',
    date: '2025-02-26',
    score: '9-3',
    saves: 11,
    savePercentage: 78,
    goalsAllowed: 3,
    shotsFaced: 14,
    successfulClears: 8,
    totalClearsAttempted: 10,
    clearPercentage: 80,
    groundBalls: 5,
    turnovers: 1,
    keyTakeaways: "Strong showing with 80% clear success. Keep it up!",
    teamContext: 'High School',
    quarterStats: [
      { quarter: 1, savePct: 80, goals: 1, groundBalls: 1, turnovers: 0, clearsMade: 2 },
      { quarter: 2, savePct: 75, goals: 1, groundBalls: 2, turnovers: 1, clearsMade: 2 },
      { quarter: 3, savePct: 82, goals: 1, groundBalls: 1, turnovers: 0, clearsMade: 2 },
      { quarter: 4, savePct: 75, goals: 0, groundBalls: 1, turnovers: 0, clearsMade: 2 },
    ],
  },
  {
    id: 'gm6',
    opponent: 'East Ridge',
    location: 'Home',
    result: 'L',
    date: '2025-02-20',
    score: '7-8',
    saves: 9,
    savePercentage: 64,
    goalsAllowed: 5,
    shotsFaced: 14,
    successfulClears: 6,
    totalClearsAttempted: 9,
    clearPercentage: 67,
    groundBalls: 3,
    turnovers: 2,
    keyTakeaways: "Close game. Clear percentage needs improvement for next matchup.",
    teamContext: 'High School',
    quarterStats: [
      { quarter: 1, savePct: 50, goals: 2, groundBalls: 0, turnovers: 1, clearsMade: 1 },
      { quarter: 2, savePct: 66, goals: 2, groundBalls: 1, turnovers: 1, clearsMade: 1 },
      { quarter: 3, savePct: 75, goals: 1, groundBalls: 1, turnovers: 0, clearsMade: 2 },
      { quarter: 4, savePct: 71, goals: 0, groundBalls: 1, turnovers: 0, clearsMade: 2 },
    ],
  },
];

// Generate chart data for a specific metric
export function getChartDataForMetric(metricId: string, position: Position): ChartDataPoint[] {
  const games = mockGames.filter(g => g.teamContext === 'High School').reverse();
  
  switch (metricId) {
    case 'save_pct':
      return games.map(game => ({
        name: game.date.substring(5), // MM-DD
        value: game.savePercentage,
        opponent: game.opponent,
        date: game.date,
      }));
    case 'gaa':
      return games.map(game => ({
        name: game.date.substring(5),
        value: game.goalsAllowed,
        opponent: game.opponent,
        date: game.date,
      }));
    case 'clear_pct':
      return games.map(game => ({
        name: game.date.substring(5),
        value: game.clearPercentage,
        opponent: game.opponent,
        date: game.date,
      }));
    default:
      return [];
  }
}

// Calculate season averages
export function getSeasonAverages(position: Position) {
  const games = mockGames.filter(g => g.teamContext === 'High School');
  
  const totalSaves = games.reduce((sum, g) => sum + g.saves, 0);
  const totalShots = games.reduce((sum, g) => sum + g.shotsFaced, 0);
  const totalGoalsAllowed = games.reduce((sum, g) => sum + g.goalsAllowed, 0);
  const totalClearsMade = games.reduce((sum, g) => sum + g.successfulClears, 0);
  const totalClearsAttempted = games.reduce((sum, g) => sum + g.totalClearsAttempted, 0);
  const totalGBs = games.reduce((sum, g) => sum + g.groundBalls, 0);
  const totalTOs = games.reduce((sum, g) => sum + g.turnovers, 0);
  
  return {
    save_pct: totalShots > 0 ? (totalSaves / totalShots) * 100 : 0,
    gaa: totalGoalsAllowed / games.length,
    clear_pct: totalClearsAttempted > 0 ? (totalClearsMade / totalClearsAttempted) * 100 : 0,
    ground_balls: totalGBs / games.length,
    turnovers: totalTOs / games.length,
  };
}

// Calculate current stat values
export function getCurrentStats(position: Position) {
  const averages = getSeasonAverages(position);
  const latestGame = mockGames[mockGames.length - 1];
  
  return {
    save_pct: latestGame.savePercentage,
    gaa: latestGame.goalsAllowed,
    clear_pct: latestGame.clearPercentage,
    ground_balls: latestGame.groundBalls,
    turnovers: latestGame.turnovers,
  };
}

// Generate AI insights based on stat patterns
export function generateAIInsights(position: Position): AIInsight[] {
  const games = mockGames.filter(g => g.teamContext === 'High School');
  const recentGames = games.slice(-5);
  
  // Calculate trends
  const earlyAvgSave = games.slice(0, 3).reduce((sum, g) => sum + g.savePercentage, 0) / 3;
  const recentAvgSave = recentGames.reduce((sum, g) => sum + g.savePercentage, 0) / recentGames.length;
  const saveImprovement = recentAvgSave - earlyAvgSave;
  
  const avgClearPercent = games.reduce((sum, g) => sum + g.clearPercentage, 0) / games.length;
  
  const quarterPcts = games
    .flatMap(g => g.quarterStats?.map(q => ({ q: q.quarter, pct: q.savePct || 0 })) || [])
    .filter(Boolean);
  
  const bestQuarterData = [1, 2, 3, 4].map(q => {
    const qGames = quarterPcts.filter(item => item.q === q);
    return {
      quarter: q,
      avg: qGames.reduce((sum, item) => sum + item.pct, 0) / qGames.length,
    };
  }).sort((a, b) => b.avg - a.avg)[0];
  
  const insights: AIInsight[] = [];
  
  if (saveImprovement > 5) {
    insights.push({
      id: 'insight1',
      type: 'trend',
      title: 'Save % Trending Up',
      description: `Your save percentage improved by ${saveImprovement.toFixed(1)}% over your last 5 games. Consistency is building.`,
      metric: 'save_pct',
      cta: 'View Breakdown',
      createdAt: new Date().toISOString(),
    });
  }
  
  if (bestQuarterData && bestQuarterData.avg > 80) {
    insights.push({
      id: 'insight2',
      type: 'achievement',
      title: 'Best Quarter',
      description: `Q${bestQuarterData.quarter} = strongest with ${bestQuarterData.avg.toFixed(0)}% avg save rate.`,
      createdAt: new Date().toISOString(),
    });
  }
  
  if (avgClearPercent < 80) {
    insights.push({
      id: 'insight3',
      type: 'focus',
      title: 'Clear Efficiency Focus',
      description: `Your clears are at ${avgClearPercent.toFixed(0)}%. Improving timing and finding open midfielders faster will boost this.`,
      metric: 'clear_pct',
      drillId: 'WB_SLV_14',
      cta: 'View Drill',
      createdAt: new Date().toISOString(),
    });
  }
  
  return insights;
}

// Get quarter breakdown data
export function getQuarterBreakdown() {
  const games = mockGames.filter(g => g.teamContext === 'High School');
  
  return [1, 2, 3, 4].map(quarter => {
    const qStats = games
      .flatMap(g => g.quarterStats?.filter(q => q.quarter === quarter) || [])
      .filter(Boolean);
    
    return {
      quarter,
      avgSavePct: qStats.reduce((sum, q) => sum + (q.savePct || 0), 0) / qStats.length,
      totalGoals: qStats.reduce((sum, q) => sum + (q.goals || 0), 0),
    };
  });
}

// --- Helpers for Game Details screen (MVP + Trend Graphs) ---

export function getGameById(gameId: string): Game | undefined {
  return mockGames.find(g => g.id === gameId);
}

export function getLatestGame(): Game | undefined {
  // mockGames are in ascending date order; latest is last
  return mockGames[mockGames.length - 1];
}

export function getTrendForMetric(metricKey: 'save_pct' | 'gaa' | 'clear_pct', position: Position): ChartDataPoint[] {
  return getChartDataForMetric(metricKey, position);
}

export function getQuarterStats(gameId: string): QuarterStats[] {
  const game = getGameById(gameId);
  return game?.quarterStats || [];
}

