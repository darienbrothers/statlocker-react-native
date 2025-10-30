import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Icon } from '../Icon';
import type { TimeRange, StatsFilter } from '../../types';

interface FilterBarProps {
  timeRangeOptions: TimeRange[];
  selectedTimeRange: TimeRange;
  onTimeRangeSelect: (range: TimeRange) => void;
  selectedTeam?: 'High School' | 'Club';
  onTeamChange?: (team: 'High School' | 'Club') => void;
  onFilterPress?: () => void;
  onSharePress?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  timeRangeOptions, 
  selectedTimeRange, 
  onTimeRangeSelect,
  selectedTeam = 'High School',
  onTeamChange,
  onFilterPress,
  onSharePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Time Range Filter */}
      <View style={styles.timeRangeContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeRangeScroll}>
          {timeRangeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => onTimeRangeSelect(option)}
              style={[styles.timeRangeOption, selectedTimeRange === option && styles.timeRangeOptionSelected]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  selectedTimeRange === option ? styles.timeRangeTextSelected : styles.timeRangeTextUnselected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Team Toggle */}
        {onTeamChange && (
          <View style={styles.teamToggleContainer}>
            <TouchableOpacity
              onPress={() => onTeamChange('High School')}
              style={[styles.teamToggleButton, selectedTeam === 'High School' && styles.teamToggleButtonActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.teamToggleText, selectedTeam === 'High School' && styles.teamToggleTextActive]}>
                HS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onTeamChange('Club')}
              style={[styles.teamToggleButton, selectedTeam === 'Club' && styles.teamToggleButtonActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.teamToggleText, selectedTeam === 'Club' && styles.teamToggleTextActive]}>
                Club
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          activeOpacity={0.7}
          onPress={onFilterPress}
        >
          <Icon name="filter" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          activeOpacity={0.7}
          onPress={onSharePress}
        >
          <Icon name="share" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeRangeScroll: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  timeRangeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 4,
  },
  timeRangeOptionSelected: {
    backgroundColor: '#4F46E5',
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  timeRangeTextSelected: {
    color: '#FFFFFF',
  },
  timeRangeTextUnselected: {
    color: '#6B7280',
  },
  teamToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
    marginLeft: 8,
  },
  teamToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  teamToggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  teamToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  teamToggleTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default FilterBar;

