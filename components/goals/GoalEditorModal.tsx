import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { UserGoal } from '../../types';
import { useGoals } from '../../contexts/goals';

type Props = {
  visible: boolean;
  onClose: () => void;
  editing?: UserGoal | null;
};

export const GoalEditorModal: React.FC<Props> = ({ visible, onClose, editing }) => {
  const { addGoal, updateGoal } = useGoals();
  const [title, setTitle] = useState('');
  const [metric, setMetric] = useState('');
  const [units, setUnits] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setMetric(editing.metric);
      setUnits(editing.units ?? '');
      setTargetValue(String(editing.targetValue));
      setCurrentValue(String(editing.currentValue));
    } else {
      setTitle('');
      setMetric('');
      setUnits('');
      setTargetValue('');
      setCurrentValue('');
    }
  }, [editing, visible]);

  const onSave = () => {
    if (!title || !metric || !targetValue) return;
    const parsedTarget = Number(targetValue);
    const parsedCurrent = Number(currentValue || 0);
    if (Number.isNaN(parsedTarget) || Number.isNaN(parsedCurrent)) return;

    if (editing) {
      updateGoal(editing.id, {
        title,
        metric,
        units: units || undefined,
        targetValue: parsedTarget,
        currentValue: parsedCurrent,
      });
    } else {
      addGoal({
        title,
        metric,
        units: units || undefined,
        targetValue: parsedTarget,
        currentValue: parsedCurrent,
        progressPct: 0,
        status: 'pending',
      } as any);
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 items-center justify-end">
        <View className="w-full bg-white rounded-t-2xl p-4">
          <Text className="font-outfit-bold text-xl text-ink-title mb-2">{editing ? 'Edit Goal' : 'Add Goal'}</Text>
          <View className="gap-3">
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              className="border border-slate-200 rounded-xl px-3 py-2"
            />
            <TextInput
              placeholder="Metric (e.g., savePct, goals)"
              value={metric}
              onChangeText={setMetric}
              className="border border-slate-200 rounded-xl px-3 py-2"
            />
            <TextInput
              placeholder="Units (%, count)"
              value={units}
              onChangeText={setUnits}
              className="border border-slate-200 rounded-xl px-3 py-2"
            />
            <TextInput
              placeholder="Target Value"
              keyboardType="numeric"
              value={targetValue}
              onChangeText={setTargetValue}
              className="border border-slate-200 rounded-xl px-3 py-2"
            />
            <TextInput
              placeholder="Current Value (optional)"
              keyboardType="numeric"
              value={currentValue}
              onChangeText={setCurrentValue}
              className="border border-slate-200 rounded-xl px-3 py-2"
            />
          </View>
          <View className="flex-row justify-end gap-3 mt-4">
            <TouchableOpacity onPress={onClose} className="px-4 py-2 rounded-xl border border-slate-200">
              <Text className="text-ink-subtle">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} className="px-4 py-2 rounded-xl bg-brand-primary">
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalEditorModal;


