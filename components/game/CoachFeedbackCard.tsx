import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Feedback = {
  coach: string;
  text: string;
  createdAt: string;
};

type Props = {
  feedback: Feedback[];
};

export const CoachFeedbackCard: React.FC<Props> = ({ feedback }) => {
  if (!feedback || feedback.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coach Feedback</Text>
        <Text style={styles.empty}>No coach feedback yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coach Feedback</Text>
      <View style={{ gap: 12 }}>
        {feedback.map((f, idx) => (
          <View key={idx} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.coach}>{f.coach}</Text>
              <Text style={styles.date}>{new Date(f.createdAt).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.text}>{f.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 8,
  },
  empty: {
    fontSize: 14,
    color: '#6B7280',
  },
  item: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  coach: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  text: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default CoachFeedbackCard;


