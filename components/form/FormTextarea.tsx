import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UseFormRegister, FieldValues, Path, RegisterOptions, FieldError } from 'react-hook-form';
import { Controller, Control } from 'react-hook-form';

interface FormTextareaProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
}

const FormTextarea = <T extends FieldValues>({
  id,
  label,
  control,
  rules,
  error,
  placeholder,
  rows = 4,
}: FormTextareaProps<T>) => {
  const height = rows * 20 + 12;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={id}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={rows}
            style={[styles.textarea, error && styles.inputError, { height }]}
          />
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
  textarea: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 14,
    color: '#1D2333',
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});

export default FormTextarea;

