import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Game } from '../types';
import { Icon } from '../components/Icon';

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
  if (!game) return null;

  return (
    <Modal visible={!!game} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>{game.date}</Text>
            <Text style={styles.titleText}>vs {game.opponent}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Result Card */}
            <View style={styles.resultCard}>
              <View style={styles.resultContent}>
                <Text style={styles.resultLabel}>Result</Text>
                <View style={styles.resultRow}>
                  <View
                    style={[
                      styles.resultBadge,
                      game.result === 'W' ? styles.resultBadgeWin : styles.resultBadgeLoss,
                    ]}
                  >
                    <Text
                      style={[
                        styles.resultBadgeText,
                        game.result === 'W' ? styles.resultBadgeTextWin : styles.resultBadgeTextLoss,
                      ]}
                    >
                      {game.result}
                    </Text>
                  </View>
                  <Text style={styles.scoreText}>{game.score}</Text>
                </View>
              </View>
            </View>

            {/* Goalie Performance */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Goalie Performance</Text>
              <View style={styles.statsGrid}>
                <StatItem label="Saves" value={game.saves} />
                <StatItem label="Goals Allowed" value={game.goalsAllowed} />
                <StatItem label="Shots Faced" value={game.shotsFaced} />
                <StatItem label="Save %" value={`${game.savePercentage}%`} />
                <StatItem label="Successful Clears" value={game.successfulClears} />
                <StatItem label="Clear Attempts" value={game.totalClearsAttempted} />
                <StatItem label="Clear %" value={`${game.clearPercentage}%`} />
                <StatItem label="Ground Balls" value={game.groundBalls} />
                <StatItem label="Turnovers" value={game.turnovers} />
              </View>
            </View>

            {/* AI Coach Key Takeaways */}
            {game.keyTakeaways && (
              <View style={styles.section}>
                <View style={styles.aiHeader}>
                  <View style={styles.aiIconContainer}>
                    <Icon name="ai" size={20} color="#4F46E5" />
                  </View>
                  <Text style={styles.sectionTitle}>AI Coach Key Takeaways</Text>
                </View>
                <View style={styles.takeawaysCard}>
                  <Text style={styles.takeawaysText}>{game.keyTakeaways}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
    justifyContent: 'space-between',
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
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultContent: {
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D2333',
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  resultBadgeWin: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  resultBadgeLoss: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  resultBadgeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  resultBadgeTextWin: {
    color: '#10B981',
  },
  resultBadgeTextLoss: {
    color: '#EF4444',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D2333',
  },
  section: {
    marginBottom: 24,
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

