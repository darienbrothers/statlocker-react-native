import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAppVersion, getMockPlan, getMockUser } from '../utils/settingsMock';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem { name: string; icon: keyof typeof ionMap }

const ionMap = {
  school: 'school-outline',
  messages: 'chatbubbles-outline',
  profile: 'person-outline',
  settings: 'settings-outline',
} as const;

const menuItems: MenuItem[] = [
  { name: 'Recruiting', icon: 'school' },
  { name: 'Messages', icon: 'messages' },
  { name: 'Profile', icon: 'profile' },
  { name: 'Settings', icon: 'settings' },
];

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const navigation: any = useNavigation();
  const user = getMockUser();
  const plan = getMockPlan();
  const version = getAppVersion();
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.drawer}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileMeta}>{`${user.gradYear} • ${user.position}`}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate('Profile'); onClose(); }}>
                <Text style={styles.profileLink}>View Full Profile →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Subscription Badge */}
          <View style={styles.badgeRow}>
            <Text style={styles.badgeText}>{`${plan.planName} Plan${plan.renewalLabel ? ' — ' + plan.renewalLabel : ''}`}</Text>
          </View>

          {/* Navigation Groups */}
          <View style={{ marginTop: 16 }}>
            <Text style={styles.sectionLabel}>Team & Communication</Text>
            {menuItems.filter(m => m.name === 'Messages').map((item) => (
              <TouchableOpacity key={item.name} style={styles.menuItem} activeOpacity={0.7} onPress={() => { navigation.navigate('Messages'); onClose(); }}>
                <Ionicons name={ionMap[item.icon] as any} size={22} color="#6B7280" />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionLabel, { marginTop: 20 }]}>My Locker</Text>
            {menuItems.filter(m => m.name === 'Recruiting' || m.name === 'Profile').map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => { navigation.navigate(item.name); onClose(); }}
              >
                <Ionicons name={ionMap[item.icon] as any} size={22} color="#6B7280" />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Account & Settings</Text>
            {menuItems.filter(m => m.name === 'Settings').map((item) => (
              <TouchableOpacity key={item.name} style={styles.menuItem} activeOpacity={0.7} onPress={() => { navigation.navigate('Settings'); onClose(); }}>
                <Ionicons name={ionMap[item.icon] as any} size={22} color="#6B7280" />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.versionText}>{`${plan.planName} • ${version}`}</Text>
            <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8} onPress={() => { onClose(); }}>
              <Ionicons name="log-out-outline" size={18} color="#DC2626" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
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
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  profileMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  profileLink: {
    fontSize: 12,
    color: '#4F46E5',
    marginTop: 8,
    fontWeight: '600',
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
  sectionLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
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
  badgeRow: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  badgeText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  versionText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  signOutText: {
    marginLeft: 8,
    color: '#DC2626',
    fontWeight: '700',
  },
});

export default DrawerMenu;

