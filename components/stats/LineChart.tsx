import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CartesianChart, Line } from 'victory-native';

interface ChartData extends Record<string, unknown> {
  name: string;
  value: number;
}

interface LineChartProps {
  data: ChartData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
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
        {({ points }) => (
          <Line
            points={points.value}
            color="#4F46E5"
            strokeWidth={3}
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

export default LineChart;
