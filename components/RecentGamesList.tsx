import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Game } from '../types';
import { Icon } from './Icon';

interface RecentGamesListProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const GameStat: React.FC<{ value: string | number, label: string, colorClass: string }> = ({ value, label, colorClass }) => (
  <View style={styles.stat}>
    <Text style={[styles.statValue, { color: colorClass }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const RecentGamesList: React.FC<RecentGamesListProps> = ({ games, onGameSelect }) => {
  return (
    <View style={styles.container}>
      {games.map((game) => (
        <TouchableOpacity
          key={game.id}
          onPress={() => onGameSelect(game)}
          style={styles.card}
          activeOpacity={0.8}
        >
          <View style={styles.content}>
            <View style={styles.left}>
              <View style={styles.opponentRow}>
                {game.location === 'Home' ? (
                  <Icon name="home" size={16} color="#6B7280" />
                ) : (
                  <Text style={styles.atSymbol}>@</Text>
                )}
                <Text style={styles.opponent}>{game.opponent}</Text>
              </View>
              <View style={styles.stats}>
                <GameStat value={game.saves} label="Saves" colorClass="#10B981" />
                <GameStat value={`${game.savePercentage}%`} label="Save %" colorClass="#3B82F6" />
                <GameStat value={game.goalsAllowed} label="GA" colorClass="#EF4444" />
              </View>
            </View>

            <View style={styles.right}>
              <View style={styles.resultContainer}>
                <View
                  style={[
                    styles.resultBadge,
                    game.result === 'W' ? styles.winBadge : styles.lossBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.resultText,
                      game.result === 'W' ? styles.winText : styles.lossText,
                    ]}
                  >
                    {game.result}
                  </Text>
                </View>
                <Text style={styles.score}>{game.score}</Text>
              </View>
              <Text style={styles.date}>{game.date}</Text>
              <Icon name="arrowRight" size={20} color="#6B7280" style={styles.chevron} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  opponentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  atSymbol: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  opponent: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1D2333',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: -2,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 8,
  },
  winBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  lossBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  resultText: {
    fontSize: 14,
    fontWeight: '700',
  },
  winText: {
    color: '#10B981',
  },
  lossText: {
    color: '#EF4444',
  },
  score: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1D2333',
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  chevron: {
    marginTop: 8,
  },
});

export default RecentGamesList;

