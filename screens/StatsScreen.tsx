import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import TopNavBar from '../components/TopNavBar';
import FilterBar from '../components/stats/FilterBar';
import AiCalloutCard from '../components/stats/AiCalloutCard';
import ChartCard from '../components/stats/ChartCard';
import LineChart from '../components/stats/LineChart';
import BarChart from '../components/stats/BarChart';
import PositionMetricsGrid from '../components/stats/PositionMetricsGrid';
import AiInsightsCarousel from '../components/stats/AiInsightsCarousel';
import ExportModal from '../components/stats/ExportModal';
import ComparisonToggle from '../components/stats/ComparisonToggle';
import Fab from '../components/Fab';
import { Icon } from '../components/Icon';
import type { TimeRange, Position } from '../types';
import { getChartDataForMetric, generateAIInsights } from '../utils/mockStatsData';
import { mockGames } from '../utils/mockStatsData';

const StatsScreen: React.FC = () => {
  const position: Position = 'Goalie'; // Hardcoded for demo
  const [timeRange, setTimeRange] = useState<TimeRange>('Last 30 Days');
  const [selectedTeam, setSelectedTeam] = useState<'High School' | 'Club'>('High School');
  const [isExportModalVisible, setExportModalVisible] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<'My Stats' | 'Team Avg'>('My Stats');

  const insights = generateAIInsights(position);
  const savePercentageData = getChartDataForMetric('save_pct', position);
  const gaaData = getChartDataForMetric('gaa', position);
  const clearPctData = getChartDataForMetric('clear_pct', position);

  const latestSavePct = savePercentageData[savePercentageData.length - 1]?.value || 0;
  const hasEnoughGames = mockGames.length >= 3;

  return (
    <View style={styles.container}>
      <TopNavBar firstName="Erica" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>My Stats</Text>
          <Text style={styles.subtitle}>Performance analysis for {selectedTeam === 'High School' ? 'Duxbury High School' : 'Mass Elite'}</Text>
        </View>

        <View style={styles.content}>
          <FilterBar
            timeRangeOptions={['Last 7 Days', 'Last 30 Days', 'Season']}
            selectedTimeRange={timeRange}
            onTimeRangeSelect={setTimeRange}
            selectedTeam={selectedTeam}
            onTeamChange={setSelectedTeam}
            onFilterPress={() => {}}
            onSharePress={() => setExportModalVisible(true)}
          />
        </View>

        <View style={styles.content}>
          {insights.length > 0 ? (
            <AiCalloutCard insight={insights[0]} onViewBreakdown={() => {}} />
          ) : (
            <AiCalloutCard empty={true} />
          )}
        </View>

        {hasEnoughGames && insights.length > 1 && (
          <View style={styles.content}>
            <AiInsightsCarousel
              insights={insights.slice(1)}
              onInsightPress={() => {}}
              onDrillPress={() => {}}
              onGoalPress={() => {}}
            />
          </View>
        )}

        <View style={styles.content}>
          <PositionMetricsGrid position={position} onMetricPress={(metricId) => {}} />
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Visual Analytics</Text>
            <ComparisonToggle
              mode={comparisonMode}
              onModeChange={setComparisonMode}
              disabled={comparisonMode === 'Team Avg'}
            />
          </View>

          <ChartCard title="Save Percentage" currentStat={`${latestSavePct.toFixed(1)}%`} statChange="+9% Last 30d">
            <LineChart data={savePercentageData} />
          </ChartCard>

          <ChartCard title="Goals Against Avg" currentStat="2.2" statChange="-0.4 Last 30d">
            <BarChart data={gaaData} />
          </ChartCard>

          <ChartCard title="Clear Percentage" currentStat="83.5%" statChange="+5% Last 30d">
            <LineChart data={clearPctData} />
          </ChartCard>
        </View>
      </ScrollView>

      <Fab onClick={() => {}} />

      <ExportModal
        visible={isExportModalVisible}
        onClose={() => setExportModalVisible(false)}
        onExport={(format, timeRange, team) => {
          console.log('Export requested:', { format, timeRange, team });
        }}
      />
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
    fontFamily: 'Outfit-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'InterTight-Regular',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D2333',
    fontFamily: 'Outfit-SemiBold',
  },
});

export default StatsScreen;

