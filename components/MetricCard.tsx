import styles from "@/components/MetricCard.module.css";

interface MetricCardProps {
    metric: string;
    value: string;
};

export const MetricCard = ({ metric, value }: MetricCardProps) => {
    return (
        <>
            <div className={styles.root}>
                <div className={styles.metricCard}>
                    <div className={styles.metricTitle}>{metric}</div>
                    <div className={styles.metricValue}>{value}</div>
                </div>
            </div>
        </>
    );
};