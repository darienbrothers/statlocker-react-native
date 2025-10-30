import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import type { AiSession } from '../../types';

interface SessionHistoryModalProps {
  visible: boolean;
  sessions: Pick<AiSession, 'id' | 'topic' | 'updatedAt'>[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

const SessionHistoryModal: React.FC<SessionHistoryModalProps> = ({ visible, sessions, onSelect, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Session History</Text>
          <TouchableOpacity onPress={onClose} style={styles.close} activeOpacity={0.7}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item.id)} style={styles.row} activeOpacity={0.8}>
              <View>
                <Text style={styles.rowTitle}>{item.topic || 'Conversation'}</Text>
                <Text style={styles.rowMeta}>{new Date(item.updatedAt).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  close: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  closeText: {
    color: '#111827',
    fontWeight: '600',
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  rowMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});

export default SessionHistoryModal;


