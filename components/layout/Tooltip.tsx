import { getAQICategory, getAQIColor } from '@/lib/utils';

export default function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    const aqi = payload[0].value;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2.5 text-xs shadow-xl">
        <p className="text-muted mb-1">{label}</p>
        <p className="font-bold text-sm" style={{ color: getAQIColor(aqi) }}>
          {aqi} AQI
        </p>
        <p className="text-muted mt-0.5">{getAQICategory(aqi)}</p>
      </div>
    );
  }

  return null;
}
