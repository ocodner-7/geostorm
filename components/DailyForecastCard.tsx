import styles from "@/components/DailyForecastCard.module.css";

interface DailyForecastCardProps {
    forecast: any;
};

export const DailyForecastCard = ({ forecast }: DailyForecastCardProps ) => {
    return (
        <div className={styles.root}>
            <div className={styles.day}>{forecast.day}</div>
            <div className={styles.icon}>
                <img src={forecast.icon} alt={forecast.condition} />
            </div>
            <div className={styles.temperatures}>
                <span className={styles.max}>{forecast.maxTemp}°C</span> / <span className={styles.min}>{forecast.minTemp}°C</span>
            </div>
        </div>
    );
};