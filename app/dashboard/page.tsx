'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cities } from '@/lib/data';
import { AQData, CityKey } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { getAQIColor } from '@/lib/utils';

import MapSidePanel from '@/components/dashboard/MapSidePanel';
import Map from '@/components/dashboard/Map';

export default function DashboardPage() {
  const cityKeys = Object.keys(cities) as CityKey[];
  const [selectedCity, setSelectedCity] = useState<CityKey>('lagos');
  const selectedCityIndex = cityKeys.indexOf(selectedCity);

  const results = useQueries({
    queries: Object.values(cities).map((city) => ({
      queryKey: ['cityData', city.id],
      queryFn: async () => {
        const res = await fetch(
          `/api/air-quality/data?openaqId=${city.openaqId}`
        );
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data;
      },
    })),
    combine: (results) => {
      return {
        data: results.map((r) => r.data) as AQData[][],
        isFetching: results.some((r) => r.isFetching),
      };
    },
  });

  const pm25Values = results.isFetching
    ? []
    : results.data.map((cityData) => {
        const pm25Data = cityData.find((d) => d.parameter === 'pm25');
        return pm25Data?.value || 0;
      });

  return (
    <div className="flex flex-col h-screen-minus-header">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/60 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">
              Global Sensor Map
            </h1>
          </div>
          <p className="text-sm text-muted mt-0.5">
            Live AQI readings from African city monitoring stations.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {[
            { color: '#10d97a', label: 'Good (0–50)' },
            { color: '#f59e0b', label: 'Moderate (51–100)' },
            { color: '#f97316', label: 'Unhealthy (101–150)' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <Map
          isFetching={results.isFetching}
          data={results.data}
          pm25Values={pm25Values}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        <div className="w-72 bg-card border-l border-border/60 flex flex-col overflow-y-auto scrollbar-hide">
          {results.isFetching || !results.data ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 size={24} className="animate-spin" />
            </div>
          ) : (
            <MapSidePanel
              selectedCity={cities[selectedCity]}
              pm25={pm25Values[selectedCityIndex]}
              data={results.data[selectedCityIndex]}
              timestamp={results.data[selectedCityIndex][0].lastUpdated}
            />
          )}

          <div className="border-t border-border/60 p-4 mt-auto">
            <p className="text-2xs font-semibold text-muted uppercase tracking-wider mb-3">
              All Monitored Cities
            </p>
            <div className="space-y-1.5">
              {Object.values(cities).map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCity === city.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-foreground/5 border border-transparent'
                  }`}
                >
                  <span className="text-xs text-foreground">{city.name}</span>
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: getAQIColor(pm25Values[cityKeys.indexOf(city.id)]),
                    }}
                  >
                    {pm25Values[cityKeys.indexOf(city.id)]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
