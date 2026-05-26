import { fetchWeatherApi } from "openmeteo";

export const getWeather = async (lat: number, lon: number) => {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: [
      "rain_sum",
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
    ],
    hourly: [
      "apparent_temperature",
      "precipitation",
      "wind_speed_10m",
      "weather_code",
      "relative_humidity_2m",
      "temperature_2m",
    ],
    current: [
      "weather_code",
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "wind_speed_10m",
    ],
    timezone: "auto",
    forecast_days: 14,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Helper to map timestamps properly
  const createTimeline = (
    timeStart: bigint,
    timeEnd: bigint,
    interval: number,
  ) => {
    return Array.from(
      { length: (Number(timeEnd) - Number(timeStart)) / interval },
      (_, i) =>
        new Date((Number(timeStart) + i * interval + utcOffsetSeconds) * 1000),
    );
  };

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      weather_code: current.variables(0)!.value(),
      temperature_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      relative_humidity_2m: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      wind_speed_10m: current.variables(5)!.value(),
    },
    hourly: {
      time: createTimeline(hourly.time(), hourly.timeEnd(), hourly.interval()),
      apparent_temperature: hourly.variables(0)!.valuesArray()!,
      precipitation: hourly.variables(1)!.valuesArray()!,
      wind_speed_10m: hourly.variables(2)!.valuesArray()!,
      weather_code: hourly.variables(3)!.valuesArray()!,
      relative_humidity_2m: hourly.variables(4)!.valuesArray()!,
      temperature_2m: hourly.variables(5)!.valuesArray()!,
    },
    daily: {
      time: createTimeline(daily.time(), daily.timeEnd(), daily.interval()),
      rain_sum: daily.variables(0)!.valuesArray()!,
      weather_code: daily.variables(1)!.valuesArray()!,
      temperature_2m_max: daily.variables(2)!.valuesArray()!,
      temperature_2m_min: daily.variables(3)!.valuesArray()!,
      precipitation_sum: daily.variables(4)!.valuesArray()!,
    },
  };

  return weatherData;
};
