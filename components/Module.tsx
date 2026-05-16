"use client";
import styles from "@/components/Module.module.css";

interface ModuleProps {
    children: React.ReactNode;
    className?: string;
}

export const Module = ({ children, className }: ModuleProps) => {
    return (
        <div className={`${styles.module} ${className ?? ""}`}>
            {children}
        </div>
    )
};