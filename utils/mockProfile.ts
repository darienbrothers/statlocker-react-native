import { HealthModel } from '../components/profile/HealthSection';

export const mockHealth: HealthModel = {
	emergencyContacts: [
		{ id: 'ec1', name: 'Erica Brothers', relation: 'Parent', phone: '(555) 123-9876', notes: 'Primary', shared: true },
		{ id: 'ec2', name: 'Coach Alex', relation: 'Coach', phone: '(555) 555-1212', notes: 'Use only for emergencies', shared: false },
	],
	allergies: [
		{ id: 'al1', name: 'Peanuts', severity: 'severe', shared: true },
		{ id: 'al2', name: 'Pollen', severity: 'moderate', shared: false },
	],
	conditions: [
		{ id: 'co1', name: 'Exercise-induced asthma', shared: true },
	],
	medications: [
		{ id: 'me1', name: 'Albuterol Inhaler', dosage: '2 puffs', schedule: 'PRN before activity', notes: 'Carry during games', shared: true },
	],
	bloodType: 'O+',
	medicalNotes: 'Concussion in 2023, fully cleared. Hydration reminders on hot days.',
};
