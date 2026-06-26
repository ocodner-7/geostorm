"use client";
import { RefreshCw, Ban } from "lucide-react";
import { Button } from "./Button";
import styles from "@/components/APIError.module.css";

interface APIErrorProps {
  onRetry: () => void;
}

export const APIError = ({ onRetry }: APIErrorProps) => {
  return (
    <div className={styles.root}>
      <Ban className={styles.banIcon} size={40} />

      <h2 className={styles.title}>Something went wrong</h2>

      <p className={styles.subtitle}>
        {`We couldn't connect to the server (API error). Please try 
        again in a few moments.`}
      </p>

      <Button
        variant="secondary"
        icon={<RefreshCw style={{ display: "block" }} size={14} />}
        text="Retry"
        onClick={onRetry}
      />
    </div>
  );
};
