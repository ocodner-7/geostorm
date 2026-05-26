import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../api/searchCities";

export const useCitySearch = (query: string) => {
  const expiry = 1000 * 60 * 30; // 30 minute cache
  const cleanupTime = 1000 * 60 * 60; // 1 hour optional cleanup time

  return useQuery({
    queryKey: ["city-search", query],
    queryFn: () => searchCities(query),
    enabled: query.length > 2,
    staleTime: expiry,
    gcTime: cleanupTime,
  });
};
