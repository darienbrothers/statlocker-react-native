import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from './Icon';

interface HeroCardProps {
  userName: string;
  avatarUrl: string | null;
  onAvatarChange: (url: string) => void;
  sport: string;
  position: string;
  gradYear: string;
  selectedTeam: 'High School' | 'Club';
  hsName: string;
  hsCityState: string;
  clubName: string;
  clubCityState: string;
  savePercentage: number;
  totalSaves: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
}

const Stat: React.FC<{ value: string | number; label: string }> = ({ value, label }) => (
  <View style={styles.statContainer}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HeroCard: React.FC<HeroCardProps> = ({
  userName,
  avatarUrl,
  onAvatarChange,
  sport,
  position,
  gradYear,
  selectedTeam,
  hsName,
  hsCityState,
  clubName,
  clubCityState,
  savePercentage,
  totalSaves,
  gamesPlayed,
  wins,
  losses,
}) => {
  const teamInfo = selectedTeam === 'High School' 
    ? { name: hsName, location: hsCityState } 
    : { name: clubName, location: clubCityState };

  const handleAvatarClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      onAvatarChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={handleAvatarClick}
            style={styles.avatarContainer}
            activeOpacity={0.8}
          >
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <Icon name="user" size={32} color="#4F46E5" />
            )}
          </TouchableOpacity>
          
          <View style={styles.info}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.details}>{sport} | Class of {gradYear} | {position}</Text>
            <View style={styles.location}>
              <Icon name="location" size={16} color="#6B7280" />
              <View style={styles.locationText}>
                <Text style={styles.teamName}>{teamInfo.name}</Text>
                <Text style={styles.teamLocation}>{teamInfo.location}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.stats}>
        <Stat value={wins} label="Wins" />
        <Stat value={losses} label="Losses" />
        <Stat value={`${savePercentage}%`} label="Save %" />
        <Stat value={totalSaves} label="Saves" />
        <Stat value={gamesPlayed} label="Games" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    padding: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
  },
  info: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D2333',
  },
  details: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 2,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    marginLeft: 6,
  },
  teamName: {
    fontWeight: '600',
    color: '#1D2333',
    fontSize: 14,
  },
  teamLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: -2,
  },
  settingsButton: {
    padding: 4,
  },
  stats: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default HeroCard;

