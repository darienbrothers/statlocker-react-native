import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CartesianChart, Bar } from 'victory-native';

interface ChartData extends Record<string, unknown> {
  name: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <CartesianChart
        data={data}
        xKey="name"
        yKeys={['value']}
        padding={{ left: 50, right: 20, top: 20, bottom: 40 }}
        axisOptions={{
          labelColor: '#6B7280',
          lineColor: 'transparent',
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.value}
            chartBounds={chartBounds}
            color="#818CF8"
            roundedCorners={{ topLeft: 4, topRight: 4 }}
            animate={{ type: 'timing', duration: 1000 }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});

export default BarChart;
