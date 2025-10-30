import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './Icon';

interface Award {
  id: string;
  title: string;
  date: string;
}

interface AwardsAndAchievementsCardProps {
  awards: Award[];
}

const AwardsAndAchievementsCard: React.FC<AwardsAndAchievementsCardProps> = ({ awards }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Icon name="trophy" size={24} color="#1D2333" />
          <Text style={styles.title}>Awards & Achievements</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {awards.length === 0 ? (
          <View style={styles.empty}>
            <Icon name="trophy" size={48} color="#F59E0B" />
            <Text style={styles.emptyTitle}>No awards yet</Text>
            <Text style={styles.emptyText}>
              Your hard work will pay off. Keep pushing!
            </Text>
          </View>
        ) : (
          <View>
            <Text>Awards list would go here.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
  },
  content: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    marginTop: 16,
    fontWeight: '700',
    fontSize: 14,
    color: '#1D2333',
  },
  emptyText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },
});

export default AwardsAndAchievementsCard;

