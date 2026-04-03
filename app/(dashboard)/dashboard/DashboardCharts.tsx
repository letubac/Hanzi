'use client';
import ProgressChart from '@/components/ProgressChart';

interface DataPoint {
  date: string;
  words: number;
  reviews: number;
}

export default function DashboardCharts({ data }: { data: DataPoint[] }) {
  return <ProgressChart data={data} />;
}
