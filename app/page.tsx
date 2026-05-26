"use client";

import styles from "./page.module.css";
import { SearchBar } from "@/components/SearchBar";
import { MetricCard } from "@/components/MetricCard";
import { Header } from "@/components/Header";
import { Module } from "@/components/Module";
import { WeatherLocationPanel } from "@/components/WeatherLocationPanel";
import { DailyForecastCard } from "@/components/DailyForecastCard";
import { HourlyForecastModule } from "@/components/HourlyForecastModule";
import { useCitySearch } from "@/data/queries/useCitySearch";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { CityResult } from "@/types";
import { useWeather } from "@/data/queries/useWeather";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);
  const [deviceCoords, setDeviceCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<"prompting" | "idle" | "denied">("prompting");

  const debouncedQuery = useDebounce(query, 300);
  const search = useCitySearch(debouncedQuery);

  // Fallback coordination logic for the query hook
  const activeLat = selectedCity ? selectedCity.latitude : deviceCoords?.lat;
  const activeLon = selectedCity ? selectedCity.longitude : deviceCoords?.lon;

  // Fetch data using whatever coordinates are active
  const weather = useWeather(activeLat, activeLon);

  console.log("weather", weather.data)

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      setDeviceCoords({ lat: 51.5074, lon: -0.1278 }); // Default fallback
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        setDeviceCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setGeoStatus("idle");
      },
      (error) => {
        console.warn("Location denied:", error.message);
        setGeoStatus("denied");
        setDeviceCoords({ lat: 51.5074, lon: -0.1278 }); // London Fallback
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  }, []);

  const handleSelectCity = (city: CityResult) => {
    setSelectedCity(city);
    setQuery(""); // Clear input when city is selected
  };

  const noResults = !search.isLoading && debouncedQuery.length > 2 && search.data?.length === 0;

  // Loading indicator while waiting for either geolocation or API fetch
  if (weather.isLoading || (!deviceCoords && !selectedCity)) {
    return (
      <div className={styles.page} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p>Loading weather parameters...</p>
      </div>
    );
  }

  // Gracefully pull out data if it successfully returned
  const weatherData = weather.data;

  console.log(selectedCity)

  if (!weatherData) return <>Error</>;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />

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
          {/* {geoStatus === "denied" && !selectedCity && (
            <p style={{ color: "#d97706", fontSize: "0.75rem", marginTop: "4px" }}>
              Using fallback location (Location access denied)
            </p>
          )} */}
        </div>

          <Module className={styles.data}>
            <Module className={styles.todayForecast}>
              <WeatherLocationPanel location={`${selectedCity?.cityName}, ${selectedCity?.country}`} weatherData={weatherData.current} />
              <div className={styles.metrics}>
                {/* Plug values directly into your metric cards */}
                <MetricCard metric="Feels Like" value={weatherData.current.apparentTemperature} />
                <MetricCard metric="Humidity" value={weatherData.current.humidity} />
                <MetricCard metric="Wind" value={weatherData.current.windSpeed} />
                <MetricCard metric="Precipitation" value={weatherData.current.precipitation} />
              </div>
            </Module>

            <Module className={styles.dailyForecast}>
              <h4>Daily Forecast</h4>
              <div className={styles.dailyForecastCards}>
                {/* Dynamically generate cards instead of empty duplicates */}
                {weatherData.daily.slice(0, 7).map((day) => (
                  <DailyForecastCard
                    key={day.time.toISOString()}
                    date={day.time.toLocaleDateString(undefined, { weekday: "short" })}
                    minTemp={`${Math.round(day.minTemperature)}`}
                    maxTemp={`${Math.round(day.maxTemperature)}`}
                    code={day.weatherCode}
                  />
                ))}
              </div>
            </Module>

            <Module className={styles.hourlyForecast}>
              <HourlyForecastModule data={weatherData.hourly} />
            </Module>
          </Module>
      </main>
    </div>
  );
}