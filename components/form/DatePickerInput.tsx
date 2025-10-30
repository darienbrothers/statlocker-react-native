import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, Control, FieldError } from 'react-hook-form';
import { FieldValues, Path } from 'react-hook-form';
import { Icon } from '../Icon';

interface DatePickerInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  control: Control<T>;
  rules?: any;
  error?: FieldError;
}

const DatePickerInput = <T extends FieldValues>({
  id,
  label,
  control,
  rules,
  error,
}: DatePickerInputProps<T>) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';
    
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <Controller
      control={control}
      name={id}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const dateValue = value ? (typeof value === 'string' ? new Date(value) : value) : new Date();
        
        return (
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={[styles.input, error && styles.inputError]}
              activeOpacity={0.7}
            >
              <View style={styles.inputContent}>
                <View style={styles.inputLeft}>
                  <View style={styles.iconContainer}>
                    <Icon name="calendar" size={18} color="#6B7280" />
                  </View>
                  <Text style={[styles.inputText, !value && styles.placeholderText]}>
                    {value ? formatDate(dateValue) : 'Select date'}
                  </Text>
                </View>
                <Icon name="chevronDown" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={dateValue}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (event.type === 'set' && selectedDate) {
                    onChange(selectedDate.toISOString().split('T')[0]);
                  }
                }}
              />
            )}
            {error && (
              <Text style={styles.error}>
                {typeof error.message === 'string' ? error.message : `${label} is invalid`}
              </Text>
            )}
          </View>
        );
      }}
    />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  inputText: {
    fontSize: 14,
    color: '#1D2333',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  iosButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  iosButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iosButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
});

export default DatePickerInput;

