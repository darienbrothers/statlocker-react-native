import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import ProgressRing from '../components/recruiting/ProgressRing';
import RoadmapTimeline from '../components/recruiting/RoadmapTimeline';
import MilestoneSheet from '../components/recruiting/MilestoneSheet';
import SchoolBoard from '../components/recruiting/SchoolBoard';
import AiOutreachComposer from '../components/recruiting/AiOutreachComposer';
import {
  seedMilestones,
  seedSchools,
  seedDrafts,
  calculateProgressPercent,
  getNextAction,
  addSchool,
  moveSchool,
  updateSchoolStatus,
  appendNote,
  saveDraft,
  type Milestone,
  type School,
  type SchoolBoard as Board,
  type SchoolStatus,
  type EmailDraft,
} from '../utils/mockRecruiting';

export default function RecruitingScreen() {
  const [milestones, setMilestones] = useState<Milestone[]>(seedMilestones);
  const [schools, setSchools] = useState<School[]>(seedSchools);
  const [drafts, setDrafts] = useState<EmailDraft[]>(seedDrafts);

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | undefined>();
  const [composerOpen, setComposerOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newDivision, setNewDivision] = useState<'DI' | 'DII' | 'DIII' | 'Club'>('DIII');

  const progressPct = useMemo(() => calculateProgressPercent(milestones), [milestones]);
  const nextAction = useMemo(() => getNextAction(milestones), [milestones]);

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Erica" />
      <View style={styles.header}>
        <Text style={styles.title}>Recruiting</Text>
        <Text style={styles.subtitle}>Build your path to the next level.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <ProgressRing percent={progressPct} />
            <View style={styles.progressInfo}>
              <Text style={styles.progressPercent}>{progressPct}% Complete</Text>
              {nextAction && (
                <Text style={styles.nextAction}>Next: {nextAction}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Roadmap */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Roadmap</Text>
          <RoadmapTimeline milestones={milestones} onPressMilestone={setSelectedMilestone} />
        </View>

        {/* Target Schools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Schools</Text>
          <View style={styles.schoolBoards}>
            <SchoolBoard
              title="Reach"
              board={'reach'}
              schools={schools}
              onChangeStatus={(id, status) => setSchools(prev => updateSchoolStatus(prev, id, status))}
              onMoveAcross={(id, to) => setSchools(prev => moveSchool(prev, id, to))}
            />
            <SchoolBoard
              title="Realistic"
              board={'realistic'}
              schools={schools}
              onChangeStatus={(id, status) => setSchools(prev => updateSchoolStatus(prev, id, status))}
              onMoveAcross={(id, to) => setSchools(prev => moveSchool(prev, id, to))}
            />
            <SchoolBoard
              title="Safe"
              board={'safe'}
              schools={schools}
              onChangeStatus={(id, status) => setSchools(prev => updateSchoolStatus(prev, id, status))}
              onMoveAcross={(id, to) => setSchools(prev => moveSchool(prev, id, to))}
            />
          </View>
        </View>

        {/* AI Outreach */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AI Outreach</Text>
          <TouchableOpacity onPress={() => setComposerOpen(true)} style={styles.outreachButton} activeOpacity={0.8}>
            <Text style={styles.outreachButtonText}>Generate Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add School FAB */}
      <TouchableOpacity
        onPress={() => setAddOpen(true)}
        style={styles.fab}
        activeOpacity={0.9}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Milestone Sheet */}
      <MilestoneSheet
        visible={!!selectedMilestone}
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(undefined)}
        onMarkDone={(id) => {
          setMilestones(prev => prev.map(m => (m.id === id ? { ...m, status: 'done' } : m)));
          setSelectedMilestone(undefined);
        }}
        onSnooze={(id) => {
          setMilestones(prev => prev.map(m => (m.id === id ? { ...m, status: 'snooze' } : m)));
          setSelectedMilestone(undefined);
        }}
      />

      {/* Composer */}
      <AiOutreachComposer
        visible={composerOpen}
        onClose={() => setComposerOpen(false)}
        onSave={(draft) => setDrafts(prev => saveDraft(prev, draft))}
      />

      {/* Add School Modal (simple) */}
      <Modal visible={addOpen} transparent animationType="fade" onRequestClose={() => setAddOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add School</Text>
            <TextInput
              value={newSchoolName}
              onChangeText={setNewSchoolName}
              placeholder="School name"
              style={styles.input}
            />
            <TextInput
              value={newDivision}
              onChangeText={(t) => setNewDivision((t as any) || 'DIII')}
              placeholder="Division (DI/DII/DIII/Club)"
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setAddOpen(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!newSchoolName) return;
                  setSchools(prev => addSchool(prev, { name: newSchoolName, division: newDivision } as any));
                  setNewSchoolName('');
                  setNewDivision('DIII');
                  setAddOpen(false);
                }}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    padding: 16,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D2333',
  },
  nextAction: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 12,
  },
  schoolBoards: {
    flexDirection: 'row',
    gap: 12,
  },
  outreachButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  outreachButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D2333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#1D2333',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#1D2333',
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});


