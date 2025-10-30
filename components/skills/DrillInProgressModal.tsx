import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import type { Drill } from '../../types';
import { Icon } from '../Icon';
import { WebView } from 'react-native-webview';

interface DrillInProgressModalProps {
  drill: Drill;
  onClose: () => void;
}

const DrillInProgressModal: React.FC<DrillInProgressModalProps> = ({ drill, onClose }) => {
  // Extract YouTube video ID if it's a YouTube URL
  const getVideoUrl = () => {
    if (!drill.videoUrl) return null;
    // Simple YouTube URL parsing - in production, you'd want more robust parsing
    const match = drill.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return drill.videoUrl;
  };

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
            {getVideoUrl() ? (
              <View style={styles.videoContainer}>
                <WebView
                  source={{ uri: getVideoUrl() || '' }}
                  style={styles.video}
                  javaScriptEnabled
                  domStorageEnabled
                />
              </View>
            ) : (
              <View style={styles.noVideo}>
                <Text style={styles.noVideoText}>No video available for this drill.</Text>
              </View>
            )}

            <View style={styles.instructions}>
              <Text style={styles.instructionsTitle}>Instructions:</Text>
              <Text style={styles.instructionsText}>
                Follow the instructions in the video to complete the drill. Focus on proper form and technique.
                Repeat as necessary to build muscle memory.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose} style={styles.finishButton} activeOpacity={0.8}>
              <Text style={styles.finishButtonText}>Finish Drill</Text>
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
});

export default DrillInProgressModal;

