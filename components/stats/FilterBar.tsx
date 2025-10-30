import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../Icon';

interface FilterBarProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ options, selected, onSelect }) => {
  return (
    <View style={styles.bar}>
      <View style={styles.options}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.option, selected === option && styles.optionSelected]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selected === option ? styles.optionTextSelected : styles.optionTextUnselected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Icon name="filter" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Icon name="share" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  options: {
    flexDirection: 'row',
    gap: 4,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: '#4F46E5',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  optionTextUnselected: {
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default FilterBar;

