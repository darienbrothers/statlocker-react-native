import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  opponent: string;
  date: string;
  location: 'Home' | 'Away' | string;
  result: 'W' | 'L' | string;
  teamScore?: number;
  opponentScore?: number;
  score?: string; // fallback like "10-7"
};

export const GameHeader: React.FC<Props> = ({ opponent, date, location, result, teamScore, opponentScore, score }) => {
  const isWin = String(result).toUpperCase() === 'W';
  const bannerStyle = isWin ? styles.bannerWin : styles.bannerLoss;
  const scoreText = score ?? (teamScore != null && opponentScore != null ? `${teamScore}-${opponentScore}` : undefined);

  return (
    <View style={[styles.banner, bannerStyle]}>
      <View>
        <Text style={styles.metaText}>{date} • {location === 'Home' ? '@Home' : 'Away'}</Text>
        <Text style={styles.titleText}>vs {opponent}</Text>
      </View>
      <View style={styles.resultBlock}>
        <View style={[styles.resultBadge, isWin ? styles.badgeWin : styles.badgeLoss]}>
          <Text style={[styles.resultBadgeText, isWin ? styles.badgeTextWin : styles.badgeTextLoss]}>{isWin ? 'WIN' : 'LOSS'}</Text>
        </View>
        {scoreText ? <Text style={styles.scoreText}>{scoreText}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerWin: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  bannerLoss: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  resultBlock: {
    alignItems: 'flex-end',
  },
  resultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 6,
  },
  badgeWin: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
  },
  badgeLoss: {
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
  },
  resultBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextWin: {
    color: '#10B981',
  },
  badgeTextLoss: {
    color: '#EF4444',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2333',
  },
});

export default GameHeader;


