import React from 'react';
import { View, Text } from 'react-native';
import EmergencyContactsList from './EmergencyContactsList';
import HealthInfoGrid from './HealthInfoGrid';

export type EmergencyContact = {
	id: string;
	name: string;
	relation: string;
	phone: string;
	notes?: string;
	shared?: boolean;
};

export type Allergy = {
	id: string;
	name: string;
	severity: 'mild' | 'moderate' | 'severe';
	shared?: boolean;
};

export type HealthCondition = {
	id: string;
	name: string;
	shared?: boolean;
};

export type Medication = {
	id: string;
	name: string;
	dosage: string;
	schedule: string;
	notes?: string;
	shared?: boolean;
};

export type HealthModel = {
	emergencyContacts: EmergencyContact[];
	allergies: Allergy[];
	conditions: HealthCondition[];
	medications: Medication[];
	bloodType?: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
	medicalNotes?: string;
};

export default function HealthSection({ health }: { health: HealthModel }) {
	return (
		<View className="rounded-2xl shadow-card border border-slate-200 p-4 bg-white">
			<Text className="font-outfit-bold text-xl text-ink-title mb-3">Health & Safety</Text>
			<EmergencyContactsList contacts={health.emergencyContacts} />
			<View className="h-[12]" />
			<HealthInfoGrid
				allergies={health.allergies}
				conditions={health.conditions}
				medications={health.medications}
				bloodType={health.bloodType}
				medicalNotes={health.medicalNotes}
			/>
		</View>
	);
}
