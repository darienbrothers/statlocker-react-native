import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SegmentedControlProps {
  options: [string, string];
  onSelect?: (option: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleClick = (option: string) => {
    setSelected(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleClick(option)}
          style={[
            styles.button,
            selected === option && styles.buttonSelected,
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === option ? styles.textSelected : styles.textUnselected,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
    padding: 4,
    borderRadius: 999,
    flexDirection: 'row',
    width: '100%',
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
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  textSelected: {
    color: '#FFFFFF',
  },
  textUnselected: {
    color: '#6B7280',
  },
});

export default SegmentedControl;

