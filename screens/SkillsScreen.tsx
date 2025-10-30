import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import TierSelector from '../components/skills/TierSelector';
import TierProgressCard from '../components/skills/TierProgressCard';
import DrillListItem from '../components/skills/DrillListItem';
import DrillInProgressModal from '../components/skills/DrillInProgressModal';
import type { Drill } from '../types';

const mockDrills: Drill[] = [
  // Foundation
  { id: 'f1', title: 'Goalie Stance & Positioning', category: 'Fundamentals', tier: 'Foundation', isCompleted: true },
  { id: 'f2', title: 'Basic Stick Saves (High/Mid/Low)', category: 'Saving', tier: 'Foundation', isCompleted: true },
  { id: 'f3', title: 'Body Saves & Blocking', category: 'Saving', tier: 'Foundation', isCompleted: true },
  { id: 'f4', title: 'Simple Clears to Open Players', category: 'Clearing', tier: 'Foundation', isCompleted: false, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'f5', title: 'Scooping Ground Balls', category: 'Fundamentals', tier: 'Foundation', isCompleted: false },

  // Advanced
  { id: 'a1', title: 'Angle Play & Cutting Down Shots', category: 'Positioning', tier: 'Advanced', isCompleted: true },
  { id: 'a2', title: 'Baiting & Reading Shooters', category: 'Saving', tier: 'Advanced', isCompleted: false, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'a3', title: 'Clearing Under Pressure', category: 'Clearing', tier: 'Advanced', isCompleted: false },
  { id: 'a4', title: 'Communicating with Defense', category: 'Communication', tier: 'Advanced', isCompleted: true },
  { id: 'a5', title: 'One-on-One Saves', category: 'Saving', tier: 'Advanced', isCompleted: false },

  // Elite
  { id: 'e1', title: 'Advanced Stick Fakes on Clears', category: 'Clearing', tier: 'Elite', isCompleted: false },
  { id: 'e2', title: 'Reading & Intercepting Passes', category: 'Positioning', tier: 'Elite', isCompleted: false, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'e3', title: 'Goalie-Initiated Fast Breaks', category: 'Clearing', tier: 'Elite', isCompleted: false },
  { id: 'e4', title: 'Mental Toughness & Composure', category: 'Mental Game', tier: 'Elite', isCompleted: false },
];

const SkillsScreen: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'Foundation' | 'Advanced' | 'Elite'>('Foundation');
  const [drills, setDrills] = useState(mockDrills);
  const [activeDrill, setActiveDrill] = useState<Drill | null>(null);

  const handleToggleComplete = (drillId: string) => {
    setDrills(drills.map((d) => (d.id === drillId ? { ...d, isCompleted: !d.isCompleted } : d)));
  };

  const handleStartDrill = (drill: Drill) => {
    setActiveDrill(drill);
  };

  const handleCloseModal = () => {
    setActiveDrill(null);
  };

  const filteredDrills = useMemo(() => {
    return drills.filter((d) => d.tier === selectedTier);
  }, [drills, selectedTier]);

  const tierProgress = useMemo(() => {
    const tierDrills = drills.filter((d) => d.tier === selectedTier);
    const completed = tierDrills.filter((d) => d.isCompleted).length;
    const total = tierDrills.length;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, progress };
  }, [drills, selectedTier]);

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Alex" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Skills & Drills</Text>
          <Text style={styles.subtitle}>Hone your craft and master your position.</Text>
        </View>

        <View style={styles.content}>
          <TierSelector selectedTier={selectedTier} onSelectTier={setSelectedTier} />
        </View>

        <View style={styles.content}>
          <TierProgressCard tier={selectedTier} progress={tierProgress.progress} completed={tierProgress.completed} total={tierProgress.total} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionHeader}>Drills</Text>
          <View style={styles.drillsList}>
            {filteredDrills.map((drill) => (
              <DrillListItem
                key={drill.id}
                drill={drill}
                onToggleComplete={handleToggleComplete}
                onStartDrill={handleStartDrill}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {activeDrill && <DrillInProgressModal drill={activeDrill} onClose={handleCloseModal} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 16,
  },
  drillsList: {
    gap: 12,
  },
});

export default SkillsScreen;
