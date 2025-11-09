"use client";

import React from 'react';
import { format } from 'date-fns';
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { DataPoint } from '@/lib/types';

interface LineChartComponentProps {
  data: DataPoint[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <ChartContainer config={{
      value: { label: "Value 1", color: "hsl(var(--chart-1))" },
      value2: { label: "Value 2", color: "hsl(var(--chart-2))" },
    }} className="h-full w-full">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          cursor={{ stroke: 'hsl(var(--foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="value2"
          stroke="var(--color-value2)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default React.memo(LineChartComponent);
