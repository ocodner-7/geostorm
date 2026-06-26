import styles from "@/components/MetricCard.module.css";
import { Metric } from "@/types";

interface MetricCardProps {
  metric: Metric;
  value: number | string;
  unit: string;
  loading?: boolean;
};


const formatMetricValue = (value: number | string, unit: string) => {
  return `${value}${unit}`;
};

export const MetricCard = ({ metric, value, unit, loading }: MetricCardProps) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>{metric}</div>
          <div className={styles.metricValue}>
            {loading ? "—" : formatMetricValue(value, unit)}
          </div>
        </div>
      </div>
    </>
  );
};
