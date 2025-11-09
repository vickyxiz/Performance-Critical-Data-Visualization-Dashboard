"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import type { DataPoint, AggregationLevel } from '@/lib/types';

const CATEGORIES = ['A', 'B', 'C', 'D', 'E'];

const generateDataPoint = (time: number): DataPoint => ({
  timestamp: time,
  value: Math.random() * 100 + 50,
  value2: Math.random() * 50,
  category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
});

interface UseDataStreamProps {
  maxDataPoints?: number;
  updateInterval?: number;
}

export const useDataStream = ({
  maxDataPoints = 1000,
  updateInterval = 100,
}: UseDataStreamProps = {}) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialData: DataPoint[] = [];
    const now = Date.now();
    for (let i = 0; i < 50; i++) {
      initialData.push(generateDataPoint(now - (50 - i) * updateInterval));
    }
    setData(initialData);
  }, [updateInterval]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setData(currentData => {
          const now = Date.now();
          const newData = [...currentData, generateDataPoint(now)];
          if (newData.length > maxDataPoints) {
            return newData.slice(newData.length - maxDataPoints);
          }
          return newData;
        });
      }, updateInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, maxDataPoints, updateInterval]);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const toggle = useCallback(() => setIsRunning(prev => !prev), []);

  return { data, isRunning, start, stop, toggle };
};
