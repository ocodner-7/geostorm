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
  | "partly-cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "storm";

// export interface WeatherLocation {
//   city: string;
//   country: string;
//   localTime: string;
//   latitude: number;
//   longitude: number;
// };

// export interface CurrentWeather {
//   temperature: number;
//   feelsLike: number;
//   humidity: number;
//   windSpeed: number;
//   precipitation: number;
//   condition: WeatherCondition;
// };

// export interface HourlyWeather {
//   time: string;
//   temperature: number;
//   feelsLike: number;
//   precipitation: number;
//   windSpeed: number;
//   condition: WeatherCondition;
// };

// export interface DailyWeather {
//   date: string;
//   minTemp: number;
//   maxTemp: number;
//   precipitation: number;
//   condition: WeatherCondition;
// }

// export type WeatherData = {
//     location: WeatherLocation;
//     current: CurrentWeather;
//     hourly: HourlyWeather[];
//     daily: DailyWeather[];
// };

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