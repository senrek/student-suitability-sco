
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface ProgressChartProps {
  progress: number;
  size?: number;
  thickness?: number;
  className?: string;
  label?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  progress,
  size = 120,
  thickness = 12,
  className,
  label,
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Create data for pie chart
  const data = [
    { name: 'Progress', value: normalizedProgress },
    { name: 'Remaining', value: 100 - normalizedProgress },
  ];

  const renderLabel = () => {
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-foreground text-lg font-semibold"
      >
        {normalizedProgress}%
      </text>
    );
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size / 2 - thickness}
              outerRadius={size / 2}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
              label={renderLabel}
              labelLine={false}
            >
              <Cell fill="hsl(var(--primary))" />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {label && (
        <span className="mt-2 text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
};

export default ProgressChart;
