import styles from "@/components/DailyForecastCard.module.css";
import Image from "next/image";
import sunny from "@/public/images/icon-sunny.webp";

interface DailyForecastCardProps {
  date: string;
  minTemp: string;
  maxTemp: string;
  code: number;
};

export const DailyForecastCard = ({ date, minTemp, maxTemp, code }: DailyForecastCardProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.day}>{date}</div>
      <div className={styles.icon}>
        <Image src={sunny} alt="daily forecast icon" height={50} />
      </div>

      <div className={styles.temperatures}>
        <div className={styles.max}>{maxTemp}&deg;</div>
        <div className={styles.min}>{minTemp}&deg;</div>
      </div>
    </div>
  );
};
