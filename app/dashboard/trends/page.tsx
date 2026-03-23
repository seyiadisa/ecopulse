'use client';

import { useMemo, useState } from 'react';

import TrendsChart from '@/components/dashboard/TrendsChart';
import { CityKey, TrendDataPoint } from '@/types';
import { getAQIColor } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { cities } from '@/lib/data';

export default function TrendsPage() {
  const [selectedCityId, setSelectedCityId] = useState<CityKey>('lagos');

  const { data: trendData, isFetching: isTrendLoading } = useQuery({
    queryKey: ['cityTrend', selectedCityId],
    queryFn: async () => {
      const res = await fetch(
        `/api/air-quality/trends?openaqId=${cities[selectedCityId].openaqId}`
      );
      if (!res.ok) throw new Error('Failed to fetch trend data');
      const data = await res.json();

      return data as {
        value: number;
        coverage: { datetimeFrom: { utc: string } };
      }[];
    },
  });

  const selectedCity = cities[selectedCityId];
  const chartData: TrendDataPoint[] = useMemo(() => {
    return trendData
      ? trendData.map((data) => ({
          day: new Date(data.coverage.datetimeFrom.utc).toLocaleDateString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
            }
          ),
          pm25: data.value,
        }))
      : [];
  }, [trendData]);

  const stats = useMemo(() => {
    if (chartData.length === 0) {
      return {
        currentAQI: 0,
        dailyAvg: 0,
        minAQI: 0,
        maxAQI: 0,
        monthlyChange: 0,
      };
    }

    const currentAQI = chartData[chartData.length - 1].pm25;
    const dailyAvg = Math.round(
      chartData.reduce((sum, d) => sum + d.pm25, 0) / chartData.length
    );

    const aqiValues = chartData.map((d) => d.pm25);
    const minAQI = Math.min(...aqiValues);
    const maxAQI = Math.max(...aqiValues);
    const monthlyChange = Math.round(
      ((currentAQI - chartData[0].pm25) / chartData[0].pm25) * 100
    );

    return { currentAQI, dailyAvg, minAQI, maxAQI, monthlyChange };
  }, [chartData]);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">PM2.5 Trends</h1>
        <p className="text-sm text-muted mt-0.5">
          Daily air quality index trends for monitored cities.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {Object.values(cities).map((city) => (
          <button
            key={city.id}
            onClick={() => setSelectedCityId(city.id as CityKey)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
              selectedCityId === city.id
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-border/60 bg-card text-muted hover:text-foreground hover:border-border'
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Current AQI',
            value: stats.currentAQI.toString(),
            unit: 'µg/m³',
            color: getAQIColor(stats.currentAQI),
          },
          {
            label: 'Daily Average',
            value: stats.dailyAvg.toString(),
            unit: 'µg/m³',
            color: getAQIColor(stats.dailyAvg),
          },
          {
            label: 'Monthly Change',
            value: `${stats.monthlyChange > 0 ? '+' : ''}${stats.monthlyChange}`,
            unit: '%',
            color: stats.monthlyChange <= 0 ? '#10d97a' : '#ef4444',
          },
          {
            label: 'Peak',
            value: stats.maxAQI.toString(),
            unit: 'µg/m³',
            color: getAQIColor(stats.maxAQI),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <p className="text-xs text-muted mb-2">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
              <span className="text-sm font-normal text-muted ml-1">
                {stat.unit}
              </span>
            </p>
          </div>
        ))}
      </div>

      {isTrendLoading ? (
        <div className="flex items-center justify-center h-100">
          <p className="text-sm text-muted animate-spin">
            <Loader2Icon size={24} />
          </p>
          <p className="text-sm text-muted ml-2">Loading trend data...</p>
        </div>
      ) : (
        <TrendsChart
          selectedCity={selectedCity}
          currentAQI={stats.currentAQI}
          chartData={chartData}
          minAQI={stats.minAQI}
          maxAQI={stats.maxAQI}
        />
      )}
    </div>
  );
}
