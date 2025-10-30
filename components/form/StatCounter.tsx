import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FieldError } from 'react-hook-form';

interface StatCounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: FieldError;
}

const StatCounter: React.FC<StatCounterProps> = ({ label, value, onChange, error }) => {
  const handleIncrement = () => onChange((value || 0) + 1);
  const handleDecrement = () => onChange(Math.max(0, (value || 0) - 1));

  return (
    <View style={styles.container}>
      <View style={[styles.counter, error && styles.counterError]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.value}>{value || 0}</Text>
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {error && (
        <Text style={styles.error}>
          {typeof error.message === 'string' ? error.message : `${label} is invalid`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
  },
  counterError: {
    borderColor: '#EF4444',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D2333',
    paddingLeft: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B7280',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
    width: 48,
    textAlign: 'center',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    paddingLeft: 4,
  },
});

export default StatCounter;

