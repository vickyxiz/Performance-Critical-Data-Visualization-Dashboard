"use client"

import { useState, useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrameId = useRef<number>(0);
  const memoryIntervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loop = () => {
      frameCount.current++;
      const now = performance.now();
      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = now;
      }
      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    
    // Check for memory performance API
    const performanceWithMemory = performance as Performance & { memory?: { usedJSHeapSize: number } };
    
    if (performanceWithMemory.memory) {
      memoryIntervalId.current = setInterval(() => {
        setMemory(performanceWithMemory.memory!.usedJSHeapSize / (1024 * 1024));
      }, 1000);
    }

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      if (memoryIntervalId.current) {
        clearInterval(memoryIntervalId.current);
      }
    };
  }, []);

  return { fps, memory };
};
