import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import type { ChatMessage } from '../types';
import TopNavBar from '../components/TopNavBar';
import ChatMessageBubble from '../components/aicoach/ChatMessage';
import ContextButtons from '../components/aicoach/ContextButtons';
import ChatInput from '../components/aicoach/ChatInput';
import { GoogleGenAI } from '@google/genai';
import { generateMockChatResponse, shouldUseMockMode, simulateApiDelay } from '../utils/mockAiService';
import Constants from 'expo-constants';

// Initialize AI client only if API key is available
const apiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY;
const ai = apiKey && !shouldUseMockMode() ? new GoogleGenAI({ apiKey }) : null;

const AiCoachScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "I've got your latest game data and trends. What are we locking in on this week?",
      sender: 'ai',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      let aiText: string;

      if (shouldUseMockMode() || !ai) {
        // Use mock response
        await simulateApiDelay(1000 + Math.random() * 500);
        aiText = generateMockChatResponse(text);
      } else {
        // Use real API
        const prompt = `
          You are StatLocker's AI Coach. You are talking to Alex Rodriguez, a high school (Class of 2026) female lacrosse goalie.
          Her current overall stats are: Save %: 78.5%, Total Saves: 142, Games Played: 12.
          Her recent performance has been strong, with a 5-game hot streak of over 75% save percentage.
          Her current season goal is to reach an 80% save percentage.

          Your tone is a mix of mentor and analyst: encouraging but data-driven. Keep your responses concise, well-formatted, and focused on actionable advice.

          The user said: "${text}"

          Your response:
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        aiText = response.text;
      }

      const aiResponse: ChatMessage = {
        id: Date.now().toString() + '-ai',
        text: aiText,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const mockResponse = generateMockChatResponse(text);
      const errorResponse: ChatMessage = {
        id: Date.now().toString() + '-error',
        text:
          shouldUseMockMode() || !ai
            ? mockResponse
            : "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar userName="Alex" />
      <View style={styles.header}>
        <Text style={styles.title}>AI Coach</Text>
        <Text style={styles.subtitle}>Your personal performance advisor.</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessageBubble message={item} />}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {isLoading && (
        <View style={styles.loading}>
          <View style={styles.loadingBubble}>
            <ActivityIndicator size="small" color="#6B7280" />
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <ContextButtons onSelect={handleSendMessage} />
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D2333',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  messages: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  loading: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  loadingBubble: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  footer: {
    backgroundColor: '#F7F7F9',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    gap: 12,
  },
});

export default AiCoachScreen;
