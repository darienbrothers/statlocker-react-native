import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { mockMessagesStore } from '../store/messages/mockStore';
import { Message } from '../types/messages';

function useThread(threadId: string) {
  const [state, setState] = useState(() => mockMessagesStore.getThread(threadId));

  useEffect(() => {
    const unsubNew = mockMessagesStore.subscribe('message:new', ({ message }) => {
      if (message.threadId === threadId) setState(mockMessagesStore.getThread(threadId));
    });
    const unsubReact = mockMessagesStore.subscribe('reaction:toggle', () => setState(mockMessagesStore.getThread(threadId)));
    const unsubRead = mockMessagesStore.subscribe('thread:read', ({ threadId: t }) => {
      if (t === threadId) setState(mockMessagesStore.getThread(threadId));
    });
    const unsubTyping = mockMessagesStore.subscribe('presence:typing', ({ threadId: t }) => {
      if (t === threadId) setState(mockMessagesStore.getThread(threadId));
    });
    const unsubPin = mockMessagesStore.subscribe('pin:changed', ({ threadId: t }) => {
      if (t === threadId) setState(mockMessagesStore.getThread(threadId));
    });
    return () => { unsubNew(); unsubReact(); unsubRead(); unsubTyping(); unsubPin(); };
  }, [threadId]);

  return state;
}

function MessageRow({ message, onLongPress }: { message: Message; onLongPress: () => void }) {
  const isAnnouncement = message.type === 'announcement';
  return (
    <TouchableOpacity onLongPress={onLongPress} activeOpacity={0.7} className="px-4 py-2">
      <View className={isAnnouncement ? 'bg-[#EEF2FF] border border-[#6366F1] rounded-xl p-3' : ''}>
        <Text className="text-ink-subtle text-[12px]">{new Date(message.createdAt).toLocaleTimeString()}</Text>
        <Text className="text-ink-title text-[15px]">{message.text}</Text>
        {Object.keys(message.reactions).length > 0 ? (
          <View className="flex-row mt-1">
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <View key={emoji} className="px-2 py-[2px] mr-1 rounded-full bg-white border border-slate-200">
                <Text className="text-[12px]">{`${emoji} ${users.length}`}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default function ThreadScreen({ route }: any) {
  const { threadId } = route.params as { threadId: string };
  const { thread, messages, presence } = useThread(threadId);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    mockMessagesStore.markRead({ threadId, userId: 'u_me' });
  }, [threadId]);

  const onSend = () => {
    if (!text.trim()) return;
    mockMessagesStore.sendMessage({ threadId, authorId: 'u_me', text: text.trim() });
    setText('');
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  const onTyping = (typing: boolean) => {
    mockMessagesStore.setTyping({ threadId, userId: 'u_me', typing });
  };

  const pinned = useMemo(() => messages.filter((m) => thread.pinnedMessageIds.includes(m.id)), [messages, thread.pinnedMessageIds]);

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View className="flex-1 bg-[#F7F7F9]">
        <View className="px-4 py-3 bg-white border-b border-slate-200 flex-row items-center justify-between">
          <Text className="text-ink-title font-outfit-bold text-base">{thread.name}</Text>
          <View className="flex-row">
            <TouchableOpacity className="px-2 py-1 mr-2 rounded-lg bg-[#F3F4F6]">
              <Text className="text-[13px]">Search</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-2 py-1 rounded-lg bg-[#F3F4F6]">
              <Text className="text-[13px]">Info</Text>
            </TouchableOpacity>
          </View>
        </View>
        {pinned.length > 0 ? (
          <View className="px-4 py-2 bg-white border-b border-slate-200">
            <Text className="text-ink-subtle text-xs mb-1">Pinned</Text>
            <View className="flex-row">
              {pinned.map((m) => (
                <View key={m.id} className="mr-2 px-2 py-1 rounded-lg bg-[#EEF2FF] border border-[#6366F1]">
                  <Text className="text-[12px]" numberOfLines={1}>{m.text}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <FlatList
          ref={listRef}
          contentContainerStyle={{ paddingVertical: 8 }}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <MessageRow
              message={item}
              onLongPress={() => mockMessagesStore.toggleReaction({ threadId, messageId: item.id, userId: 'u_me', emoji: '👍' })}
            />
          )}
          onMomentumScrollEnd={() => mockMessagesStore.markRead({ threadId, userId: 'u_me' })}
          onScrollEndDrag={() => mockMessagesStore.markRead({ threadId, userId: 'u_me' })}
        />

        {presence.typing.filter((u) => u !== 'u_me').length > 0 ? (
          <View className="px-4 py-1 bg-white border-t border-slate-200">
            <Text className="text-ink-subtle text-xs">Someone is typing…</Text>
          </View>
        ) : null}

        <View className="bg-white border-t border-slate-200 px-4 py-3">
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-[#F3F4F6] px-3 py-2 rounded-lg text-[15px]"
              placeholder="Message"
              value={text}
              onChangeText={setText}
              onFocus={() => onTyping(true)}
              onBlur={() => onTyping(false)}
            />
            <TouchableOpacity onPress={onSend} className="ml-2 px-3 py-2 rounded-lg bg-brand-primary">
              <Text className="text-white font-semibold">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


