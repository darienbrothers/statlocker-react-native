import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import type { OutreachTone, EmailDraft } from '../../utils/mockRecruiting';

type Props = {
  visible: boolean;
  defaultSubject?: string;
  defaultBody?: string;
  defaultTone?: OutreachTone;
  onClose: () => void;
  onSave?: (draft: Omit<EmailDraft, 'id' | 'createdAt'>) => void;
};

const tones: OutreachTone[] = ['professional', 'warm', 'direct'];

export default function AiOutreachComposer({ visible, defaultSubject, defaultBody, defaultTone = 'professional', onClose, onSave }: Props) {
  const [tone, setTone] = useState<OutreachTone>(defaultTone);
  const [subject, setSubject] = useState<string>(defaultSubject ?? 'Introduction from a prospective student-athlete');
  const [body, setBody] = useState<string>(defaultBody ?? 'Coach [Name],\n\nMy name is [Athlete], a [Grad Year] [Position]. Id love to share my recent stats and interest in your program.\n\nKey highlight: [1–2 stats/goals].\n\nBest,\n[Athlete]\n[Contact]');

  const preview = useMemo(() => {
    switch (tone) {
      case 'warm':
        return body.replace('Best,', 'Thanks so much,');
      case 'direct':
        return body.replace('Id love to share', 'Sharing stats and interest.');
      default:
        return body;
    }
  }, [tone, body]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-white">
        <View className="px-4 pt-6 pb-3 border-b border-[#E5E7EB]">
          <Text className="font-outfit-bold text-lg text-ink-title">AI Email Composer</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text className="font-intertight-semibold text-[13px] text-ink-title mb-2">Tone</Text>
          <View className="flex-row mb-4">
            {tones.map(t => (
              <TouchableOpacity key={t} onPress={() => setTone(t)} className={`px-3 py-2 mr-2 rounded-full border ${tone === t ? 'bg-[#EEF2FF] border-[#6366F1]' : 'bg-white border-[#E5E7EB]'}`}>
                <Text className="text-[12px] text-ink-title capitalize">{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="font-intertight-semibold text-[13px] text-ink-title mb-2">Subject</Text>
          <TextInput value={subject} onChangeText={setSubject} className="border border-[#E5E7EB] rounded-xl p-3 mb-4" placeholder="Subject" />

          <Text className="font-intertight-semibold text-[13px] text-ink-title mb-2">Body</Text>
          <TextInput value={body} onChangeText={setBody} className="border border-[#E5E7EB] rounded-xl p-3" placeholder="Body" multiline numberOfLines={8} textAlignVertical="top" />

          <Text className="font-intertight-semibold text-[13px] text-ink-title mt-6 mb-2">Preview</Text>
          <View className="border border-[#E5E7EB] rounded-xl p-3 bg-[#FAFAFA]">
            <Text className="text-ink-title text-[12px]">{preview}</Text>
          </View>
        </ScrollView>
        <View className="p-4 border-t border-[#E5E7EB] flex-row gap-2">
          <TouchableOpacity onPress={onClose} className="flex-1 bg-[#F3F4F6] rounded-xl p-3">
            <Text className="text-center text-ink-title font-intertight-semibold">Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSave && onSave({ subject, body: preview, tone })}
            className="flex-1 bg-[#6366F1] rounded-xl p-3"
          >
            <Text className="text-center text-white font-intertight-semibold">Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}


