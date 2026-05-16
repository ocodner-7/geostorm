"use client";
import logo from "@/public/images/logo.svg";
import styles from "@/components/Header.module.css";
import Image from "next/image";
import { WeatherMenu } from "@/components/WeatherMenu";
import { Dropdown } from "./Dropdown";
import { Settings } from "lucide-react";
import { DropdownItem } from "./DropdownItem";
import { DropdownSeparator } from "./DropdownSeparator";

export const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="logo" className={styles.logo} />
      </div>
      <Dropdown
        trigger={
          <>
            <Settings size={16} />
            Units
          </>
        }
      >
        <DropdownItem>Switch To Imperial</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Farenheit</DropdownItem>
      </Dropdown>
    </div>
  );
};
