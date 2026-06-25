"use client";
import logo from "@/public/images/logo.svg";
import styles from "@/components/Header.module.css";
import Image from "next/image";
import { UnitMenu } from "./UnitMenu";

export const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="logo" className={styles.logo} />
      </div>
      <UnitMenu />
    </div>
  );
};
