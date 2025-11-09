"use client";

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DataPoint } from '@/lib/types';
import { format } from 'date-fns';

interface DataTableProps {
  data: DataPoint[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const reversedData = React.useMemo(() => [...data].reverse(), [data]);

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-card">
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Value 1</TableHead>
            <TableHead className="text-right">Value 2</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reversedData.map((point) => (
            <TableRow key={point.timestamp}>
              <TableCell>{format(new Date(point.timestamp), 'HH:mm:ss.SSS')}</TableCell>
              <TableCell className="text-right">{point.value.toFixed(2)}</TableCell>
              <TableCell className="text-right">{point.value2.toFixed(2)}</TableCell>
              <TableCell>{point.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
