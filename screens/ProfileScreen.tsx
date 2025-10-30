import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import HealthSection from '../components/profile/HealthSection';
import { mockHealth } from '../utils/mockProfile';

export default function ProfileScreen() {
	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<View style={{ marginBottom: 16 }}>
				<Text className="font-outfit-bold text-2xl text-ink-title">Profile</Text>
				<Text className="text-ink-subtle mt-1">Your Stats. Your Story. Your Future.</Text>
			</View>
			<HealthSection health={mockHealth} />
		</ScrollView>
	);
}
