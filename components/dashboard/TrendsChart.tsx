import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import CustomTooltip from '../layout/Tooltip';
import { getAQICategory, getAQIColor } from '@/lib/utils';
import { CityValue, TrendDataPoint } from '@/types';

export default function TrendsChart({
  selectedCity,
  currentAQI,
  chartData,
  minAQI,
  maxAQI,
}: {
  selectedCity: CityValue;
  currentAQI: number;
  chartData: TrendDataPoint[];
  minAQI: number;
  maxAQI: number;
}) {
  console.log('Chart data:', chartData);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {selectedCity.name} — 30-day PM2.5 Trend
          </h3>
          <p className="text-xs text-muted mt-0.5">{selectedCity.country}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-semibold"
            style={{
              backgroundColor: `${getAQIColor(currentAQI)}15`,
              color: getAQIColor(currentAQI),
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getAQIColor(currentAQI) }}
            />
            {getAQICategory(currentAQI)}
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6b7280', fontSize: 10 }}
              interval={3}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6b7280', fontSize: 10 }}
              domain={[0, (maxAQI + 3).toFixed(0)]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={50}
              stroke="rgba(16,217,122,0.15)"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={100}
              stroke="rgba(245,158,11,0.15)"
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              dataKey="pm25"
              stroke="#10d97a"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: '#10d97a',
                strokeWidth: 2,
                stroke: '#0a0a0a',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-0.5 bg-primary"
            style={{ borderTop: '1px dashed #10d97a40' }}
          />
          <span className="text-2xs text-muted">Good threshold (12)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-warning" />
          <span className="text-2xs text-muted">Moderate threshold (35)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-danger" />
          <span className="text-2xs text-muted">Unhealthy threshold (36+)</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-2xs text-muted">
            Min: <span className="text-foreground">{minAQI}</span>
          </span>
          <span className="text-2xs text-muted">
            Max: <span className="text-foreground">{maxAQI}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
