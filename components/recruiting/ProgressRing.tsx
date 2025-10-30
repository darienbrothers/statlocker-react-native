import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  size?: number;
  stroke?: number;
  percent: number; // 0..100
};

export default function ProgressRing({ size = 44, stroke = 6, percent }: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#6366F1"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          originX={size / 2}
          originY={size / 2}
          rotation={-90}
        />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-[12px] font-intertight-semibold text-ink-title">{Math.round(percent)}%</Text>
      </View>
    </View>
  );
}


