import {
  GeoResult,
  WeatherCondition,
  WeatherData,
} from "@/types";
import { getWeather } from "./api/getWeather";

export const mapWeatherCode = (code: number): WeatherCondition => {
  if (code === 0) return "sunny";

  if (code === 1 || code === 2) return "partly-cloudy";

  if (code === 3) return "overcast";

  if (code === 45 || code === 48) return "fog";

  if ([51, 53, 55].includes(code)) return "drizzle";

  if ([61, 63, 65, 80, 81, 82].includes(code)) return "rain";

  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";

  if ([95, 96, 99].includes(code)) return "storm";

  return "sunny";
};

export const normalizeWeatherData = (raw: Awaited<ReturnType<typeof getWeather>>): WeatherData => {
  return {
    current: {
      time: raw.current.time,
      weatherCode: Math.round(raw.current.weather_code),
      temperature: Math.round(raw.current.temperature_2m * 10) / 10,
      apparentTemperature: Math.round(raw.current.apparent_temperature * 10) / 10,
      humidity: Math.round(raw.current.relative_humidity_2m),
      precipitation: raw.current.precipitation,
      windSpeed: Math.round(raw.current.wind_speed_10m * 10) / 10,
    },
    hourly: raw.hourly.time.map((time, i) => ({
      time,
      apparentTemperature: raw.hourly.apparent_temperature[i],
      precipitation: raw.hourly.precipitation[i],
      windSpeed: raw.hourly.wind_speed_10m[i],
      weatherCode: raw.hourly.weather_code[i],
      humidity: raw.hourly.relative_humidity_2m[i],
      temperature: raw.hourly.temperature_2m[i],
    })),
    daily: raw.daily.time.map((time, i) => ({
      time,
      rainSum: raw.daily.rain_sum[i],
      weatherCode: raw.daily.weather_code[i],
      maxTemperature: raw.daily.temperature_2m_max[i],
      minTemperature: raw.daily.temperature_2m_min[i],
      precipitationSum: raw.daily.precipitation_sum[i],
    })),
  };
};