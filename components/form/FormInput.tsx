import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UseFormRegister, FieldValues, Path, RegisterOptions, FieldError } from 'react-hook-form';
import { Controller, Control } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions;
  error?: FieldError;
  type?: 'text' | 'number' | 'email' | 'date';
  placeholder?: string;
}

const FormInput = <T extends FieldValues>({
  id,
  label,
  control,
  rules,
  error,
  type = 'text',
  placeholder,
}: FormInputProps<T>) => {
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
            keyboardType={type === 'number' ? 'numeric' : type === 'email' ? 'email-address' : 'default'}
            style={[styles.input, error && styles.inputError]}
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
  input: {
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 14,
    color: '#1D2333',
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

export default FormInput;

