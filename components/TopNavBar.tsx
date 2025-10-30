import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { Fonts } from '../utils/fonts';

interface TopNavBarProps {
  firstName: string;
  notificationCount?: number;
  onMenuClick?: () => void;
  onCalendarClick?: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ firstName, notificationCount, onMenuClick, onCalendarClick }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      <TouchableOpacity onPress={onMenuClick} style={styles.iconButton}>
        <Icon name="menu" size={28} color="#6B7280" />
      </TouchableOpacity>
      
      <View style={styles.center}>
        <Text style={styles.title}>{firstName}'s Locker</Text>
      </View>
      
      <View style={styles.right}>
        <TouchableOpacity onPress={onCalendarClick} style={styles.iconButton}>
          <Icon name="calendar" size={28} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.bellButton]}>
          <Icon name="bell" size={28} color="#6B7280" />
          {notificationCount && notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F7F7F9',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  bellButton: {
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
    fontFamily: Fonts.Outfit.semiBold,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default TopNavBar;
