"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { SearchBar } from "@/components/SearchBar";
import { WeatherLocationPanel } from "@/components/WeatherLocationPanel";
import { useEffect, useState } from "react";
import { LocationState } from "@/types";
import { getCurrentWeatherData } from "@/api/getCurrentWeatherData";
import { geocodeLocation } from "@/api/geocodeLocation";
import { MetricCard } from "@/components/MetricCard";
import { getDailyForecastData } from "@/api/getDailyForecastData";
import { DailyForecastCard } from "@/components/DailyForecastCard";
import { WeatherMenu } from "@/components/Menu";

export default function Home() {

  const [location, setLocation] = useState<LocationState>({
    longitude: null,
    latitude: null,
    error: null
  });

  const [locationData, setLocationData] = useState<{ name: string, country: string } | null>(null);
  const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
  const [dailyForecastData, setDailyForecastData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLocation({
  //       longitude: position.coords.longitude,
  //       latitude: position.coords.latitude,
  //       error: null
  //     })
  //   })

  // }, []);

  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     if (location.latitude && location.longitude) {
  //       getCurrentWeatherData(location.longitude, location.latitude)
  //         .then((data) => {
  //           setCurrentWeatherData(data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching weather data:", error);
  //         });
  //     }
  //   }
  //   fetchWeather();
  // }, [location]);

  const handleSearch = async (query: string) => {
    try {
      const { latitude, longitude, name, country } = await geocodeLocation(query);
      setLocationData({ name, country });
      const currentWeatherData = await getCurrentWeatherData(longitude, latitude);
      setCurrentWeatherData(currentWeatherData);
      const dailyForecast = getDailyForecastData(longitude, latitude);
      setDailyForecastData(dailyForecast);
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  const round = (num: number) => {
    return Math.round(num);
  };

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <Image className={styles.logo} src="/images/logo.svg" alt="Geostorm Logo" width={150} height={80} />
        <WeatherMenu />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>How's the sky looking today?</h1>

        <SearchBar onSearch={handleSearch} />

        <div className={styles.currentWeatherGrid}>

          <WeatherLocationPanel locationData={locationData} weatherData={currentWeatherData} />

          <div className={styles.metricsContainer}>
            <MetricCard
              metric="Feels Like"
              value={round(currentWeatherData?.current.apparent_temperature) + "°C"}
            />
            <MetricCard
              metric="Humidity"
              value={round(currentWeatherData?.current.relative_humidity_2m) + "%"}
            />
            <MetricCard
              metric="Wind Speed"
              value={round(currentWeatherData?.current.wind_speed_10m) + " m/s"}
            />
            <MetricCard
              metric="Precipitation"
              value={round(currentWeatherData?.current.precipitation) + "mm"}
            />
          </div>

          <div className={styles.dailyForecast}>
            <h4>Daily Forecast</h4>

            <div className={styles.dailyForecastList}>
              {
                dailyForecastData?.daily?.time.map((_: Date, index: number) => (
                  <DailyForecastCard
                    key={index}
                    forecast={dailyForecastData}
                  />
                ))
              }
            </div>
          </div>

        </div>




      </main>
    </div>
  );
}
