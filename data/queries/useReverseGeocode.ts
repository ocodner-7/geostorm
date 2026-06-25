import { useQuery } from "@tanstack/react-query";
import { fetchReverseGeocode } from "../api/fetchReverseGeocode";

export const useReverseGeocode = (
  lat: number | undefined,
  lon: number | undefined,
) => {
  return useQuery({
    queryKey: ["reverse-geocode", lat, lon],
    queryFn: ({ signal }) => fetchReverseGeocode(lat!, lon!, signal),
    enabled: lat != null && lon != null,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
