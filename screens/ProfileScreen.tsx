import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import HealthSection from '../components/profile/HealthSection';
import { mockHealth } from '../utils/mockProfile';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<TopNavBar firstName="Erica" />
			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.title}>Profile</Text>
					<Text style={styles.subtitle}>Your Stats. Your Story. Your Future.</Text>
				</View>
				<HealthSection health={mockHealth} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7F7F9',
	},
	scrollContent: {
		padding: 16,
	},
	header: {
		marginBottom: 16,
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
});
