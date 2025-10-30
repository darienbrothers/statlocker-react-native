import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Drill } from '../../types';
import { Icon } from '../Icon';

interface DrillListItemProps {
  drill: Drill;
  onToggleComplete: (id: string) => void;
  onStartDrill: (drill: Drill) => void;
}

const DrillListItem: React.FC<DrillListItemProps> = ({ drill, onToggleComplete, onStartDrill }) => {
  return (
    <View style={[styles.card, { opacity: drill.isCompleted ? 0.6 : 1 }]}>
      <TouchableOpacity
        onPress={() => onToggleComplete(drill.id)}
        style={styles.checkbox}
        activeOpacity={0.7}
      >
        {drill.isCompleted && <Icon name="check" size={16} color="#4F46E5" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, drill.isCompleted && styles.titleCompleted]}>{drill.title}</Text>
        <Text style={styles.category}>{drill.category}</Text>
      </View>

      {drill.videoUrl && (
        <TouchableOpacity
          onPress={() => onStartDrill(drill)}
          style={styles.videoButton}
          activeOpacity={0.7}
        >
          <Icon name="video" size={20} color="#4F46E5" />
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
});

export default DrillListItem;

