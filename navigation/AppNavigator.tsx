import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import StatsScreen from '../screens/StatsScreen';
import AiCoachScreen from '../screens/AiCoachScreen';
import SkillsScreen from '../screens/SkillsScreen';
import GoalsScreen from '../screens/GoalsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            borderTopWidth: 1,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          options={{
            tabBarLabel: 'Locker',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        >
          {() => <DashboardScreen onGameSelect={() => {}} onMenuClick={() => {}} />}
        </Tab.Screen>
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons 
                name="bar-chart-outline" 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tab.Screen
          name="AI Coach"
          component={AiCoachScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons 
                name="sparkles-outline" 
                size={size} 
                color={color} 
              />
            ),
            tabBarLabel: 'AI',
          }}
        />
        <Tab.Screen
          name="Skills"
          component={SkillsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons 
                name="barbell-outline" 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tab.Screen
          name="Goals"
          component={GoalsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "trophy" : "trophy-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
