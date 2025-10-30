import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { Fonts } from '../utils/fonts';

interface TopNavBarProps {
  userName: string;
  notificationCount?: number;
  onMenuClick?: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ userName, notificationCount, onMenuClick }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={onMenuClick} style={styles.iconButton}>
          <Icon name="menu" size={28} color="#6B7280" />
        </TouchableOpacity>
        <Image 
          source={require('../assets/logo/statlockerLogo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back, {userName}!</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  right: {
    position: 'relative',
  },
  iconButton: {
    padding: 4,
  },
  logo: {
    height: 32,
    width: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2333',
    flex: 1,
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

