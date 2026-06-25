import { BigDataCloudResponse, ReverseGeocodeResult } from "@/types";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export const fetchReverseGeocode = async (
  lat: number,
  lon: number,
  signal: AbortSignal,
): Promise<ReverseGeocodeResult> => {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Reverse geocode failed: ${response.status}`);
  };

  const data: BigDataCloudResponse = await response.json();

  // city is sometimes empty for smaller places; fall back to locality
  const cityName = data.city || data.locality || "Unknown location";
  const country = regionNames.of(data.countryCode) ?? data.countryName;

  return { cityName, country };
};
