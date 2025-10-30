import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Game, Position } from '../types';
import { Icon } from '../components/Icon';
import GameHeader from '../components/game/GameHeader';
import StatGrid from '../components/game/StatGrid';
import TrendGraph from '../components/game/TrendGraph';
import QuarterBreakdown from '../components/game/QuarterBreakdown';
import { getLatestGame, getQuarterStats, generateAIInsights } from '../utils/mockStatsData';
import ExportModal from '../components/stats/ExportModal';

interface GameDetailsScreenProps {
  game: Game | null;
  onClose: () => void;
}

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const GameDetailsScreen: React.FC<GameDetailsScreenProps> = ({ game, onClose }) => {
  const [shareVisible, setShareVisible] = useState(false);
  const selectedGame = game ?? getLatestGame();
  if (!selectedGame) return null;

  const metrics = [
    { key: 'saves', label: 'Saves', value: selectedGame.saves },
    { key: 'ga', label: 'Goals Allowed', value: selectedGame.goalsAllowed },
    { key: 'shots', label: 'Shots Faced', value: selectedGame.shotsFaced },
    { key: 'save_pct', label: 'Save %', value: `${selectedGame.savePercentage}%` },
    { key: 'clears', label: 'Successful Clears', value: selectedGame.successfulClears },
    { key: 'clear_att', label: 'Clear Attempts', value: selectedGame.totalClearsAttempted },
    { key: 'clear_pct', label: 'Clear %', value: `${selectedGame.clearPercentage}%` },
    { key: 'gbs', label: 'Ground Balls', value: selectedGame.groundBalls },
    { key: 'tos', label: 'Turnovers', value: selectedGame.turnovers },
  ];

  const quarterStats = getQuarterStats(selectedGame.id);
  const insights = generateAIInsights('goalie' as Position);

  return (
    <Modal visible={!!game} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <GameHeader
              opponent={selectedGame.opponent}
              date={selectedGame.date}
              location={selectedGame.location}
              result={selectedGame.result}
              score={selectedGame.score}
            />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Performance</Text>
              <StatGrid metrics={metrics} />
            </View>

            <View style={styles.section}>
              <TrendGraph title="Save % Over Time" metricKey="save_pct" position={'goalie' as Position} />
              {quarterStats && quarterStats.length > 0 ? (
                <QuarterBreakdown stats={quarterStats} />
              ) : null}
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShareVisible(true)}>
                <Icon name="share" size={18} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>

            {/* AI Coach Key Takeaways */}
            {selectedGame.keyTakeaways && (
              <View style={styles.section}>
                <View style={styles.aiHeader}>
                  <View style={styles.aiIconContainer}>
                    <Icon name="ai" size={20} color="#4F46E5" />
                  </View>
                  <Text style={styles.sectionTitle}>AI Coach Key Takeaways</Text>
                </View>
                <View style={styles.takeawaysCard}>
                  <Text style={styles.takeawaysText}>{selectedGame.keyTakeaways}</Text>
                </View>
              </View>
            )}

            {insights && insights.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>AI Insights</Text>
                {insights.map(item => (
                  <View key={item.id} style={[styles.takeawaysCard, { marginBottom: 12 }]}> 
                    <Text style={{ fontWeight: '700', color: '#1D2333', marginBottom: 4 }}>{item.title}</Text>
                    <Text style={styles.takeawaysText}>{item.description}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
      <ExportModal visible={shareVisible} onClose={() => setShareVisible(false)} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  
  section: {
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    backgroundColor: '#F7F7F9',
    padding: 12,
    borderRadius: 8,
    width: '31%',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiIconContainer: {
    padding: 8,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 20,
    marginRight: 12,
  },
  takeawaysCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  takeawaysText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export default GameDetailsScreen;

