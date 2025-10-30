import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { PerformanceMetric, Goal, Game, UpcomingGame, Streak } from '../types';
import MetricCard from '../components/MetricCard';
import AiInsightCard from '../components/AiInsightCard';
import RecentGamesList from '../components/RecentGamesList';
import HeroCard from '../components/HeroCard';
import HotStreakCard from '../components/HotStreakCard';
import GoalCard from '../components/GoalCard';
import UpcomingGamesList from '../components/UpcomingGamesList';
import TopNavBar from '../components/TopNavBar';
import AwardsAndAchievementsCard from '../components/AwardsAndAchievementsCard';
import DrawerMenu from '../components/DrawerMenu';
import Fab from '../components/Fab';
import QuickActionsSheet from '../components/QuickActionsSheet';
import GameLogModal from '../components/GameLogModal';
import type { GameLogFormData } from '../types';

// --- High School Data ---
const hsStreak: Streak = {
  icon: 'fire',
  title: 'Hot Streak!',
  description: '5 games with 75%+ save percentage',
  count: 5
};
const hsPerformanceMetrics: PerformanceMetric[] = [
  { id: 'hs1', icon: 'target', iconBgColor: 'purple', title: 'SAVE %', value: '78.5%', delta: '+6% from last game', subtitle: '' },
  { id: 'hs2', icon: 'shield', iconBgColor: 'green', title: 'SAVES/GAME', value: '11.8', subtitle: 'Season average' },
  { id: 'hs3', icon: 'goalsAgainst', iconBgColor: 'purple', title: 'GOALS AGAINST', value: '2.1', subtitle: 'Per game avg' },
  { id: 'hs4', icon: 'clear', iconBgColor: 'blue', title: 'CLEAR %', value: '85%', delta: '+8% this month', subtitle: '' },
];
const hsAverages: PerformanceMetric[] = [
  { id: 'hs5', icon: 'shotsFaced', iconBgColor: 'orange', title: 'SHOTS FACED', value: '15.2', subtitle: 'Per game' },
  { id: 'hs6', icon: 'minutes', iconBgColor: 'cyan', title: 'MINUTES', value: '52.3', subtitle: 'Per game' },
  { id: 'hs7', icon: 'turnovers', iconBgColor: 'red', title: 'TURNOVERS', value: '0.8', subtitle: 'Per game' },
  { id: 'hs8', icon: 'clear', iconBgColor: 'cyan', title: 'CLEARS', value: '7.2', subtitle: 'Per game' },
];
const hsGoals: Goal[] = [
  { id: 'hsg1', icon: 'target', iconBgColor: 'purple', title: '80% Save Percentage', target: '', currentValue: 'Current: 78.5%', progress: 98, status: 'On Track' },
  { id: 'hsg2', icon: 'shield', iconBgColor: 'green', title: '150 Total Saves', target: '', currentValue: 'Current: 142 saves', progress: 95, status: 'Ahead' },
  { id: 'hsg3', icon: 'clear', iconBgColor: 'blue', title: '85% Clear Success', target: '', currentValue: 'Current: 85%', progress: 100, status: 'Achieved!' },
];
const hsRecentGames: Game[] = [
  { id: 'gm1', opponent: 'Riverside High', location: 'Home', result: 'W', date: 'Mar 15', score: '12-2', saves: 12, savePercentage: 85, goalsAllowed: 2, shotsFaced: 14, successfulClears: 8, totalClearsAttempted: 9, clearPercentage: 89, groundBalls: 5, turnovers: 1, keyTakeaways: "Fantastic work in the cage! An 85% save percentage was a huge factor in the win. You were tracking the ball well and your outlets on clears were sharp. Let's keep that intensity for the next game!" },
  { id: 'gm2', opponent: 'Central Academy', location: 'Away', result: 'L', date: 'Mar 12', score: '8-9', saves: 8, savePercentage: 72, goalsAllowed: 3, shotsFaced: 11, successfulClears: 6, totalClearsAttempted: 8, clearPercentage: 75, groundBalls: 2, turnovers: 3, keyTakeaways: "Tough loss, but you held strong. A 72% save percentage is solid. Let's focus on quicker clears next practice; we can improve that 75% clear rate by finding our open midfielders faster." },
  { id: 'gm3', opponent: 'North Valley', location: 'Home', result: 'W', date: 'Mar 8', score: '15-2', saves: 15, savePercentage: 88, goalsAllowed: 2, shotsFaced: 17, successfulClears: 10, totalClearsAttempted: 10, clearPercentage: 100, groundBalls: 6, turnovers: 0, keyTakeaways: "Dominant performance! An 88% save percentage and zero turnovers is an elite stat line. Your 100% clear rate set the tone for the offense all game. Incredible focus." },
];
const hsUpcomingGames: UpcomingGame[] = [
  { id: 'ug1', opponent: 'vs. East Side Prep', location: 'Home', time: '4:00 PM', date: 'Mar 22', daysUntil: '3 days' },
  { id: 'ug2', opponent: '@ Mountain View', location: 'Away', time: '6:00 PM', date: 'Mar 25', daysUntil: '6 days' },
];

