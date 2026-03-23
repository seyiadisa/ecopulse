export type CityKey =
  | 'lagos'
  | 'kigali'
  | 'cairo'
  | 'accra'
  | 'antananarivo'
  | 'dakar'
  | 'addisAbaba';

export interface CityValue {
  id: CityKey;
  name: string;
  country: string;
  openaqId: number;
  lat: number;
  lon: number;
}

export interface TrendDataPoint {
  day: string;
  pm25: number;
}

export interface AQData {
  parameter: string;
  value: number;
  unit: string;
  lastUpdated: string;
}
