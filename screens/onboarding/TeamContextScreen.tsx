import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';

const TOTAL_STEPS = 13;

// Generate graduation years (2026-2032 with grade labels)
const GRADUATION_YEARS = [
  { year: '2026', label: '2026 (Senior)' },
  { year: '2027', label: '2027 (Junior)' },
  { year: '2028', label: '2028 (Sophomore)' },
  { year: '2029', label: '2029 (Freshman)' },
  { year: '2030', label: '2030 (8th Grade)' },
  { year: '2031', label: '2031 (7th Grade)' },
  { year: '2032', label: '2032 (6th Grade)' },
];

const LEVELS = ['Freshman', 'Junior Varsity', 'Varsity'];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const TeamContextScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { updateOnboardingData, onboardingData } = useOnboarding();
  
  const [highSchool, setHighSchool] = useState(onboardingData.highSchool || '');
  const [city, setCity] = useState(onboardingData.city || '');
  const [state, setState] = useState(onboardingData.state || '');
  const [graduationYear, setGraduationYear] = useState(onboardingData.graduationYear || '');
  const [level, setLevel] = useState<'Freshman' | 'Junior Varsity' | 'Varsity' | ''>(
    (onboardingData.level as 'Freshman' | 'Junior Varsity' | 'Varsity') || ''
  );
  const [hasClubTeam, setHasClubTeam] = useState(onboardingData.hasClubTeam || false);
  const [clubOrganization, setClubOrganization] = useState(onboardingData.clubOrganization || '');
  const [clubTeamName, setClubTeamName] = useState(onboardingData.clubTeamName || '');
  const [clubCity, setClubCity] = useState(onboardingData.clubCity || '');
  const [clubState, setClubState] = useState(onboardingData.clubState || '');
  const [showGradYearModal, setShowGradYearModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showClubStateModal, setShowClubStateModal] = useState(false);

  const handleContinue = () => {
    if (!highSchool || !city || !state || !graduationYear || !level) return;
    
    updateOnboardingData({
      highSchool,
      city,
      state,
      graduationYear,
      level,
      hasClubTeam,
      clubOrganization: hasClubTeam ? clubOrganization : undefined,
      clubTeamName: hasClubTeam ? clubTeamName : undefined,
      clubCity: hasClubTeam ? clubCity : undefined,
      clubState: hasClubTeam ? clubState : undefined,
    });
    
    navigation.navigate('SeasonGoals' as never);
  };

  const isFormValid = highSchool && city && state && graduationYear && level;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <BackButton />
        <ProgressBar currentStep={5} totalSteps={TOTAL_STEPS} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Where do you play?</Text>
        <Text style={styles.subtitle}>Let's get your team context.</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>High School *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Northwood High"
              placeholderTextColor="#9CA3AF"
              value={highSchool}
              onChangeText={setHighSchool}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Irvine"
                placeholderTextColor="#9CA3AF"
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
              />
            </View>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>State *</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowStateModal(true)}
              >
                <Text style={[styles.inputText, !state && styles.placeholder]}>
                  {state || 'Select State'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Graduation Year *</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowGradYearModal(true)}
            >
              <Text style={[styles.inputText, !graduationYear && styles.placeholder]}>
                {graduationYear
                  ? GRADUATION_YEARS.find((y) => y.year === graduationYear)?.label || graduationYear
                  : 'Select Year'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Level *</Text>
            <View style={styles.levelContainer}>
              {LEVELS.map((lvl) => (
                <TouchableOpacity
                  key={lvl}
                  style={[
                    styles.levelButton,
                    level === lvl && styles.levelButtonSelected,
                  ]}
                  onPress={() => setLevel(lvl as 'Freshman' | 'Junior Varsity' | 'Varsity')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.levelButtonText,
                      level === lvl && styles.levelButtonTextSelected,
                    ]}
                  >
                    {lvl}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setHasClubTeam(!hasClubTeam)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, hasClubTeam && styles.checkboxChecked]}>
              {hasClubTeam && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>I also play for a Club team</Text>
          </TouchableOpacity>

          {hasClubTeam && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Club Organization</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Mass Elite"
                  placeholderTextColor="#9CA3AF"
                  value={clubOrganization}
                  onChangeText={setClubOrganization}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Team Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 2027 Red"
                  placeholderTextColor="#9CA3AF"
                  value={clubTeamName}
                  onChangeText={setClubTeamName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>City</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Weymouth"
                    placeholderTextColor="#9CA3AF"
                    value={clubCity}
                    onChangeText={setClubCity}
                    autoCapitalize="words"
                  />
                </View>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>State</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowClubStateModal(true)}
                  >
                    <Text style={[styles.inputText, !clubState && styles.placeholder]}>
                      {clubState || 'Select State'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity
          style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showGradYearModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowGradYearModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Year</Text>
              <TouchableOpacity onPress={() => setShowGradYearModal(false)}>
                <Ionicons name="close" size={24} color="#1D2333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={GRADUATION_YEARS}
              keyExtractor={(item) => item.year}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    graduationYear === item.year && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setGraduationYear(item.year);
                    setShowGradYearModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      graduationYear === item.year && styles.modalItemTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {graduationYear === item.year && (
                    <Ionicons name="checkmark" size={20} color="#4F46E5" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* State Selection Modal */}
      <Modal
        visible={showStateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)}>
                <Ionicons name="close" size={24} color="#1D2333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={US_STATES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    state === item && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setState(item);
                    setShowStateModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      state === item && styles.modalItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {state === item && (
                    <Ionicons name="checkmark" size={20} color="#4F46E5" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Club State Selection Modal */}
      <Modal
        visible={showClubStateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowClubStateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowClubStateModal(false)}>
                <Ionicons name="close" size={24} color="#1D2333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={US_STATES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    clubState === item && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setClubState(item);
                    setShowClubStateModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      clubState === item && styles.modalItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {clubState === item && (
                    <Ionicons name="checkmark" size={20} color="#4F46E5" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.medium,
    color: '#1D2333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    flex: 1,
  },
  placeholder: {
    color: '#9CA3AF',
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  levelButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  levelButtonSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  levelButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#6B7280',
  },
  levelButtonTextSelected: {
    color: '#4F46E5',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '50%',
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalItemSelected: {
    backgroundColor: '#F5F3FF',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
  },
  modalItemTextSelected: {
    color: '#4F46E5',
    fontFamily: Fonts.InterTight.semiBold,
  },
});

export default TeamContextScreen;

