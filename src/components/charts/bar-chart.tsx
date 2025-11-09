"use client";

import React from 'react';
import { format } from 'date-fns';
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { DataPoint } from '@/lib/types';

interface BarChartComponentProps {
  data: DataPoint[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ChartContainer config={{
      value: { label: "Value", color: "hsl(var(--chart-1))" },
    }} className="h-full w-full">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(time) => format(new Date(time), 'HH:mm:ss')}
          type="number"
          domain={['dataMin', 'dataMax']}
        />
        <YAxis />
        <Tooltip
          content={<ChartTooltipContent />}
          cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
        />
        <Bar dataKey="value" fill="var(--color-value)" isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  );
};

export default React.memo(BarChartComponent);
