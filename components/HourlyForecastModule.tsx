"use client";
import styles from "@/components/HourlyForecastModule.module.css";
import Image, { StaticImageData } from "next/image";
import { Dropdown } from "./Dropdown";
import {
  getDayLabel,
  getWeatherIcon,
  groupHourlyDataByDay,
} from "@/data/utils";
import { useState } from "react";

type Hourly = {
  time: Date;
  apparentTemperature: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  temperature: number;
};

interface HourlyForecastModuleProps {
  hourlyData: Hourly[];
}

export const HourlyForecastModule = ({
  hourlyData,
}: HourlyForecastModuleProps) => {

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const grouped = groupHourlyDataByDay(hourlyData ?? []);

  const days = Object.entries(grouped).map(([date, items]) => ({
    key: date,
    label: getDayLabel(date),
    items,
  }));

  const activeDay = days.find((d) => d.key === selectedDay) ?? days[0];

  const visibleHours = activeDay?.items.slice(0, 8) ?? [];

  const dropdownValue = activeDay?.label ?? "—";

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>Hourly forecast</p>

        <Dropdown<string>
          value={dropdownValue}
          onValueChange={setSelectedDay}
          aria-label="day"
          items={days.slice(1, 7).map((d) => ({
            value: d.key,
            label: d.label,
          }))}
        />
      </div>

      <div className={styles.forecast}>
        {visibleHours.map((hour) => {
          const formattedTime = hour.time
            .toLocaleTimeString("en-GB", {
              hour: "numeric",
              hour12: true,
            })
            .toUpperCase();

          return (
            <HourlyForecastCard
              key={hour.time.toISOString()}
              icon={getWeatherIcon(hour.code)}
              time={formattedTime}
              temperature={hour.temp}
            />
          );
        })}
      </div>
    </div>
  );
};

interface HourlyForecastCardProps {
  icon: StaticImageData | string;
  time: string;
  temperature: number;
};

const HourlyForecastCard = ({
  icon,
  time,
  temperature,
}: HourlyForecastCardProps) => {
  return (
    <div className={styles.hourlyForecast}>
      <div className={styles.icon}>
        <div>
          <Image
            style={{ display: "block" }}
            src={icon}
            alt="hourly forecast icon"
            height={40}
            width={40}
          />
        </div>
        <div>{time}</div>
      </div>

      <div className={styles.temperature}>
        {temperature}&deg;
      </div>
    </div>
  );
};


