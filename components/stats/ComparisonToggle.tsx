import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ComparisonToggleProps {
  mode: 'My Stats' | 'Team Avg';
  onModeChange?: (mode: 'My Stats' | 'Team Avg') => void;
  disabled?: boolean;
}

const ComparisonToggle: React.FC<ComparisonToggleProps> = ({ 
  mode, 
  onModeChange, 
  disabled = false,
}) => {
  const handlePress = (newMode: 'My Stats' | 'Team Avg') => {
    if (!disabled && onModeChange) {
      onModeChange(newMode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>View</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, mode === 'My Stats' && styles.toggleButtonActive]}
          onPress={() => handlePress('My Stats')}
          disabled={disabled}
        >
          <Text style={[styles.toggleText, mode === 'My Stats' && styles.toggleTextActive]}>
            My Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton, 
            mode === 'Team Avg' && styles.toggleButtonActive,
            disabled && styles.toggleButtonDisabled,
          ]}
          onPress={() => handlePress('Team Avg')}
          disabled={disabled}
        >
          <Text style={[
            styles.toggleText, 
            mode === 'Team Avg' && styles.toggleTextActive,
            disabled && styles.toggleTextDisabled,
          ]}>
            Team Avg
          </Text>
        </TouchableOpacity>
      </View>
      {disabled && (
        <Text style={styles.comingSoonBadge}>Coming Soon</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleButtonDisabled: {
    opacity: 0.5,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  toggleTextDisabled: {
    color: '#9CA3AF',
  },
  comingSoonBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
  },
});

export default ComparisonToggle;

