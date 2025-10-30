import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import FilterBar from '../components/stats/FilterBar';
import AiCalloutCard from '../components/stats/AiCalloutCard';
import ChartCard from '../components/stats/ChartCard';
import LineChart from '../components/stats/LineChart';
import BarChart from '../components/stats/BarChart';

const mockSavePercentageData = [
  { name: 'Mar 1', value: 75 },
  { name: 'Mar 8', value: 88 },
  { name: 'Mar 12', value: 72 },
  { name: 'Mar 15', value: 85 },
  { name: 'Mar 22', value: 81 },
];

const mockGoalsAllowedData = [
  { name: 'vs. East', value: 3 },
  { name: 'vs. West', value: 2 },
  { name: 'vs. North', value: 3 },
  { name: 'vs. South', value: 1 },
  { name: 'vs. Central', value: 2 },
];

const StatsScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <View style={styles.container}>
      <TopNavBar userName="Alex" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>My Stats</Text>
          <Text style={styles.subtitle}>Performance analysis for Duxbury High School</Text>
        </View>

        <View style={styles.content}>
          <FilterBar
            options={['Last 7 Days', 'Last 30 Days', 'Season']}
            selected={timeRange}
            onSelect={setTimeRange}
          />
        </View>

        <View style={styles.content}>
          <AiCalloutCard
            title="Trending Up"
            description="Your save percentage has increased by 9% over the last 30 days. Keep up the great work!"
            icon="stats"
          />
        </View>

        <View style={styles.content}>
          <ChartCard title="Save Percentage" currentStat="81.3%" statChange="+9% Last 30d">
            <LineChart data={mockSavePercentageData} />
          </ChartCard>
          <ChartCard title="Goals Allowed / Game" currentStat="2.2" statChange="-0.4 Last 30d">
            <BarChart data={mockGoalsAllowedData} />
          </ChartCard>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D2333',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default StatsScreen;

