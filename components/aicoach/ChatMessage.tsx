import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ChatMessage } from '../../types';
import { Icon } from '../Icon';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageBubble: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const renderAssistantContent = () => {
    if (!message.type) {
      return <Text style={styles.text}>{message.text}</Text>;
    }
    // simple card variants for MVP
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {message.type === 'stat' ? 'Stat Breakdown' : message.type === 'drill' ? 'Drill Recommendation' : message.type === 'goal' ? 'Goal Progress' : 'Coach Note'}
        </Text>
        <Text style={styles.cardBody}>{message.text}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, isUser && styles.containerRight]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Icon name="ai" size={20} color="#4F46E5" />
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {isUser ? <Text style={[styles.text, styles.userText]}>{message.text}</Text> : renderAssistantContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
  },
  containerRight: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 14,
    color: '#1D2333',
  },
  userText: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 13,
    color: '#374151',
  },
});

export default ChatMessageBubble;

