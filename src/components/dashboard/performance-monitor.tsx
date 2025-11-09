"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Cpu, MemoryStick } from 'lucide-react';

export const PerformanceMonitor: React.FC = () => {
  const { fps, memory } = usePerformanceMonitor();
  
  const getFpsColor = () => {
    if (fps >= 55) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (fps >= 30) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };
  
  const getMemoryColor = () => {
    if (memory < 100) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (memory < 200) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="flex items-center space-x-4">
      <Badge variant="outline" className={`transition-colors duration-500 ${getFpsColor()}`}>
        <Cpu className="mr-2 h-4 w-4" />
        <span>{fps} FPS</span>
      </Badge>
      <Badge variant="outline" className={`transition-colors duration-500 ${getMemoryColor()}`}>
        <MemoryStick className="mr-2 h-4 w-4" />
        <span>{memory > 0 ? `${memory.toFixed(1)} MB` : 'N/A'}</span>
      </Badge>
    </div>
  );
};
