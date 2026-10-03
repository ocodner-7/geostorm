import styles from "@/components/DailyForecastCard.module.css";
import Image from "next/image";
import { getWeatherDescription, getWeatherIcon } from "@/data/utils";

interface DailyForecastCardProps {
  date: string;
  minTemp: number;
  maxTemp: number;
  code: number;
};

export const DailyForecastCard = ({ date, minTemp, maxTemp, code }: DailyForecastCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.day}>{date}</div>
      <div className={styles.icon}>
        <Image src={getWeatherIcon(code)} alt={getWeatherDescription(code)} height={50} width={50} />
      </div>

      <div className={styles.temperatures}>
        <div className={styles.max}>
          <span className="sr-only">High </span>
          {maxTemp}&deg;
        </div>
        <div className={styles.min}>
          <span className="sr-only">Low </span>
          {minTemp}&deg;
        </div>
      </div>
    </div>
  );
};
