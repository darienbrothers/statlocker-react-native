import React from 'react';
import { View, Text } from 'react-native';
import SharePill from './SharePill';
import { EmergencyContact } from './HealthSection';

export default function EmergencyContactsList({ contacts }: { contacts: EmergencyContact[] }) {
	return (
		<View>
			<Text className="text-ink-title font-intertight-semibold mb-2">Emergency Contacts</Text>
			{contacts && contacts.length > 0 ? (
				contacts.map((c) => (
					<View key={c.id} className="border border-slate-200 rounded-xl p-3 mb-2">
						<View className="flex-row justify-between items-center">
							<Text className="text-[15px] font-intertight-semibold text-ink-title">{c.name}</Text>
							<SharePill shared={c.shared} />
						</View>
						<Text className="text-[13px] text-ink-subtle mt-1">{c.relation} • {c.phone}</Text>
						{c.notes ? <Text className="text-[13px] text-slate-500 mt-1">{c.notes}</Text> : null}
					</View>
				))
			) : (
				<Text className="text-[13px] text-slate-500">Add an emergency contact to keep coaches prepared.</Text>
			)}
		</View>
	);
}
