import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, TextInput } from 'react-native';
import type { WallBallDrill } from '../../types';
import { Icon } from '../Icon';

interface DrillInProgressModalProps {
  drill: WallBallDrill;
  onClose: () => void;
  onComplete?: (drillId: string, reps: number) => void;
  currentReps?: number;
}

const DrillInProgressModal: React.FC<DrillInProgressModalProps> = ({ drill, onClose, onComplete, currentReps = 0 }) => {
  const [reps, setReps] = useState(currentReps.toString());

  const handleSave = () => {
    const repsNum = parseInt(reps, 10) || 0;
    if (onComplete) {
      onComplete(drill.id, repsNum);
    } else {
      onClose();
    }
  };

  const repsNum = parseInt(reps, 10) || 0;
  const isTargetMet = repsNum >= drill.targetReps;

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{drill.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tier:</Text>
                <Text style={styles.infoValue}>{drill.tier}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Type:</Text>
                <Text style={styles.infoValue}>{drill.type}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Target Reps:</Text>
                <Text style={styles.infoValue}>{drill.targetReps}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Est. Time:</Text>
                <Text style={styles.infoValue}>{drill.estTimeMin} min</Text>
              </View>
            </View>

            {drill.description && (
              <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>Description:</Text>
                <Text style={styles.instructionsText}>{drill.description}</Text>
              </View>
            )}

            <View style={styles.repsSection}>
              <Text style={styles.repsLabel}>Log Your Reps:</Text>
              <View style={styles.repsInputContainer}>
                <TextInput
                  style={styles.repsInput}
                  value={reps}
                  onChangeText={setReps}
                  placeholder="0"
                  keyboardType="number-pad"
                  autoFocus
                />
                <Text style={styles.repsUnit}>reps</Text>
              </View>
              {currentReps > 0 && (
                <Text style={styles.currentReps}>Previous: {currentReps} reps</Text>
              )}
              {repsNum >= drill.targetReps && (
                <View style={styles.successBadge}>
                  <Icon name="check" size={16} color="#10B981" />
                  <Text style={styles.successText}>Target achieved!</Text>
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={handleSave} style={styles.finishButton} activeOpacity={0.8}>
              <Text style={styles.finishButtonText}>
                {isTargetMet ? 'Complete & Save' : 'Save Progress'}
              </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#F7F7F9',
    borderRadius: 16,
    width: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    padding: 16,
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  noVideo: {
    aspectRatio: 16 / 9,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noVideoText: {
    color: '#6B7280',
    fontSize: 14,
  },
  instructions: {
    marginTop: 16,
  },
  instructionsTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1D2333',
  },
  instructionsText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  finishButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1D2333',
    fontWeight: '600',
  },
  repsSection: {
    marginTop: 8,
  },
  repsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2333',
    marginBottom: 12,
  },
  repsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  repsInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: '#1D2333',
    textAlign: 'center',
  },
  repsUnit: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  currentReps: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  successText: {
    fontSize: 14,
    color: '#065F46',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DrillInProgressModal;

