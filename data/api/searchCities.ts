import { CityResult, OpenMeteoResponse } from "@/types";

export const searchCities = async (query: string): Promise<CityResult[]> => {
  if (!query) return [];

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5&language=en&format=json`
  );

  if (!response.ok) {
    throw new Error("Error fetching cities");
  }

  const data: OpenMeteoResponse = await response.json();

  if (!data.results) return [];

  return data.results.map((city) => ({
    id: `${city.latitude}-${city.longitude}`,
    cityName: city.name,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone
  }));
};