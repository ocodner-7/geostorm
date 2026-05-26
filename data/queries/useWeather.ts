import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/getWeather";
import { normalizeWeatherData } from "../utils";
import { CityResult } from "@/types";

export const useWeather = (lat: number | undefined | null, lon: number | undefined | null) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat!, lon!),
    enabled: typeof lat === "number" && typeof lon === "number", 
    select: (rawData) => normalizeWeatherData(rawData),
    staleTime: 1000 * 60 * 5, 
  });
};