import styles from "@/components/DailyForecastCard.module.css";
import Image from "next/image";
import { getWeatherIcon } from "@/data/utils";

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
        <Image src={getWeatherIcon(code)} alt="daily forecast icon" height={50} width={50} />
      </div>

      <div className={styles.temperatures}>
        <div className={styles.max}>{maxTemp}&deg;</div>
        <div className={styles.min}>{minTemp}&deg;</div>
      </div>
    </div>
  );
};
