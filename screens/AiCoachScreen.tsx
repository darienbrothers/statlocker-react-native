import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import type { ChatMessage, AiTone, AIInsight, AiSession, AiMessage } from '../types';
import TopNavBar from '../components/TopNavBar';
import ChatMessageBubble from '../components/aicoach/ChatMessage';
import ChatInput from '../components/aicoach/ChatInput';
import ToneSelector from '../components/aicoach/ToneSelector';
import InsightCarousel from '../components/aicoach/InsightCarousel';
import SessionHistoryModal from '../components/aicoach/SessionHistoryModal';
import SectionHeader from '../components/SectionHeader';
import { respond, getInsights, simulateApiDelay } from '../utils/mockAiService';
import { getTone, setTone, getCurrentSession, setCurrentSession, getSessionsIndex, upsertSessionIndex } from '../utils/aiCoachStorage';

const AiCoachScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setToneState] = useState<AiTone>('analyst');
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [sessions, setSessions] = useState<Pick<AiSession, 'id' | 'topic' | 'updatedAt'>[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isLoading]);

  useEffect(() => {
    // Load tone and session on mount
    (async () => {
      const savedTone = await getTone();
      if (savedTone) setToneState(savedTone);

      const saved = await getCurrentSession();
      if (saved && saved.messages?.length) {
        setMessages(saved.messages.map(m => ({ id: m.id, text: m.text, sender: m.role === 'user' ? 'user' : 'ai', type: m.type, createdAt: m.createdAt, meta: m.meta })));
      } else {
        // seed greeting
        setMessages([
          {
            id: 'seed-1',
            text: "I reviewed your recent games. What should we focus on today?",
            sender: 'ai',
            createdAt: Date.now(),
          },
        ]);
        const newSession: AiSession = {
          id: `sess-${Date.now()}`,
          messages: [
            { id: 'seed-1', role: 'assistant', text: "I reviewed your recent games. What should we focus on today?", createdAt: Date.now() },
          ],
          updatedAt: Date.now(),
        };
        await setCurrentSession(newSession);
        await upsertSessionIndex({ id: newSession.id, topic: 'Conversation', updatedAt: newSession.updatedAt });
      }

      const idx = await getSessionsIndex();
      setSessions(idx);

      const mockInsights = await getInsights();
      // map to AIInsight typing already compatible
      setInsights(mockInsights as unknown as AIInsight[]);
    })();
  }, []);

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
      await simulateApiDelay(200);
      const aiText = await respond(text, { tone, context: {} });

      const aiResponse: ChatMessage = {
        id: Date.now().toString() + '-ai',
        text: aiText,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiResponse]);

      // persist to current session
      const current = (await getCurrentSession()) || { id: `sess-${Date.now()}`, messages: [], updatedAt: Date.now() } as AiSession;
      const toAi: AiMessage = { id: aiResponse.id, role: 'assistant', text: aiResponse.text, createdAt: Date.now() };
      const toUser: AiMessage = { id: newUserMessage.id, role: 'user', text: newUserMessage.text, createdAt: Date.now() };
      const updated: AiSession = { ...current, messages: [...current.messages, toUser, toAi], updatedAt: Date.now() };
      await setCurrentSession(updated);
      await upsertSessionIndex({ id: updated.id, topic: updated.topic || 'Conversation', updatedAt: updated.updatedAt });
      const idx = await getSessionsIndex();
      setSessions(idx);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const mockResponse = 'Sorry, I had trouble responding. Try again.';
      const errorResponse: ChatMessage = {
        id: Date.now().toString() + '-error',
        text: mockResponse,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeTone = async (next: AiTone) => {
    setToneState(next);
    await setTone(next);
  };

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Erica" />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={[styles.avatar, { borderColor: tone === 'hype' ? '#8B5CF6' : tone === 'analyst' ? '#3B82F6' : tone === 'mentor' ? '#F59E0B' : '#1E3A8A' }]} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>AI Coach</Text>
            <Text style={styles.subtitle}>Your personal performance advisor.</Text>
          </View>
          <TouchableOpacity onPress={() => setHistoryVisible(true)} style={styles.historyBtn} activeOpacity={0.8}>
            <Text style={styles.historyText}>History</Text>
          </TouchableOpacity>
        </View>
        <ToneSelector tone={tone} onChangeTone={handleChangeTone} />
      </View>
      
      <View style={styles.insightsSection}>
        <View style={styles.content}>
          <SectionHeader title="Insights" />
        </View>
        <InsightCarousel insights={insights} />
      </View>

      <View style={styles.chatContainer}>
        <View style={styles.content}>
          <SectionHeader title="Conversation" />
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessageBubble message={item} />}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loading}>
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size="small" color="#6B7280" />
                </View>
              </View>
            ) : null
          }
        />
      </View>

      <View style={styles.footer}>
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          quickActions={[
            'Review Last Game',
            'Set Weekly Focus',
            'Recommend Drills',
            'Explain This Trend',
          ]}
        />
      </View>

      <SessionHistoryModal
        visible={historyVisible}
        sessions={sessions}
        onSelect={async (id) => {
          setHistoryVisible(false);
          const idx = sessions.find((s) => s.id === id);
          if (!idx) return;
          const saved = await getCurrentSession();
          // For MVP local-only, we store one current session; picking history just resets topic and keeps messages
          await setCurrentSession({ id, topic: idx.topic, messages: [], updatedAt: Date.now() });
          setMessages([]);
        }}
        onClose={() => setHistoryVisible(false)}
      />
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
    backgroundColor: '#F7F7F9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    backgroundColor: 'rgba(79,70,229,0.1)'
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
  historyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
  },
  historyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D2333',
  },
  insightsSection: {
    backgroundColor: '#F7F7F9',
    paddingBottom: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  loading: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    marginTop: 8,
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export default AiCoachScreen;
