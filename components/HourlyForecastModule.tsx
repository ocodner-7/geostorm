"use client";
import styles from "@/components/HourlyForecastModule.module.css";
import { DayDropdown } from "./DayDropdown";
import Image, { StaticImageData } from "next/image";
import sunny from "@/public/images/icon-sunny.webp";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";
import { DropdownSeparator } from "./DropdownSeparator";
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
  data: Hourly[];
}

export const HourlyForecastModule = ({ data }: HourlyForecastModuleProps) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>Hourly forecast</p>
        <Dropdown trigger={<>{days[0]}</>}>
          <DropdownItem>{days[1]}</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>{days[2]}</DropdownItem>
        </Dropdown>
      </div>

      <div className={styles.forecast}>
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
        <HourlyForecastCard icon={sunny} time="3 PM" temperature="19" />
      </div>
    </div>
  );
};

interface HourlyForecastCardProps {
  icon: StaticImageData | string;
  time: string;
  temperature: string;
}

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
          />
        </div>
        <div>{time}</div>
      </div>

      <div className={styles.temperature}>{temperature}&deg;</div>
    </div>
  );
};
