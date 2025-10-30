import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerInputProps {
  id: string;
  label: string;
  control: Control<any>;
  rules?: any;
  error?: FieldError;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  id,
  label,
  control,
  rules,
  error,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={id}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={[styles.input, error && styles.inputError]}
            >
              <Text style={[styles.inputText, !value && styles.placeholder]}>
                {value ? formatDate(value) : 'Select date'}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowPicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    onChange(selectedDate.toISOString().split('T')[0]);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
      />
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D2333',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputText: {
    fontSize: 14,
    color: '#1D2333',
  },
  placeholder: {
    color: '#9CA3AF',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});

export default DatePickerInput;
