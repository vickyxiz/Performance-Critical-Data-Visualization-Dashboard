"use client";

import React from 'react';
import { Scatter, ScatterChart, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { DataPoint } from '@/lib/types';

interface ScatterChartComponentProps {
  data: DataPoint[];
}

const ScatterChartComponent: React.FC<ScatterChartComponentProps> = ({ data }) => {
  return (
    <ChartContainer config={{
      value: { label: "Value 1", color: "hsl(var(--chart-1))" },
      value2: { label: "Value 2", color: "hsl(var(--chart-2))" },
    }} className="h-full w-full">
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="value" type="number" name="Value 1" unit="" />
        <YAxis dataKey="value2" type="number" name="Value 2" unit="" />
        <ZAxis dataKey="timestamp" type="number" range={[60, 400]} name="timestamp" unit="ms" />
        <Tooltip
          content={<ChartTooltipContent />}
          cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        <Legend />
        <Scatter name="Data Distribution" data={data} fill="var(--color-value)" isAnimationActive={false} />
      </ScatterChart>
    </ChartContainer>
  );
};

export default React.memo(ScatterChartComponent);
