import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import TopNavBar from '../components/TopNavBar';
import TierSelector from '../components/skills/TierSelector';
import TierProgressCard from '../components/skills/TierProgressCard';
import DrillListItem from '../components/skills/DrillListItem';
import DrillInProgressModal from '../components/skills/DrillInProgressModal';
import SectionHeader from '../components/SectionHeader';
import type { Tier, WallBallDrill, UserSkillsProgress, DrillStatus, Drill } from '../types';
import { wallBallDrills, defaultProgress, getNextTier, getTierColor } from '../utils/mockSkillsData';

const STORAGE_KEY = '@skills_progress';

const SkillsScreen: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<Tier>('Bronze');
  const [progress, setProgress] = useState<UserSkillsProgress>(defaultProgress);
  const [activeDrill, setActiveDrill] = useState<WallBallDrill | null>(null);

  // Load progress from AsyncStorage on mount
  useEffect(() => {
    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress to AsyncStorage whenever it changes
  useEffect(() => {
    if (progress.tier || progress.completedDrillIds.length > 0 || Object.keys(progress.repsLogged).length > 0) {
      saveProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UserSkillsProgress = JSON.parse(stored);
        setProgress(parsed);
        // Set initial selected tier based on user's current tier
        setSelectedTier(parsed.tier);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleStartDrill = (drill: WallBallDrill) => {
    setActiveDrill(drill);
  };

  const handleCloseModal = () => {
    setActiveDrill(null);
  };

  const handleCompleteDrill = (drillId: string, reps: number) => {
    const drill = wallBallDrills.find(d => d.id === drillId);
    if (!drill) return;

    const updatedRepsLogged = { ...progress.repsLogged, [drillId]: reps };
    const shouldComplete = reps >= drill.targetReps;

    // If drill is completed for the first time
    if (shouldComplete && !progress.completedDrillIds.includes(drillId)) {
      const updatedCompleted = [...progress.completedDrillIds, drillId];
      
      // Check if all drills in current tier are completed
      const tierDrills = wallBallDrills.filter(d => d.tier === progress.tier);
      const allTierComplete = tierDrills.every(d => updatedCompleted.includes(d.id));

      if (allTierComplete) {
        // Tier up!
        const nextTier = getNextTier(progress.tier);
        if (nextTier) {
          setProgress({
            tier: nextTier,
            completedDrillIds: updatedCompleted,
            repsLogged: updatedRepsLogged,
          });
          setSelectedTier(nextTier);
          // Haptic feedback for tier up
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          // Already at max tier
          setProgress({
            ...progress,
            completedDrillIds: updatedCompleted,
            repsLogged: updatedRepsLogged,
          });
        }
      } else {
        setProgress({
          ...progress,
          completedDrillIds: updatedCompleted,
          repsLogged: updatedRepsLogged,
        });
      }

      // Celebration haptic
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      // Just update reps
      setProgress({
        ...progress,
        repsLogged: updatedRepsLogged,
      });
    }

    setActiveDrill(null);
  };

  // Get drills for selected tier
  const tierDrills = useMemo(() => {
    return wallBallDrills.filter(d => d.tier === selectedTier);
  }, [selectedTier]);

  // Calculate progress for selected tier
  const tierProgress = useMemo(() => {
    const completed = tierDrills.filter(d => progress.completedDrillIds.includes(d.id)).length;
    const total = tierDrills.length;
    const progressPercent = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, progress: progressPercent };
  }, [tierDrills, progress.completedDrillIds]);

  // Get drill status
  const getDrillStatus = (drillId: string): DrillStatus => {
    if (progress.completedDrillIds.includes(drillId)) {
      return 'completed';
    }
    const drillsInTier = wallBallDrills.filter(d => d.tier === selectedTier);
    const currentIndex = drillsInTier.findIndex(d => d.id === drillId);
    const firstIncompleteIndex = drillsInTier.findIndex(d => !progress.completedDrillIds.includes(d.id));
    
    if (currentIndex === firstIncompleteIndex || drillsInTier.every(d => progress.completedDrillIds.includes(d.id))) {
      return 'in_progress';
    }
    return 'locked';
  };

  // Convert WallBallDrill to Drill format for DrillListItem
  const convertToDrill = (wbDrill: WallBallDrill): Drill => {
    const status = getDrillStatus(wbDrill.id);
    return {
      id: wbDrill.id,
      title: wbDrill.title,
      category: wbDrill.type,
      tier: wbDrill.tier,
      isCompleted: status === 'completed',
    };
  };

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Erica" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Skills & Drills</Text>
          <Text style={styles.subtitle}>Sharpen your game — one rep, one tier, one season at a time.</Text>
        </View>

        <View style={styles.content}>
          <TierSelector selectedTier={selectedTier} onSelectTier={setSelectedTier} />
        </View>

        <View style={styles.content}>
          <TierProgressCard tier={selectedTier} progress={tierProgress.progress} completed={tierProgress.completed} total={tierProgress.total} />
        </View>

        <View style={styles.content}>
          <SectionHeader title="Wall Ball Drills" />
          <View style={styles.drillsList}>
            {tierDrills.map((drill) => {
              const status = getDrillStatus(drill.id);
              const drillDisplay = convertToDrill(drill);
              const repsLogged = progress.repsLogged[drill.id] || 0;
              
              return (
                <DrillListItem
                  key={drill.id}
                  drill={drillDisplay}
                  onStartDrill={() => handleStartDrill(drill)}
                  status={status}
                  repsLogged={repsLogged}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      {activeDrill && (
        <DrillInProgressModal 
          drill={activeDrill} 
          onClose={handleCloseModal}
          onComplete={handleCompleteDrill}
          currentReps={progress.repsLogged[activeDrill.id] || 0}
        />
      )}
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
    fontFamily: 'Outfit-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'InterTight-Regular',
  },
  drillsList: {
    gap: 12,
  },
});

export default SkillsScreen;
