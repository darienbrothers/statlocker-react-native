import React from 'react';
import { View, Text } from 'react-native';

type SharePillProps = {
	shared?: boolean;
};

export default function SharePill({ shared }: SharePillProps) {
	const bg = shared ? 'bg-brand-primary/10' : 'bg-slate-100';
	const color = shared ? 'text-brand-primary' : 'text-slate-600';
	const label = shared ? 'Shared with coach' : 'Private';
	return (
		<View className={`px-2 py-1 rounded-full ${bg}`}>
			<Text className={`text-[12px] font-medium ${color}`}>{label}</Text>
		</View>
	);
}
