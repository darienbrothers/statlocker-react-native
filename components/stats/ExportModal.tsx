import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from '../Icon';
import type { TimeRange } from '../../types';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
  onExport?: (format: string, timeRange: TimeRange, team: 'High School' | 'Club') => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ visible, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('Season');
  const [selectedTeam, setSelectedTeam] = useState<'High School' | 'Club'>('High School');

  const handleExport = () => {
    if (selectedFormat) {
      onExport?.(selectedFormat, selectedTimeRange, selectedTeam);
      onClose();
    }
  };

  const formats = [
    { id: 'share-card', label: 'Share Card (Image)', comingSoon: false },
    { id: 'pdf', label: 'PDF Report', comingSoon: true },
    { id: 'csv', label: 'CSV Data', comingSoon: true },
  ];

  const timeRanges: TimeRange[] = ['Last 7 Days', 'Last 30 Days', 'Season'];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Generate Report</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Team Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Team</Text>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, selectedTeam === 'High School' && styles.toggleButtonActive]}
                  onPress={() => setSelectedTeam('High School')}
                >
                  <Text style={[styles.toggleText, selectedTeam === 'High School' && styles.toggleTextActive]}>
                    High School
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, selectedTeam === 'Club' && styles.toggleButtonActive]}
                  onPress={() => setSelectedTeam('Club')}
                >
                  <Text style={[styles.toggleText, selectedTeam === 'Club' && styles.toggleTextActive]}>
                    Club
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Time Range Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Time Range</Text>
              {timeRanges.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[styles.optionButton, selectedTimeRange === range && styles.optionButtonActive]}
                  onPress={() => setSelectedTimeRange(range)}
                >
                  <Text style={[styles.optionText, selectedTimeRange === range && styles.optionTextActive]}>
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Format Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Format</Text>
              {formats.map((format) => (
                <TouchableOpacity
                  key={format.id}
                  style={[
                    styles.formatButton,
                    selectedFormat === format.id && styles.formatButtonActive,
                    format.comingSoon && styles.formatButtonDisabled,
                  ]}
                  onPress={() => !format.comingSoon && setSelectedFormat(format.id)}
                  disabled={format.comingSoon}
                >
                  <View style={styles.formatContent}>
                    <Text style={[
                      styles.formatText,
                      selectedFormat === format.id && styles.formatTextActive,
                      format.comingSoon && styles.formatTextDisabled,
                    ]}>
                      {format.label}
                    </Text>
                    {format.comingSoon && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>Soon</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Preview Mockup */}
            {selectedFormat === 'share-card' && (
              <View style={styles.previewSection}>
                <Text style={styles.sectionTitle}>Preview</Text>
                <View style={styles.previewCard}>
                  <View style={styles.previewHeader}>
                    <View style={styles.previewAvatar} />
                    <View>
                      <Text style={styles.previewName}>Erica Brothers</Text>
                      <Text style={styles.previewPosition}>Goalie • 2026</Text>
                    </View>
                  </View>
                  <View style={styles.previewStats}>
                    <View style={styles.previewStat}>
                      <Text style={styles.previewStatValue}>78.5%</Text>
                      <Text style={styles.previewStatLabel}>Save %</Text>
                    </View>
                    <View style={styles.previewStat}>
                      <Text style={styles.previewStatValue}>2.1</Text>
                      <Text style={styles.previewStatLabel}>GAA</Text>
                    </View>
                    <View style={styles.previewStat}>
                      <Text style={styles.previewStatValue}>85%</Text>
                      <Text style={styles.previewStatLabel}>Clear %</Text>
                    </View>
                  </View>
                  <Text style={styles.previewTagline}>Your Stats. Your Story. Your Future.</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.exportButton, !selectedFormat && styles.exportButtonDisabled]}
              onPress={handleExport}
              disabled={!selectedFormat}
            >
              <Text style={styles.exportButtonText}>Generate</Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: '#EEF2FF',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionTextActive: {
    color: '#4F46E5',
  },
  formatButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  formatButtonActive: {
    backgroundColor: '#EEF2FF',
  },
  formatButtonDisabled: {
    opacity: 0.5,
  },
  formatContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formatText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  formatTextActive: {
    color: '#4F46E5',
  },
  formatTextDisabled: {
    color: '#9CA3AF',
  },
  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
  },
  previewSection: {
    marginTop: 8,
  },
  previewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  previewAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    marginRight: 12,
  },
  previewName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
  },
  previewPosition: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  previewStats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  previewStat: {
    alignItems: 'center',
  },
  previewStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F46E5',
  },
  previewStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  previewTagline: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  exportButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#4F46E5',
  },
  exportButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default ExportModal;

