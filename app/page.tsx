"use client";
// import Image from "next/image";
import styles from "./page.module.css";
import { SearchBar } from "@/components/SearchBar";
// import { WeatherLocationPanel } from "@/components/WeatherLocationPanel";
// import { useEffect, useState } from "react";
// import { LocationState } from "@/types";
// import { getCurrentWeatherData } from "@/api/getCurrentWeatherData";
// import { geocodeLocation } from "@/api/geocodeLocation";
import { MetricCard } from "@/components/MetricCard";
// import { getDailyForecastData } from "@/api/getDailyForecastData";;
import { Header } from "@/components/Header";
import { Module } from "@/components/Module";
import { WeatherLocationPanel } from "@/components/WeatherLocationPanel";
import { DailyForecastCard } from "@/components/DailyForecastCard";
import { HourlyForecastModule } from "@/components/HourlyForecastModule";

export default function Home() {
  //   const [location, setLocation] = useState<LocationState>({
  //     longitude: null,
  //     latitude: null,
  //     error: null
  //   });

  //   const [locationData, setLocationData] = useState<{ name: string, country: string } | null>(null);
  //   const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
  //   const [dailyForecastData, setDailyForecastData] = useState<any>(null);
  //   const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async (query: string) => {
    //   try {
    //     const { latitude, longitude, name, country } = await geocodeLocation(query);
    //     setLocationData({ name, country });
    //     const currentWeatherData = await getCurrentWeatherData(longitude, latitude);
    //     setCurrentWeatherData(currentWeatherData);
    //     const dailyForecast = getDailyForecastData(longitude, latitude);
    //     setDailyForecastData(dailyForecast);
    //   } catch (error) {
    //     console.error("Error fetching geocoding data:", error);
    //   }
  };

  //   const round = (num: number) => {
  //     return Math.round(num);
  //   };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />

        <h1 className={styles.greeting}>{`How's the sky looking today?`}</h1>

        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <Module className={styles.data}>
          <Module className={styles.todayForecast}>
            <WeatherLocationPanel />
            <div className={styles.metrics}>
              <MetricCard metric="Feels Like" value="19" />
              <MetricCard metric="Humidity" value="46" />
              <MetricCard metric="Wind" value="14" />
              <MetricCard metric="Precipitation" value="0" />
            </div>
          </Module>

          <Module className={styles.dailyForecast}>
            <h4>Daily Forecast</h4>

            <div className={styles.dailyForecastCards}>
              <DailyForecastCard />
              <DailyForecastCard />
              <DailyForecastCard />
              <DailyForecastCard />
              <DailyForecastCard />
              <DailyForecastCard />
              <DailyForecastCard />
            </div>
          </Module>

          <Module className={styles.hourlyForecast}>
            <HourlyForecastModule />
          </Module>
        </Module>
      </main>
    </div>
  );
}
