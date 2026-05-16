"use client";
import styles from "./WeatherLocationPanel.module.css";
// import rain from "@/public/images/icon-rain.webp";
// import drizzle from "@/public/images/icon-drizzle.webp";
// import fog from "@/public/images/icon-fog.webp";
// import overcast from "@/public/images/icon-overcast.webp";
// import partlyCloudy from "@/public/images/icon-partly-cloudy.webp";
// import storm from "@/public/images/icon-storm.webp";
import sunny from "@/public/images/icon-sunny.webp";
// import snow from "@/public/images/icon-snow.webp";
import Image from "next/image";

interface WeatherLocationPanelProps {
  locationData: { name: string; country: string } | null;
  // weatherData: any; // Replace 'any' with a more specific type as needed
}

export const WeatherLocationPanel = () => {
  const imageMap = {
    sunny: sunny,
  };

  // // Wait until weatherData is available
  // if (!weatherData) {
  //     return <p>Loading weather data...</p>;
  // };

  // if (!locationData) {
  //     return <p>Loading location data...</p>;
  // };

  // const currentWeatherDate = new Date(weatherData.current.time);// Format: Day, MM, D, YYYY

  // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // const dayName = days[currentWeatherDate.getDay()];
  // const monthAbbr = currentWeatherDate.toLocaleString('default', { month: 'short' });
  // const formattedDate = `${dayName}, ${monthAbbr} ${currentWeatherDate.getDate()}, ${currentWeatherDate.getFullYear()}`;

  // const currentTemperature = weatherData.current.temperature_2m;
  // const isDay = weatherData.current.is_day;
  // const precipitation = weatherData.current.precipitation;

  // const roundedTemperature = Math.round(currentTemperature);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.locationInfo}>
            <p className={styles.location}>{`Berlin, Germany`}</p>
            <p className={styles.date}>{`Tuesday, Aug 5, 2026`}</p>
        </div>

        <div className={styles.temperatureBox}>
            <div className={styles.weatherIconWrapper}>
                <Image src={imageMap.sunny} alt="weather icon" height={90} />      
            </div>
            <p className={styles.temperature}>20&deg;</p>
        </div>
      </div>
    </>
  );
};
