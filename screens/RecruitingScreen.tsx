import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
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
    <View className="flex-1 bg-[#F7F7F9]">
      {/* Sticky Overview Strip */}
      <View className="px-4 pt-6 pb-3 bg-white border-b border-[#E5E7EB]">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <ProgressRing percent={progressPct} />
            <View>
              <Text className="font-outfit-bold text-xl text-ink-title">Recruiting</Text>
              {nextAction && (
                <Text className="text-ink-subtle text-xs mt-0.5">Next: {nextAction}</Text>
              )}
            </View>
          </View>
        </View>
        <Text className="text-ink-subtle text-xs mt-1">Every task you complete moves a coach closer to knowing you.</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Roadmap */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="font-outfit-bold text-lg text-ink-title mb-3">Roadmap</Text>
          <RoadmapTimeline milestones={milestones} onPressMilestone={setSelectedMilestone} />
        </View>

        {/* Target Schools */}
        <View className="mb-4">
          <Text className="font-outfit-bold text-lg text-ink-title mb-2">Target Schools</Text>
          <View className="flex-row gap-3">
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
        <View className="bg-white rounded-2xl p-4 mb-24">
          <Text className="font-outfit-bold text-lg text-ink-title mb-3">AI Outreach</Text>
          <TouchableOpacity onPress={() => setComposerOpen(true)} className="bg-[#6366F1] rounded-xl p-3">
            <Text className="text-white text-center font-intertight-semibold">Generate Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add School FAB */}
      <TouchableOpacity
        onPress={() => setAddOpen(true)}
        className="absolute bottom-6 right-6 bg-brand-primary w-16 h-16 rounded-full items-center justify-center shadow-md"
        activeOpacity={0.9}
      >
        <Text className="text-white text-2xl">+</Text>
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
        <View className="flex-1 bg-black/40 items-center justify-center">
          <View className="bg-white w-11/12 rounded-2xl p-4">
            <Text className="font-outfit-bold text-lg text-ink-title mb-3">Add School</Text>
            <TextInput
              value={newSchoolName}
              onChangeText={setNewSchoolName}
              placeholder="School name"
              className="border border-[#E5E7EB] rounded-xl p-3 mb-3"
            />
            <TextInput
              value={newDivision}
              onChangeText={(t) => setNewDivision((t as any) || 'DIII')}
              placeholder="Division (DI/DII/DIII/Club)"
              className="border border-[#E5E7EB] rounded-xl p-3 mb-4"
            />
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={() => setAddOpen(false)} className="flex-1 bg-[#F3F4F6] rounded-xl p-3">
                <Text className="text-center text-ink-title">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!newSchoolName) return;
                  setSchools(prev => addSchool(prev, { name: newSchoolName, division: newDivision } as any));
                  setNewSchoolName('');
                  setNewDivision('DIII');
                  setAddOpen(false);
                }}
                className="flex-1 bg-[#10B981] rounded-xl p-3"
              >
                <Text className="text-center text-white">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


