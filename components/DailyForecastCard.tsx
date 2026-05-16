import styles from "@/components/DailyForecastCard.module.css";
import Image from "next/image";
import sunny from "@/public/images/icon-sunny.webp";

// interface DailyForecastCardProps {
//     // forecast: any;
// };

export const DailyForecastCard = () => {
  return (
    <div className={styles.root}>
      <div className={styles.day}>Tue</div>
      <div className={styles.icon}>
        <Image src={sunny} alt="daily forecast icon" height={50} />
      </div>

      <div className={styles.temperatures}>
        <div className={styles.max}>24&deg;</div>
        <div className={styles.min}>14&deg;</div>
      </div>
    </div>
  );
};
