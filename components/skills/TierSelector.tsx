import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Tier = 'Foundation' | 'Advanced' | 'Elite';

interface TierSelectorProps {
  selectedTier: Tier;
  onSelectTier: (tier: Tier) => void;
}

const tiers: Tier[] = ['Foundation', 'Advanced', 'Elite'];

const TierSelector: React.FC<TierSelectorProps> = ({ selectedTier, onSelectTier }) => {
  return (
    <View style={styles.container}>
      {tiers.map((tier) => (
        <TouchableOpacity
          key={tier}
          onPress={() => onSelectTier(tier)}
          style={[styles.button, selectedTier === tier && styles.buttonSelected]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTier === tier ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            {tier}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 999,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  buttonSelected: {
    backgroundColor: '#4F46E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
  buttonTextUnselected: {
    color: '#6B7280',
  },
});

export default TierSelector;

