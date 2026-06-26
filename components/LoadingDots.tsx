"use client";
import styles from "@/components/LoadingDots.module.css";

interface LoadingDotsProps {
  message?: string;
}

export const LoadingDots = ({ message = "Loading" }: LoadingDotsProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.loadingDots}>
        <span />
        <span />
        <span />
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
