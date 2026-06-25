import { GroupedHours, Units, WeatherCondition, WeatherData } from "@/types";
import { getWeather } from "./api/fetchWeather";

export const mapWeatherCode = (code: number): WeatherCondition => {
  if (code === 0) return "sunny";

  if (code === 1 || code === 2) return "cloudy";

  if (code === 3) return "overcast";

  if (code === 45 || code === 48) return "fog";

  if ([51, 53, 55].includes(code)) return "drizzle";

  if ([61, 63, 65, 80, 81, 82].includes(code)) return "rain";

  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";

  if ([95, 96, 99].includes(code)) return "storm";

  return "sunny";
};

const weatherIconMap: Record<string, string> = {
  sunny: "/images/icon-sunny.webp",
  cloudy: "/images/icon-partly-cloudy.webp",
  overcast: "/images/icon-overcast.webp",
  fog: "/images/icon-fog.webp",
  drizzle: "/images/icon-drizzle.webp",
  rain: "/images/icon-rain.webp",
  snow: "/images/icon-snow.webp",
  storm: "/images/icon-storm.webp",
};

export const getWeatherIcon = (code: number) => {
  const category = mapWeatherCode(code);
  return weatherIconMap[category];
};

export const normalizeWeatherData = (
  raw: Awaited<ReturnType<typeof getWeather>>,
): WeatherData => {
  return {
    current: {
      time: raw.current.time,
      weatherCode: raw.current.weather_code,
      temperature: raw.current.temperature_2m,
      apparentTemperature: raw.current.apparent_temperature,
      humidity: raw.current.relative_humidity_2m,
      precipitation: raw.current.precipitation,
      windSpeed: raw.current.wind_speed_10m
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

export const groupHourlyDataByDay = (
  hours: WeatherData["hourly"],
): GroupedHours => {
  return hours.reduce<GroupedHours>((acc, item) => {
    const dayKey = item.time.toDateString();

    if (!acc[dayKey]) acc[dayKey] = [];

    acc[dayKey].push({
      time: item.time,
      temp: item.temperature,
      code: item.weatherCode,
    });

    return acc;
  }, {});
};

export const getDayLabel = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
  });
};

export const convertTemperature = (
  celsius: number,
  to: Units["temperature"]
) => {
  if (to === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }
  return celsius;
};

export const round = (value: number, dp = 0) => {
  return Math.round(value * 10 ** dp) / 10 ** dp;
};

export const convertWindSpeed = (kmh: number, to: Units["windSpeed"]) => {
  return to === "mph" ? kmh * 0.621371 : kmh;
};

export const convertPrecipitation = (mm: number, to: Units["precipitation"]) => {
  return to === "inch" ? mm / 25.4 : mm;
};

export const BuildWeatherViewModel = (data: WeatherData, units: Units) => {
  return {
    current: {
      ...data.current,

      temperature: round(convertTemperature(
        data.current.temperature,
        units.temperature
      )),

      apparentTemperature: round(convertTemperature(
        data.current.apparentTemperature,
        units.temperature
      )),

      windSpeed: round(convertWindSpeed(
        data.current.windSpeed,
        units.windSpeed
      )),

      precipitation: round(convertPrecipitation(
        data.current.precipitation,
        units.precipitation
      )),
    },

    hourly: data.hourly.map((h) => ({
      ...h,
      temperature: round(convertTemperature(h.temperature, units.temperature)),
      apparentTemperature: round(convertTemperature(
        h.apparentTemperature,
        units.temperature
      )),
      windSpeed: round(convertWindSpeed(h.windSpeed, units.windSpeed)),
      precipitation: round(convertPrecipitation(
        h.precipitation,
        units.precipitation
      )),
    })),

    daily: data.daily.map((d) => ({
      ...d,
      maxTemperature: round(convertTemperature(
        d.maxTemperature,
        units.temperature
      )),
      minTemperature: round(convertTemperature(
        d.minTemperature,
        units.temperature
      )),
      precipitationSum: round(convertPrecipitation(
        d.precipitationSum,
        units.precipitation
      )),
      rainSum: round(convertPrecipitation(d.rainSum, units.precipitation)),
    })),
  };
};