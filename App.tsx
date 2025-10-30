import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from './components/SplashScreen';
import { GoalsProvider } from './contexts/goals';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'InterTight-Regular': require('./assets/fonts/InterTight-Regular.ttf'),
        'InterTight-Medium': require('./assets/fonts/InterTight-Medium.ttf'),
        'InterTight-SemiBold': require('./assets/fonts/InterTight-SemiBold.ttf'),
        'InterTight-Bold': require('./assets/fonts/InterTight-Bold.ttf'),
        'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Medium': require('./assets/fonts/Outfit-Medium.ttf'),
        'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
        'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
      });
      setFontsLoaded(true);
      
      // Show splash screen for at least 2 seconds
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded || showSplash) {
    return (
      <SafeAreaProvider>
        <SplashScreen />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <GoalsProvider>
        <AppNavigator />
      </GoalsProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
