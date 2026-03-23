export const OPENAQ_BASE = 'https://api.openaq.org/v3';

export function getAQIColor(aqi: number): string {
  if (aqi <= 12) return '#10d97a';
  if (aqi <= 35) return '#f59e0b';
  return '#ef4444';
}

export function getAQICategory(aqi: number): string {
  if (aqi <= 12) return 'Good';
  if (aqi <= 35) return 'Moderate';
  if (aqi <= 36) return 'Unhealthy';
  return 'Unhealthy';
}
