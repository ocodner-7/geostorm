import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Units } from "@/types";

export const useUnits = ()  => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const units: Units = {
    temperature: searchParams.get("temp") === "f" ? "fahrenheit" : "celsius",
    windSpeed: searchParams.get("wind") === "mph" ? "mph" : "kmh",
    precipitation: searchParams.get("precip") === "in" ? "inch" : "mm",
  };

  const setUnit = useCallback(
    <K extends keyof Units>(key: K, value: Units[K]) => {
      const params = new URLSearchParams(searchParams.toString());
      const urlKey = { temperature: "temp", windSpeed: "wind", precipitation: "precip" }[key];
      const urlValue = {
        celsius: "c", fahrenheit: "f",
        kmh: "kmh", mph: "mph",
        mm: "mm", inch: "in",
      }[value];
      // delete when default to keep URLs clean
      const isDefault =
        (key === "temperature" && value === "celsius") ||
        (key === "windSpeed" && value === "kmh") ||
        (key === "precipitation" && value === "mm");
      if (isDefault) params.delete(urlKey);
      else params.set(urlKey, urlValue);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const setAll = useCallback(
    (system: "metric" | "imperial") => {
      const params = new URLSearchParams(searchParams.toString());
      if (system === "imperial") {
        params.set("temp", "f");
        params.set("wind", "mph");
        params.set("precip", "in");
      } else {
        params.delete("temp");
        params.delete("wind");
        params.delete("precip");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return { units, setUnit, setAll };
}