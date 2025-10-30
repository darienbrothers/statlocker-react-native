import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface ContextButtonsProps {
  onSelect: (text: string) => void;
}

const buttons = ['Review Last Game', 'Set Weekly Focus', 'Recommend Drills', 'Explain This Trend'];

const ContextButtons: React.FC<ContextButtonsProps> = ({ onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {buttons.map((text) => (
          <TouchableOpacity
            key={text}
            onPress={() => onSelect(text)}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D2333',
  },
});

export default ContextButtons;

