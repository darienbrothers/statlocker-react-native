import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../utils/fonts';
import ProgressBar from '../../components/onboarding/ProgressBar';
import BackButton from '../../components/onboarding/BackButton';
import { useOnboarding } from '../../contexts/onboarding';
import { DNA_QUIZ_QUESTIONS } from '../../utils/goalsLibrary';

const TOTAL_STEPS = 13;
const QUIZ_STEPS = 5;

const AthleteDNAQuizScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { updateOnboardingData, onboardingData } = useOnboarding();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    onboardingData.athleteDNAAnswers || {}
  );
  const [showTip, setShowTip] = useState(false);

  const question = DNA_QUIZ_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUIZ_STEPS - 1;

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Save answers but don't navigate yet - wait for button press
      updateOnboardingData({ athleteDNAAnswers: newAnswers });
    } else {
      // Move to next question after brief delay
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handleReviewAthleteDNA = () => {
    // Navigate to results screen
    navigation.navigate('AthleteDNAResults' as never);
  };

  const quizProgress = ((currentQuestion + 1) / QUIZ_STEPS) * 100;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton />
        <ProgressBar currentStep={8} totalSteps={TOTAL_STEPS} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Let's find your AthleteDNA™</Text>
        <Text style={styles.subtitle}>So StatLocker can train like you.</Text>

        <View style={styles.quizProgress}>
          <View style={styles.quizProgressBar}>
            <View style={[styles.quizProgressFill, { width: `${quizProgress}%` }]} />
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>
            {currentQuestion + 1}. {question.question}
          </Text>

          {showTip && (
            <View style={styles.tipContainer}>
              <Ionicons name="information-circle" size={20} color="#4F46E5" />
              <Text style={styles.tipText}>
                Understanding your motivation helps us personalize your AI Coach's feedback and
                insights to match your unique training style.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.tipButton}
            onPress={() => setShowTip(!showTip)}
            activeOpacity={0.7}
          >
            <Ionicons name="help-circle-outline" size={16} color="#6B7280" />
            <Text style={styles.tipButtonText}>Why do we ask this?</Text>
          </TouchableOpacity>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = answers[question.id] === option;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => handleAnswerSelect(option)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {isLastQuestion && answers[question.id] && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={handleReviewAthleteDNA}
              activeOpacity={0.8}
            >
              <Text style={styles.reviewButtonText}>Review AthleteDNA</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  quizProgress: {
    marginBottom: 32,
  },
  quizProgressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  quizProgressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  questionContainer: {
    gap: 24,
  },
  questionNumber: {
    fontSize: 20,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#1D2333',
    marginBottom: 8,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  tipButtonText: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#F5F3FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    minHeight: 60,
    justifyContent: 'center',
  },
  optionCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },
  optionText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.regular,
    color: '#1D2333',
  },
  optionTextSelected: {
    color: '#4F46E5',
    fontFamily: Fonts.InterTight.semiBold,
  },
  reviewButton: {
    marginTop: 24,
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
});

export default AthleteDNAQuizScreen;

