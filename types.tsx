export type OpenMeteoCity = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type OpenMeteoResponse = {
  results?: OpenMeteoCity[];
};

export type Metric = "Feels Like" | "Humidity" | "Wind" | "Precipitation";

export type GeoResult = {
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

export type WeatherData = {
 current: {
    time: Date;
    weatherCode: number;
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
  };
  hourly: Array<{
    time: Date;
    apparentTemperature: number;
    precipitation: number;
    windSpeed: number;
    weatherCode: number;
    humidity: number;
    temperature: number;
  }>;
  daily: Array<{
    time: Date;
    rainSum: number;
    weatherCode: number;
    maxTemperature: number;
    minTemperature: number;
    precipitationSum: number;
  }>;
};

export type CityResult = {
  id: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export interface Coordinates {
  lat: number;
  lon: number;
}

type HourlyItem = { 
    time: Date;
    temp: number;
    code: number;
};

export type GroupedHours = Record<string, HourlyItem[]>;

export type BigDataCloudResponse = {
  city: string;
  locality: string;
  principalSubdivision: string;
  countryName: string;
  countryCode: string;
};

export type ReverseGeocodeResult = {
  cityName: string;
  country: string;
};


export type Units = {
  temperature: "celsius" | "fahrenheit";
  windSpeed: "kmh" | "mph";
  precipitation: "mm" | "inch";
};