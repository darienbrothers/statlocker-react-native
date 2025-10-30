import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { mockMessagesStore } from '../store/messages/mockStore';
import { ThreadSummary } from '../types/messages';
import TopNavBar from '../components/TopNavBar';

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
      style={styles.threadItem}
      onPress={() => navigation.navigate('ThreadScreen', { threadId: item.id, isChannel: item.isChannel })}
      activeOpacity={0.7}
    >
      <View style={styles.threadContent}>
        <View style={styles.threadInfo}>
          <Text style={styles.threadName}>{item.name}</Text>
          {item.type === 'announcements' ? (
            <Text style={styles.threadMeta}>Coach announcements</Text>
          ) : null}
        </View>
        {item.unreadCount ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Erica" />
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Stay connected with your team and coaches.</Text>
      </View>
      <FlatList
        data={sections}
        keyExtractor={(s) => s.title}
        renderItem={({ item: section }) => (
          <View>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            {section.data.map((row) => (
              <View key={row.id}>{renderRow(row)}</View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

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
    fontFamily: 'Outfit-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'InterTight-Regular',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    backgroundColor: '#F7F7F9',
  },
  threadItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  threadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  threadInfo: {
    flex: 1,
  },
  threadName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
  },
  threadMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  unreadBadge: {
    minWidth: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});


