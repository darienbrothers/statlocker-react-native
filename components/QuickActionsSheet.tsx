import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import type { IconName } from '../types';

interface QuickActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLogGameClick: () => void;
}

interface ActionItemProps {
  icon: IconName;
  iconBg: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  isFuture?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, iconBg, title, subtitle, onClick, isFuture }) => (
  <TouchableOpacity
    onPress={onClick}
    disabled={isFuture}
    style={[styles.actionItem, isFuture && styles.actionItemDisabled]}
    activeOpacity={0.7}
  >
    <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
      <Icon name={icon} size={24} color="#FFFFFF" />
    </View>
    <View style={styles.actionText}>
      <View style={styles.actionTitleRow}>
        <Text style={styles.actionTitle}>{title}</Text>
        {isFuture && <Text style={styles.futureBadge}>Future</Text>}
      </View>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </View>
    <Icon name="arrowRight" size={20} color="#6B7280" />
  </TouchableOpacity>
);

const QuickActionsSheet: React.FC<QuickActionsSheetProps> = ({
  isOpen,
  onClose,
  onLogGameClick,
  onAskAiCoachClick,
}) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouch} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Quick Actions</Text>

          <View style={styles.actions}>
            <ActionItem
              icon="play"
              iconBg="#10B981"
              title="Live Game"
              subtitle="Track in real-time"
              onClick={() => {}}
              isFuture
            />
            <ActionItem
              icon="check"
              iconBg="#4F46E5"
              title="After Game"
              subtitle="Quick stat entry"
              onClick={onLogGameClick}
            />
            <ActionItem
              icon="camera"
              iconBg="#F97316"
              title="Scan Stats"
              subtitle="Import from photo"
              onClick={() => {}}
              isFuture
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouch: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#F7F7F9',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '70%',
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
    textAlign: 'center',
    marginBottom: 24,
  },
  actions: {
    gap: 16,
  },
  actionItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionItemDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 16,
    flex: 1,
  },
  actionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1D2333',
  },
  futureBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default QuickActionsSheet;

