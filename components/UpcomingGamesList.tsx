import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { UpcomingGame } from '../types';
import { Icon } from './Icon';

interface UpcomingGamesListProps {
  games: UpcomingGame[];
}

const UpcomingGamesList: React.FC<UpcomingGamesListProps> = ({ games }) => {
  return (
    <View style={styles.container}>
      {games.map((game) => (
        <View key={game.id} style={styles.card}>
          <View style={styles.content}>
            <View>
              <Text style={styles.opponent}>{game.opponent}</Text>
              <View style={styles.details}>
                <Icon name="location" size={14} color="#6B7280" />
                <Text style={styles.detailText}>{game.location} • {game.time}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.date}>{game.date}</Text>
              <Text style={styles.daysUntil}>{game.daysUntil}</Text>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opponent: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1D2333',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  right: {
    alignItems: 'flex-end',
  },
  date: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1D2333',
  },
  daysUntil: {
    fontWeight: '600',
    fontSize: 14,
    color: '#4F46E5',
    marginTop: 2,
  },
});

export default UpcomingGamesList;

