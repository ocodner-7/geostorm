import { GeoResult } from "@/types";

export const geocodeCity = async (city: string): Promise<GeoResult> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
  );

  if (!response.ok) {
    throw new Error("Error fetching city coordinates");
  }

  const data = await response.json();

  const result = data.results[0];

  return {
    cityName: result.city,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  };
};