// --- Club Data ---
const clubStreak: Streak = {
  icon: 'shield',
  title: 'Defensive Anchor',
  description: '3 tournament wins with 2 or less goals allowed',
  count: 3
};
const clubPerformanceMetrics: PerformanceMetric[] = [
  { id: 'c1', icon: 'target', iconBgColor: 'purple', title: 'SAVE %', value: '82.1%', delta: '+3% from last tourney', subtitle: '' },
  { id: 'c2', icon: 'shield', iconBgColor: 'green', title: 'SAVES/GAME', value: '9.4', subtitle: 'Club average' },
  { id: 'c3', icon: 'goalsAgainst', iconBgColor: 'purple', title: 'GOALS AGAINST', value: '1.8', subtitle: 'Per game avg' },
  { id: 'c4', icon: 'clear', iconBgColor: 'blue', title: 'CLEAR %', value: '91%', delta: '+5% this season', subtitle: '' },
];
const clubAverages: PerformanceMetric[] = [
  { id: 'c5', icon: 'shotsFaced', iconBgColor: 'orange', title: 'SHOTS FACED', value: '11.4', subtitle: 'Per game' },
  { id: 'c6', icon: 'minutes', iconBgColor: 'cyan', title: 'MINUTES', value: '45.0', subtitle: 'Per game' },
  { id: 'c7', icon: 'turnovers', iconBgColor: 'red', title: 'TURNOVERS', value: '0.5', subtitle: 'Per game' },
  { id: 'c8', icon: 'clear', iconBgColor: 'cyan', title: 'CLEARS', value: '6.8', subtitle: 'Per game' },
];
const clubGoals: Goal[] = [
  { id: 'cg1', icon: 'target', iconBgColor: 'purple', title: 'Maintain 80%+ Save %', target: '', currentValue: 'Current: 82.1%', progress: 100, status: 'Achieved!' },
  { id: 'cg2', icon: 'clear', iconBgColor: 'blue', title: '90% Clearing Success Rate', target: '', currentValue: 'Current: 91%', progress: 100, status: 'Ahead' },
  { id: 'cg3', icon: 'goalsAgainst', iconBgColor: 'purple', title: 'Sub-2.0 Goals Against Avg', target: '', currentValue: 'Current: 1.8', progress: 100, status: 'On Track' },
];
const clubRecentGames: Game[] = [
  { id: 'cg1', opponent: 'Laxachusetts', location: 'Away', result: 'W', date: 'Mar 18', score: '10-1', saves: 9, savePercentage: 90, goalsAllowed: 1, shotsFaced: 10, successfulClears: 7, totalClearsAttempted: 8, clearPercentage: 88, groundBalls: 4, turnovers: 1, keyTakeaways: "Great start to the tournament circuit. A 90% save percentage is phenomenal. Communication with the defense was on point." },
  { id: 'cg2', opponent: 'NH Tomahawks', location: 'Home', result: 'W', date: 'Mar 17', score: '8-2', saves: 11, savePercentage: 84, goalsAllowed: 2, shotsFaced: 13, successfulClears: 9, totalClearsAttempted: 9, clearPercentage: 100, groundBalls: 3, turnovers: 0, keyTakeaways: "Another strong win. You commanded the crease and your 100% clear rate was a difference-maker in transition." },
  { id: 'cg3', opponent: '3d New England', location: 'Away', result: 'L', date: 'Mar 11', score: '5-6', saves: 7, savePercentage: 77, goalsAllowed: 2, shotsFaced: 9, successfulClears: 5, totalClearsAttempted: 6, clearPercentage: 83, groundBalls: 1, turnovers: 2, keyTakeaways: "A close one. 77% is still a solid performance. They had some tough shots from the outside. Let's work on stepping to those high and away rips." },
];
const clubUpcomingGames: UpcomingGame[] = [
  { id: 'cug1', opponent: 'vs. Top Gun Fighting Clams', location: 'Away', time: '9:00 AM', date: 'Apr 1', daysUntil: '12 days' },
  { id: 'cug2', opponent: 'vs. Penguins', location: 'Away', time: '11:00 AM', date: 'Apr 1', daysUntil: '12 days' },
];

