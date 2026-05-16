"use client";
import styles from "@/components/Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactNode;
  message?: string;
  className?: string;
};

export const InputField = ({ label, icon, message, className, ...props }: InputProps) => {
  return (
    <div className={`${styles.inputContainer} ${className || ""}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input {...props} className={styles.input} />
      </div>

      {message && <p className={`${styles.message}`}>{message}</p>}
    </div>
  );
};
