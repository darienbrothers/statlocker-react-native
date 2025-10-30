import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Text, ScrollView } from 'react-native';
import { Icon } from '../Icon';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  quickActions?: string[];
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, quickActions }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        {!!quickActions && quickActions.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.qScroll}>
            <View style={styles.qRow}>
              {quickActions.map((qa) => (
                <TouchableOpacity
                  key={qa}
                  onPress={() => onSend(qa)}
                  style={styles.qChip}
                  activeOpacity={0.8}
                >
                  <Text style={styles.qText}>{qa}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Ask your coach anything..."
          placeholderTextColor="#9CA3AF"
          editable={!isLoading}
          style={styles.input}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading || !text.trim()}
          style={[styles.button, (isLoading || !text.trim()) && styles.buttonDisabled]}
          activeOpacity={0.7}
        >
          <Icon name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
  },
  qScroll: {
    paddingBottom: 4,
    paddingHorizontal: 0,
  },
  qRow: {
    flexDirection: 'row',
    gap: 8,
  },
  qChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
  },
  qText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D2333',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    fontSize: 14,
    color: '#1D2333',
  },
  button: {
    width: 48,
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(79, 70, 229, 0.4)',
  },
});

export default ChatInput;

