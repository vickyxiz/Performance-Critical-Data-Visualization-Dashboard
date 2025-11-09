"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataStream } from '@/hooks/useDataStream';
import type { DataPoint, AggregationLevel, ChartType } from '@/lib/types';
import { PerformanceMonitor } from './performance-monitor';
import { DashboardControls } from './dashboard-controls';
import { DataTable } from './data-table';
import LineChartComponent from '@/components/charts/line-chart';
import BarChartComponent from '@/components/charts/bar-chart';
import ScatterChartComponent from '@/components/charts/scatter-chart';

const aggregateData = (data: DataPoint[], level: AggregationLevel): DataPoint[] => {
  if (level === 'none' || data.length === 0) {
    return data;
  }

  const groupToMs = {
    '1s': 1000,
    '5s': 5000,
    '1m': 60000,
  };
  const ms = groupToMs[level];
  const grouped: { [key: number]: { sum: number; sum2: number; count: number; category: { [key: string]: number } } } = {};

  data.forEach(dp => {
    const groupKey = Math.floor(dp.timestamp / ms) * ms;
    if (!grouped[groupKey]) {
      grouped[groupKey] = { sum: 0, sum2: 0, count: 0, category: {} };
    }
    grouped[groupKey].sum += dp.value;
    grouped[groupKey].sum2 += dp.value2;
    grouped[groupKey].count++;
    grouped[groupKey].category[dp.category] = (grouped[groupKey].category[dp.category] || 0) + 1;
  });

  return Object.entries(grouped).map(([timestamp, values]) => {
    const mostFrequentCategory = Object.keys(values.category).reduce((a, b) => values.category[a] > values.category[b] ? a : b);
    return {
      timestamp: parseInt(timestamp, 10),
      value: values.sum / values.count,
      value2: values.sum2 / values.count,
      category: mostFrequentCategory,
    };
  });
};

const Dashboard: React.FC = () => {
  const [maxPoints, setMaxPoints] = useState(1000);
  const [aggregation, setAggregation] = useState<AggregationLevel>('none');
  const [activeChart, setActiveChart] = useState<ChartType>('line');
  const { data: rawData, isRunning, toggle: toggleStream } = useDataStream({ maxDataPoints: maxPoints });

  const data = useMemo(() => aggregateData(rawData, aggregation), [rawData, aggregation]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-8 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight">DataStream Dashboard</h1>
        </div>
        <PerformanceMonitor />
      </header>

      <main className="flex-grow p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 flex flex-col space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Visualization Controls</CardTitle>
              <CardDescription>Adjust data stream and visualization parameters.</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardControls
                isRunning={isRunning}
                toggleStream={toggleStream}
                maxPoints={maxPoints}
                setMaxPoints={setMaxPoints}
                aggregation={aggregation}
                setAggregation={setAggregation}
              />
            </CardContent>
          </Card>
          
          <Tabs value={activeChart} onValueChange={(value) => setActiveChart(value as ChartType)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/60">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="scatter">Scatter Plot</TabsTrigger>
            </TabsList>
            <TabsContent value="line">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Real-time Line Chart</CardTitle>
                  <CardDescription>Streaming data over time.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] w-full p-0">
                   <LineChartComponent data={data} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bar">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Real-time Bar Chart</CardTitle>
                  <CardDescription>Comparing values at points in time.</CardDescription>
                </CardHeader>
                 <CardContent className="h-[400px] w-full p-0">
                   <BarChartComponent data={data} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scatter">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Real-time Scatter Plot</CardTitle>
                  <CardDescription>Distribution of data points.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] w-full p-0">
                   <ScatterChartComponent data={data} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="shadow-lg">
             <CardHeader>
              <CardTitle>Raw Data Table</CardTitle>
              <CardDescription>The most recent {rawData.length} data points from the stream.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={rawData} />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
