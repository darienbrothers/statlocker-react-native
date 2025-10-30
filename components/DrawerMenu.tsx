import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import type { IconName } from '../types';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  icon: IconName;
}

const menuItems: MenuItem[] = [
  { name: 'Recruiting', icon: 'recruiting' },
  { name: 'Messaging', icon: 'messaging' },
  { name: 'Profile', icon: 'profile' },
  { name: 'Settings', icon: 'settings' },
];

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>StatLocker</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.menu}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.name} style={styles.menuItem} activeOpacity={0.7}>
                <Icon name={item.icon} size={24} color="#6B7280" />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: '80%',
    maxWidth: 300,
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2333',
  },
  closeButton: {
    padding: 8,
  },
  menu: {
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2333',
    marginLeft: 16,
  },
});

export default DrawerMenu;

