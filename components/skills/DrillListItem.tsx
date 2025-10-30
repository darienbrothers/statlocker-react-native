import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Drill, DrillStatus } from '../../types';
import { Icon } from '../Icon';

interface DrillListItemProps {
  drill: Drill;
  onStartDrill: (drill: Drill) => void;
  status?: DrillStatus;
  repsLogged?: number;
  onToggleComplete?: (id: string) => void; // Optional for backward compat
}

const DrillListItem: React.FC<DrillListItemProps> = ({ drill, onToggleComplete, onStartDrill, status, repsLogged }) => {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';

  return (
    <View style={[styles.card, { opacity: isLocked ? 0.5 : 1 }]}>
      <View style={styles.checkbox}>
        {isCompleted && <Icon name="check" size={16} color="#4F46E5" />}
        {isLocked && <Icon name="lock" size={16} color="#9CA3AF" />}
        {isInProgress && <View style={styles.progressDot} />}
      </View>

      <TouchableOpacity 
        style={styles.content} 
        onPress={() => !isLocked && onStartDrill(drill)}
        disabled={isLocked}
        activeOpacity={0.7}
      >
        <View style={styles.titleRow}>
          <Text style={[styles.title, isCompleted && styles.titleCompleted]}>{drill.title}</Text>
          {isInProgress && repsLogged !== undefined && (
            <Text style={styles.repsText}>{repsLogged} reps</Text>
          )}
        </View>
        <Text style={styles.category}>{drill.category}</Text>
      </TouchableOpacity>

      {!isLocked && (
        <TouchableOpacity
          onPress={() => !isLocked && onStartDrill(drill)}
          style={styles.videoButton}
          activeOpacity={0.7}
        >
          <Icon name="play" size={20} color="#4F46E5" />
        </TouchableOpacity>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1D2333',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  videoButton: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repsText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
    marginLeft: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F46E5',
  },
});

export default DrillListItem;

