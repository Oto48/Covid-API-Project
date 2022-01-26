export interface Data {
  active: number;
  confirmed: number;
  date: string;
  deaths: number;
  new_confirmed: number;
  new_deaths: number;
  new_recovered: number;
  recovered: number;
  updated_at: string;
}

export interface CountryData {
  code: string;
  coordinates: Coordinates;
  latest_data: LatestData;
  name: string;
  population: number;
  timeline: Array<Data>;
  today: Today;
  updated_at: string;
}

export interface APIResponse<T> {
  data: Array<T>;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LatestData {
  deaths: number;
  confirmed: number;
  recovered: number;
  critical: number;
  calculated: Calculated;
}

interface Calculated {
  cases_per_million_population: number;
  death_rate: number;
  recovered_vs_death_ratio: number;
  recovery_rate: number;
}

interface Today {
  deaths: number;
  confirmed: number;
}
