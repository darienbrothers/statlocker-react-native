import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './Icon';

interface FabProps {
  onClick: () => void;
}

const Fab: React.FC<FabProps> = ({ onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.fab}
      activeOpacity={0.8}
      accessibilityLabel="Log Game"
    >
      <Icon name="plus" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    width: 56,
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default Fab;

