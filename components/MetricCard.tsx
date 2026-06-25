import styles from "@/components/MetricCard.module.css";
import { Metric } from "@/types";

interface MetricCardProps {
  metric: Metric;
  value: number | string;
  unit: string;
};


const formatMetricValue = (value: number | string, unit: string) => {
  return `${Math.round(Number(value))}${unit}`;
};

export const MetricCard = ({ metric, value, unit }: MetricCardProps) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>{metric}</div>
          <div className={styles.metricValue}>
            {formatMetricValue(value, unit)}
          </div>
        </div>
      </div>
    </>
  );
};
