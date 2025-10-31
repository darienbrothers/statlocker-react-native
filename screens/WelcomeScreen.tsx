import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '../utils/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface WelcomeSlide {
  id: string;
  title: string;
  tagline: string;
}

interface WelcomeScreenProps {
  navigation: any;
}

const slides: WelcomeSlide[] = [
  {
    id: '1',
    title: 'Welcome to StatLocker',
    tagline: 'Track Faster. Improve Smarter.',
  },
  {
    id: '2',
    title: 'Track Every Stat',
    tagline: 'Every rep counts. Log games with position-specific stats that matter.',
  },
  {
    id: '3',
    title: 'AI That Gets You',
    tagline: 'Turn data into dominance. Your AI Coach learns and guides.',
  },
  {
    id: '4',
    title: 'Goals & Skills',
    tagline: 'See trends, set targets, and train smarter with recommended drills.',
  },
  {
    id: '5',
    title: 'Get Recruited',
    tagline: 'Build your profile and connect with college programs.',
  },
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleGetStarted = () => {
    navigation.navigate('NameCollection');
  };

  const handleLogIn = () => {
    // Mock: Navigate directly to Dashboard
    navigation.replace('MainTabs');
  };

  const renderSlide = ({ item }: { item: WelcomeSlide }) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        {/* Logo/Branding Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo/statlockerLogoBlack.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Header and Tagline */}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeHeader}>{item.title}</Text>
          <Text style={styles.tagline}>{item.tagline}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.authContainer}>
          <Text style={styles.authText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogIn} activeOpacity={0.7}>
            <Text style={styles.authLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 48,
  },
  logo: {
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: 'center',
  },
  welcomeHeader: {
    fontSize: 18,
    fontFamily: Fonts.InterTight.medium,
    color: '#6B7280',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 28,
    fontFamily: Fonts.Outfit.semiBold,
    color: '#1D2333',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
    paddingHorizontal: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#4F46E5',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
    paddingBottom: 24,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#FFFFFF',
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authText: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.regular,
    color: '#6B7280',
  },
  authLink: {
    fontSize: 14,
    fontFamily: Fonts.InterTight.semiBold,
    color: '#4F46E5',
  },
});

export default WelcomeScreen;

