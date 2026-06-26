"use client";

import styles from "./page.module.css";
import { SearchBar } from "@/components/SearchBar";
import { MetricCard } from "@/components/MetricCard";
import { Header } from "@/components/Header";
import { Module } from "@/components/Module";
import { WeatherLocationPanel } from "@/components/WeatherLocationPanel";
import { APIError } from "@/components/APIError";
import { DailyForecastCard } from "@/components/DailyForecastCard";
import { HourlyForecastModule } from "@/components/HourlyForecastModule";
import { useCitySearch } from "@/data/queries/useCitySearch";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { CityResult } from "@/types";
import { useWeather } from "@/data/queries/useWeather";
import { useDeviceLocation } from "@/data/queries/useDeviceLocation";
import { useReverseGeocode } from "@/data/queries/useReverseGeocode";
import { useUnits } from "@/hooks/useUnits";
import { round, BuildWeatherViewModel as BuildWeatherView } from "@/data/utils";
import { DailyForecastSkeleton } from "@/components/skeletons/DailyForecastSkeleton";
import { WeatherLocationPanelSkeleton } from "@/components/skeletons/WeatherLocationPanelSkeleton";
import { MetricCardSkeleton } from "@/components/skeletons/MetricCardSkeleton";
import { HourlyForecastModuleSkeleton } from "@/components/skeletons/HourlyForecastModuleSkeleton";

const LONDON_FALLBACK = { lat: 51.5074, lon: -0.1278 };

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);

  const debouncedQuery = useDebounce(query, 300);
  const search = useCitySearch(debouncedQuery);
  const deviceLocation = useDeviceLocation();

  const locationFallback = deviceLocation.isError ? LONDON_FALLBACK : undefined;

  const activeCoords = selectedCity
    ? { lat: selectedCity.latitude, lon: selectedCity.longitude }
    : (deviceLocation.data ?? locationFallback);

  const weather = useWeather(activeCoords?.lat, activeCoords?.lon);

  const reverseGeo = useReverseGeocode(
    !selectedCity ? activeCoords?.lat : undefined,
    !selectedCity ? activeCoords?.lon : undefined,
  );

  const handleSelectCity = (city: CityResult) => {
    setSelectedCity(city);
    setQuery("");
  };

  const displayLocation = selectedCity ?? reverseGeo.data;

  const { units } = useUnits();

  const windSpeedUnit = units.windSpeed === "mph" ? " mph" : " km/h";
  const precipitationUnit = units.precipitation === "mm" ? " mm" : " in";

  const noResults = !search.isLoading && debouncedQuery.length > 2 && search.data?.length === 0;

  const refetchWeather = () => {
    weather.refetch();
  };

  const weatherData = weather.data;
  const view = weatherData ? BuildWeatherView(weatherData, units) : null;

  const isInitialising = (deviceLocation.isLoading && !selectedCity) || weather.isLoading ||
  (!selectedCity && reverseGeo.isLoading) || !view;

  return (
  <div className={styles.page}>
    <main className={styles.main}>
      <Header />

      {weather.isError ? (
        <APIError onRetry={refetchWeather} />
      ) : (
        <>
          <h1 className={styles.greeting}>
            {"How's the sky looking today?"}
          </h1>

          <div className={styles.searchBarContainer}>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              suggestions={search.data ?? []}
              isSearchLoading={search.isLoading}
              error={search.error}
              onCitySelect={handleSelectCity}
            />
          </div>

          {isInitialising ? (
            <Module className={styles.data}>
              <Module className={styles.todayForecast}>
                <WeatherLocationPanelSkeleton />
                <div className={styles.metrics}>
                  <MetricCardSkeleton metric="Feels Like" />
                  <MetricCardSkeleton metric="Humidity" />
                  <MetricCardSkeleton metric="Wind" />
                  <MetricCardSkeleton metric="Precipitation" />
                </div>
              </Module>

              <Module className={styles.dailyForecast}>
                <h4>Daily Forecast</h4>
                <div className={styles.dailyForecastCards}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <DailyForecastSkeleton key={i} />
                  ))}
                </div>
              </Module>

              <Module className={styles.hourlyForecast}>
                <HourlyForecastModuleSkeleton />
              </Module>
            </Module>
          ) : view ? (
            <Module className={styles.data}>
              <Module className={styles.todayForecast}>
                <WeatherLocationPanel
                  location={`${displayLocation?.cityName}, ${displayLocation?.country}`}
                  weatherData={view.current}
                />
                <div className={styles.metrics}>
                  <MetricCard
                    metric="Feels Like"
                    value={view.current.apparentTemperature}
                    unit="°"
                  />
                  <MetricCard
                    metric="Humidity"
                    value={view.current.humidity}
                    unit="%"
                  />
                  <MetricCard
                    metric="Wind"
                    value={view.current.windSpeed}
                    unit={windSpeedUnit}
                  />
                  <MetricCard
                    metric="Precipitation"
                    value={view.current.precipitation}
                    unit={precipitationUnit}
                  />
                </div>
              </Module>

              <Module className={styles.dailyForecast}>
                <h4>Daily Forecast</h4>
                <div className={styles.dailyForecastCards}>
                  {view.daily.slice(1, 8).map((day) => (
                    <DailyForecastCard
                      key={day.time.toISOString()}
                      date={day.time.toLocaleDateString(undefined, {
                        weekday: "short",
                      })}
                      minTemp={round(day.minTemperature)}
                      maxTemp={round(day.maxTemperature)}
                      code={day.weatherCode}
                    />
                  ))}
                </div>
              </Module>

              <Module className={styles.hourlyForecast}>
                <HourlyForecastModule hourlyData={view.hourly} />
              </Module>
            </Module>
          ) : null}
        </>
      )}
    </main>
  </div>
);
}
