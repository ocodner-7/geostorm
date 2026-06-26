"use client";
import { ComponentProps } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
  text: string;
  variant: "primary" | "secondary";
  icon?: React.ReactNode;
}

export const Button = ({ icon, text, variant = "primary" }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};
