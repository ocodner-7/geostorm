"use client";
import { LoadingDots } from "../LoadingDots";
import styles from "@/components/skeletons/WeatherLocationPanelSkeleton.module.css";

export const WeatherLocationPanelSkeleton = () => {
  return (
    <div className={styles.loadingRoot}>
      <LoadingDots message="Loading" />
    </div>
  );
};
