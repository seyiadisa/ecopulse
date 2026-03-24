import { getAQICategory, getAQIColor } from '@/lib/utils';
import { AQData, CityValue } from '@/types';

export default function MapSidePanel({
  selectedCity,
  pm25,
  data,
  timestamp,
}: {
  selectedCity: CityValue;
  pm25: number;
  data: AQData[];
  timestamp: string;
}) {
  return (
    <>
      <div className="p-4 border-b border-border/60">
        <h2 className="text-sm font-semibold text-foreground mb-1">
          City Details
        </h2>
        <p className="text-xs text-muted">Click a marker to view details</p>
      </div>

      {selectedCity && (
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">
                {selectedCity.name}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {selectedCity.country}
              </p>
            </div>
            <div
              className="text-2xl font-bold leading-none"
              style={{ color: getAQIColor(pm25) }}
            >
              {pm25}
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${getAQIColor(pm25)}15`,
              color: getAQIColor(pm25),
              border: `1px solid ${getAQIColor(pm25)}30`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getAQIColor(pm25) }}
            />
            {getAQICategory(pm25)}
          </div>

          <div className="space-y-2.5">
            <p className="text-2xs font-semibold text-muted uppercase tracking-wider">
              Pollutant Readings
            </p>
            {data.map((cityData, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <span className="text-xs text-muted">
                  {cityData.parameter.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {cityData.value} {cityData.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-sidebar rounded-xl border border-border/50 px-3 py-2.5">
            <p className="text-3xs text-muted mb-0.5">Last Updated</p>
            <p className="text-xs text-foreground/80">
              {new Date(timestamp).toLocaleString()}
            </p>
          </div>

          <div className="bg-sidebar rounded-xl border border-border/50 px-3 py-2.5">
            <p className="text-3xs text-muted mb-0.5">Coordinates</p>
            <p className="text-xs text-foreground/80 font-mono">
              {selectedCity.lat.toFixed(4)}, {selectedCity.lon.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
