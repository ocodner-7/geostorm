"use client";
import { getWeatherIcon } from "@/data/utils";
import styles from "./WeatherLocationPanel.module.css";
import { WeatherData } from "@/types";
import Image from "next/image";
import { LoadingDots } from "./LoadingDots";

interface WeatherLocationPanelProps {
  location: string | undefined;
  weatherData: WeatherData["current"];
  loading?: boolean;
}

export const WeatherLocationPanel = ({
  location,
  weatherData,
  loading
}: WeatherLocationPanelProps) => {


  // Wait until weatherData is available
  if (loading) {
    return <WeatherLocationPanelLoading />;
  };

  const currentWeatherDate = new Date(weatherData.time); // Format: Day, MM, D, YYYY

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[currentWeatherDate.getDay()];
  const monthAbbr = currentWeatherDate.toLocaleString("default", {
    month: "short",
  });
  const formattedDate = `${dayName}, ${monthAbbr} ${currentWeatherDate.getDate()}, ${currentWeatherDate.getFullYear()}`;

  const currentTemperature = weatherData.temperature;
  const roundedTemperature = Math.round(currentTemperature);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.locationInfo}>
          <p className={styles.location}>{location}</p>
          <p className={styles.date}>{formattedDate}</p>
        </div>

        <div className={styles.temperatureBox}>
          <div className={styles.weatherIconWrapper}>
            <Image
              src={getWeatherIcon(weatherData.weatherCode)}
              alt="weather icon"
              height={90}
              width={90}
            />
          </div>
          <p className={styles.temperature}>{roundedTemperature}&deg;</p>
        </div>
      </div>
    </>
  );
};

const WeatherLocationPanelLoading = () => {
  return (
    <div className={styles.loadingRoot}>
      <LoadingDots message="Loading" />
    </div>
  );
};
