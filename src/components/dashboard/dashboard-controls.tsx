"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Play, Pause } from 'lucide-react';
import type { AggregationLevel } from '@/lib/types';

interface DashboardControlsProps {
  isRunning: boolean;
  toggleStream: () => void;
  maxPoints: number;
  setMaxPoints: (value: number) => void;
  aggregation: AggregationLevel;
  setAggregation: (value: AggregationLevel) => void;
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({
  isRunning,
  toggleStream,
  maxPoints,
  setMaxPoints,
  aggregation,
  setAggregation,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <div className="flex flex-col space-y-3">
        <Label>Data Stream</Label>
        <Button onClick={toggleStream} variant="outline" className="w-full md:w-32">
          {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
      </div>

      <div className="flex flex-col space-y-3">
        <Label htmlFor="max-points">Data Points: {maxPoints}</Label>
        <Slider
          id="max-points"
          min={100}
          max={10000}
          step={100}
          value={[maxPoints]}
          onValueChange={(value) => setMaxPoints(value[0])}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Label>Aggregation Level</Label>
        <RadioGroup
          value={aggregation}
          onValueChange={(value) => setAggregation(value as AggregationLevel)}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1s" id="1s" />
            <Label htmlFor="1s">1s</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5s" id="5s" />
            <Label htmlFor="5s">5s</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1m" id="1m" />
            <Label htmlFor="1m">1m</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
