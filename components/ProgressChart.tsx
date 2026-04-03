'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface DataPoint {
  date: string;
  words: number;
  reviews: number;
}

interface ProgressChartProps {
  data: DataPoint[];
}

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="words" stroke="#dc2626" name="Words Learned" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="reviews" stroke="#f59e0b" name="Reviews" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
