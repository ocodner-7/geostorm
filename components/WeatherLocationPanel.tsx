"use client";
import styles from "./WeatherLocationPanel.module.css";

interface WeatherLocationPanelProps {
    locationData:  { name: string, country: string } | null;
    weatherData: any; // Replace 'any' with a more specific type as needed
};

export const WeatherLocationPanel = ({ weatherData, locationData }: WeatherLocationPanelProps) => {

    // Wait until weatherData is available
    if (!weatherData) {
        return <p>Loading weather data...</p>;
    };

    if (!locationData) {
        return <p>Loading location data...</p>;
    };

    const currentWeatherDate = new Date(weatherData.current.time);// Format: Day, MM, D, YYYY

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[currentWeatherDate.getDay()];
    const monthAbbr = currentWeatherDate.toLocaleString('default', { month: 'short' });
    const formattedDate = `${dayName}, ${monthAbbr} ${currentWeatherDate.getDate()}, ${currentWeatherDate.getFullYear()}`;

    const currentTemperature = weatherData.current.temperature_2m;
    const isDay = weatherData.current.is_day;
    const precipitation = weatherData.current.precipitation;

    const roundedTemperature = Math.round(currentTemperature);

    return (
        <>
            <div className={styles.root}>
                <p>{locationData?.name}, {locationData?.country }</p>

                <p>{formattedDate}</p>
                
                <p>{roundedTemperature}°C</p>
            </div>
        </>
    )
};