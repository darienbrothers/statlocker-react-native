import React from 'react';
import { View, Text } from 'react-native';
import SharePill from './SharePill';
import { Allergy, HealthCondition, Medication } from './HealthSection';

export default function HealthInfoGrid({
	allergies,
	conditions,
	medications,
	bloodType,
	medicalNotes,
}: {
	allergies: Allergy[];
	conditions: HealthCondition[];
	medications: Medication[];
	bloodType?: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
	medicalNotes?: string;
}) {
	return (
		<View>
			<View className="mb-3">
				<Text className="text-ink-title font-intertight-semibold mb-2">Allergies</Text>
				{allergies && allergies.length > 0 ? (
					allergies.map((a) => (
						<View key={a.id} className="flex-row justify-between items-center border border-slate-200 rounded-xl p-3 mb-2">
							<Text className="text-[14px] text-ink-title">
								{a.name} <Text className="text-[13px] text-slate-500">({a.severity})</Text>
							</Text>
							<SharePill shared={a.shared} />
						</View>
					))
				) : (
					<Text className="text-[13px] text-slate-500">No allergies listed.</Text>
				)}
			</View>

			<View className="mb-3">
				<Text className="text-ink-title font-intertight-semibold mb-2">Conditions</Text>
				{conditions && conditions.length > 0 ? (
					conditions.map((c) => (
						<View key={c.id} className="flex-row justify-between items-center border border-slate-200 rounded-xl p-3 mb-2">
							<Text className="text-[14px] text-ink-title">{c.name}</Text>
							<SharePill shared={c.shared} />
						</View>
					))
				) : (
					<Text className="text-[13px] text-slate-500">No conditions listed.</Text>
				)}
			</View>

			<View className="mb-3">
				<Text className="text-ink-title font-intertight-semibold mb-2">Medications</Text>
				{medications && medications.length > 0 ? (
					medications.map((m) => (
						<View key={m.id} className="border border-slate-200 rounded-xl p-3 mb-2">
							<View className="flex-row justify-between items-center">
								<Text className="text-[14px] text-ink-title">{m.name}</Text>
								<SharePill shared={m.shared} />
							</View>
							<Text className="text-[13px] text-slate-600 mt-1">{m.dosage} • {m.schedule}</Text>
							{m.notes ? <Text className="text-[13px] text-slate-500 mt-1">{m.notes}</Text> : null}
						</View>
					))
				) : (
					<Text className="text-[13px] text-slate-500">No medications listed.</Text>
				)}
			</View>

			<View className="mb-3">
				<Text className="text-ink-title font-intertight-semibold mb-2">Blood Type</Text>
				{bloodType ? (
					<View className="border border-slate-200 rounded-xl p-3">
						<Text className="text-[14px] text-ink-title">{bloodType}</Text>
					</View>
				) : (
					<Text className="text-[13px] text-slate-500">Not provided.</Text>
				)}
			</View>

			<View>
				<Text className="text-ink-title font-intertight-semibold mb-2">Medical Notes</Text>
				{medicalNotes ? (
					<View className="border border-slate-200 rounded-xl p-3">
						<Text className="text-[14px] text-ink-title">{medicalNotes}</Text>
					</View>
				) : (
					<Text className="text-[13px] text-slate-500">No notes added.</Text>
				)}
			</View>
		</View>
	);
}