const highSchoolData = {
  streak: hsStreak,
  performanceMetrics: hsPerformanceMetrics,
  averages: hsAverages,
  goals: hsGoals,
  recentGames: hsRecentGames,
  upcomingGames: hsUpcomingGames,
  heroStats: { savePercentage: 78.5, totalSaves: 142, gamesPlayed: 12, wins: 8, losses: 4 }
};

const clubData = {
  streak: clubStreak,
  performanceMetrics: clubPerformanceMetrics,
  averages: clubAverages,
  goals: clubGoals,
  recentGames: clubRecentGames,
  upcomingGames: clubUpcomingGames,
  heroStats: { savePercentage: 82.1, totalSaves: 98, gamesPlayed: 10, wins: 9, losses: 1 }
};

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, actionText, onActionClick }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionText && onActionClick && (
      <TouchableOpacity onPress={onActionClick}>
        <Text style={styles.sectionAction}>{actionText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

interface DashboardScreenProps {
  onGameSelect: (game: Game) => void;
  onMenuClick: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onGameSelect, onMenuClick }) => {
  const navigation = useNavigation();
  const [selectedTeam, setSelectedTeam] = useState<'High School' | 'Club'>('High School');
  const [avatarUrl, setAvatarUrl] = useState<string | null>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isQuickActionsOpen, setQuickActionsOpen] = useState(false);
  const [isGameLogOpen, setGameLogOpen] = useState(false);
  
  const handleAvatarChange = (newAvatar: string) => {
    setAvatarUrl(newAvatar);
  };

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenQuickActions = () => {
    setQuickActionsOpen(true);
  };

  const handleCloseQuickActions = () => {
    setQuickActionsOpen(false);
  };

  const handleLogGame = () => {
    setQuickActionsOpen(false);
    setGameLogOpen(true);
  };

  const handleGameSave = (data: Partial<GameLogFormData>) => {
    console.log('Game data saved:', data);
    // TODO: Save to storage/backend
    setGameLogOpen(false);
  };

  const userName = "Erica Brothers";
  const firstName = userName.split(' ')[0];
  
  const activeData = selectedTeam === 'High School' ? highSchoolData : clubData;

  return (
    <View style={styles.container}>
      <TopNavBar firstName={firstName} notificationCount={2} onMenuClick={handleMenuClick} />
      <DrawerMenu isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <HeroCard
            userName={userName}
            avatarUrl={avatarUrl}
            onAvatarChange={handleAvatarChange}
            sport="Girls Lacrosse"
            position="Goalie"
            gradYear="2026"
            selectedTeam={selectedTeam}
            onTeamSelect={setSelectedTeam}
            hsName="Duxbury High School"
            hsCityState="Duxbury | MA"
            clubName="Mass Elite"
            clubCityState="Weymouth | MA"
            isVerified={true}
            {...activeData.heroStats}
          />
        </View>

        <View style={styles.content}>
          <HotStreakCard streak={activeData.streak} />
        </View>

        <View style={styles.content}>
          <SectionHeader title="Performance Metrics" />
          <View style={styles.metricsGrid}>
            {activeData.performanceMetrics.map(metric => (
              <MetricCard key={metric.id} {...metric} />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Per Game Averages" />
          <View style={styles.metricsGrid}>
            {activeData.averages.map(metric => (
              <MetricCard key={metric.id} {...metric} />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Season Goals" actionText="View All" onActionClick={() => {}} />
          {activeData.goals.map(goal => (
            <GoalCard key={goal.id} {...goal} />
          ))}
        </View>

        <View style={styles.content}>
          <AiInsightCard insight="Your save % improved by 6% since last game. Your positioning on low shots has been exceptional this week. Focus on high shots for next game." />
        </View>

        <View style={styles.content}>
          <AwardsAndAchievementsCard awards={[]} />
        </View>

        <View style={styles.content}>
          <SectionHeader title="Recent Games" actionText="View All" onActionClick={() => {}} />
          <RecentGamesList games={activeData.recentGames} onGameSelect={onGameSelect} />
        </View>

        <View style={styles.content}>
          <SectionHeader title="Upcoming Games" />
          <UpcomingGamesList games={activeData.upcomingGames} />
        </View>
      </ScrollView>
      <Fab onClick={handleOpenQuickActions} />
      <QuickActionsSheet
        isOpen={isQuickActionsOpen}
        onClose={handleCloseQuickActions}
        onLogGameClick={handleLogGame}
      />
      <GameLogModal
        isOpen={isGameLogOpen}
        onClose={() => setGameLogOpen(false)}
        onSave={handleGameSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default DashboardScreen;

