import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  rightElement?: React.ReactNode;
};

const SectionHeader: React.FC<Props> = ({ title, actionText, onActionClick, rightElement }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#1D2333', fontFamily: 'Outfit-SemiBold' }}>{title}</Text>
      {rightElement ? (
        <View>{rightElement}</View>
      ) : actionText && onActionClick ? (
        <TouchableOpacity onPress={onActionClick}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#4F46E5' }}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;


