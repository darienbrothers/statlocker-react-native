import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FormSegmentedControlProps {
  label: string;
  options: [string, string];
  value: string;
  onChange: (value: string) => void;
}

const FormSegmentedControl: React.FC<FormSegmentedControlProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.control}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[styles.button, value === option && styles.buttonSelected]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                value === option ? styles.buttonTextSelected : styles.buttonTextUnselected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D2333',
    marginBottom: 6,
  },
  control: {
    backgroundColor: '#E5E7EB',
    padding: 4,
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  buttonSelected: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextSelected: {
    color: '#4F46E5',
  },
  buttonTextUnselected: {
    color: '#6B7280',
  },
});

export default FormSegmentedControl;

