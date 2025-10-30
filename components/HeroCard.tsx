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
  onTeamSelect: (team: 'High School' | 'Club') => void;
  hsName: string;
  hsCityState: string;
  clubName: string;
  clubCityState: string;
  savePercentage: number;
  totalSaves: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  isVerified?: boolean;
}

const StatBox: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const InfoBox: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{label}</Text>
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
  onTeamSelect,
  hsName,
  hsCityState,
  clubName,
  clubCityState,
  savePercentage,
  totalSaves,
  gamesPlayed,
  wins,
  losses,
  isVerified = true,
}) => {
  const teamLocation = selectedTeam === 'High School' ? hsCityState.split(' | ')[0] + ', ' + hsCityState.split(' | ')[1] : clubCityState.split(' | ')[0] + ', ' + clubCityState.split(' | ')[1];

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
      <View style={styles.contentContainer}>
        {/* Left Section - Avatar */}
        <View style={styles.leftSection}>
          <TouchableOpacity
            onPress={handleAvatarClick}
            style={styles.avatarContainer}
            activeOpacity={0.8}
          >
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="user" size={56} color="#9CA3AF" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Right Section - Player Info */}
        <View style={styles.rightSection}>
          {/* Name with Verified Badge and Sport Tag */}
          <View style={styles.nameRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{userName}</Text>
              {isVerified && (
                <View style={styles.verifiedBadge}>
                  <Icon name="check" size={12} color="#FFFFFF" />
                </View>
              )}
            </View>
            <View style={styles.sportTag}>
              <Text style={styles.sportTagText}>{sport.toLowerCase()}</Text>
            </View>
          </View>

          {/* Class & Position */}
          <Text style={styles.classPosition}>Class of {gradYear} • {position}</Text>

          {/* Key Stats - Record, Total Saves, Games Played */}
          <View style={styles.statsRow}>
            <StatBox value={`${wins}-${losses}`} label="RECORD" />
            <StatBox value={totalSaves.toString()} label="SAVES" />
            <StatBox value={gamesPlayed.toString()} label="GAMES" />
          </View>

          {/* Team & Location */}
          <View style={styles.infoRow}>
            <InfoBox value={selectedTeam === 'High School' ? hsName : clubName} label={selectedTeam === 'High School' ? 'HIGH SCHOOL' : 'CLUB'} />
            <InfoBox value={teamLocation} label="HOMETOWN" />
          </View>

          {/* Team Toggle - Pill Segmented HS | Club */}
          <View style={styles.pillToggleContainer}>
            <TouchableOpacity
              style={[styles.pillSegment, selectedTeam === 'High School' && styles.pillSegmentActive, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
              onPress={() => onTeamSelect('High School')}
              activeOpacity={0.85}
            >
              <Text style={[styles.pillText, selectedTeam === 'High School' && styles.pillTextActive]}>HS</Text>
            </TouchableOpacity>
            <View style={styles.pillDivider} />
            <TouchableOpacity
              style={[styles.pillSegment, selectedTeam === 'Club' && styles.pillSegmentActive, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
              onPress={() => onTeamSelect('Club')}
              activeOpacity={0.85}
            >
              <Text style={[styles.pillText, selectedTeam === 'Club' && styles.pillTextActive]}>Club</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  leftSection: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  rightSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginRight: 6,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4FC3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportTag: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sportTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
  classPosition: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '400',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    marginRight: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoBox: {
    flex: 1,
    marginRight: 16,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pillToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  pillSegment: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  pillSegmentActive: {
    backgroundColor: '#4F46E5',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  pillDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
});

export default HeroCard;
