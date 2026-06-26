"use client";

import { Dropdown } from "../Dropdown";
import styles from "@/components/skeletons/HourlyForecastModuleSkeleton.module.css";

export const HourlyForecastModuleSkeleton = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>Hourly forecast</p>

        <Dropdown<string> 
          items={[]}
          onValueChange={() => {}}
          value="—"
        />
      </div>

      <div className={styles.forecast}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.emptyCard} />
        ))}
      </div>
    </div>
  );
};