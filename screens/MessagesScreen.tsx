import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { mockMessagesStore } from '../store/messages/mockStore';
import { ThreadSummary } from '../types/messages';

type Section = { title: string; data: ThreadSummary[] };

export default function MessagesScreen({ navigation }: any) {
  const [channels, setChannels] = useState<ThreadSummary[]>([]);
  const [dms, setDMs] = useState<ThreadSummary[]>([]);

  useEffect(() => {
    setChannels(mockMessagesStore.listChannels());
    setDMs(mockMessagesStore.listDMs());

    const unsub1 = mockMessagesStore.subscribe('message:new', () => {
      setChannels(mockMessagesStore.listChannels());
      setDMs(mockMessagesStore.listDMs());
    });
    const unsub2 = mockMessagesStore.subscribe('thread:read', () => {
      setChannels(mockMessagesStore.listChannels());
      setDMs(mockMessagesStore.listDMs());
    });
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const sections: Section[] = useMemo(() => [
    { title: 'Channels', data: channels },
    { title: 'DMs', data: dms },
  ], [channels, dms]);

  const renderRow = (item: ThreadSummary) => (
    <TouchableOpacity
      className="px-4 py-3 border-b border-slate-200 bg-white"
      onPress={() => navigation.navigate('ThreadScreen', { threadId: item.id, isChannel: item.isChannel })}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-ink-title font-outfit-bold text-base">{item.name}</Text>
          {item.type === 'announcements' ? (
            <Text className="text-ink-subtle text-xs">Coach announcements</Text>
          ) : null}
        </View>
        {item.unreadCount ? (
          <View className="min-w-[24px] px-2 py-1 rounded-full bg-brand-primary">
            <Text className="text-white text-xs font-semibold">{item.unreadCount}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#F7F7F9]">
      <FlatList
        data={sections}
        keyExtractor={(s) => s.title}
        renderItem={({ item: section }) => (
          <View>
            <Text className="px-4 py-2 text-ink-subtle text-xs uppercase">{section.title}</Text>
            {section.data.map((row) => (
              <View key={row.id}>{renderRow(row)}</View>
            ))}
          </View>
        )}
      />
    </View>
  );
}


