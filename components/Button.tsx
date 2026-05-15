"use client";
import { ComponentProps } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
    text: string;
};

export const Button = ({ text }: ButtonProps) => {
    return (
        <button className={styles.button}>{text}</button>
    );
};