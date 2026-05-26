import styles from "@/components/MetricCard.module.css";
import { Metric } from "@/types";

interface MetricCardProps {
  metric: Metric;
  value: number | string;
}

const metricUnits: Record<Metric, { unit: string; space: boolean }> = {
  "Feels Like": {
    unit: "°",
    space: false,
  },
  Humidity: {
    unit: "%",
    space: false,
  },
  Wind: {
    unit: "km/h",
    space: true,
  },
  Precipitation: {
    unit: "mm",
    space: true,
  },
};

const formatMetricValue = (value: number | string, metric: Metric) => {
  const { unit, space } = metricUnits[metric];

  return `${Math.round(Number(value))}${space ? " " : ""}${unit}`;
};

export const MetricCard = ({ metric, value }: MetricCardProps) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.metricCard}>
          <div className={styles.metricTitle}>{metric}</div>
          <div className={styles.metricValue}>
            {formatMetricValue(value, metric)}
          </div>
        </div>
      </div>
    </>
  );
};
