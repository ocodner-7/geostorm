"use client";

import { Select } from "@base-ui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react"; // or wherever
import styles from "./Dropdown.module.css";

type DropdownItem<T extends string> = {
  value: T;
  label: string;
};

type DropdownProps<T extends string> = {
  value: T | undefined;
  onValueChange: (value: T) => void;
  items: DropdownItem<T>[];
  label?: string; // optional group label
  placeholder?: string;
  "aria-label"?: string;
};

export function Dropdown<T extends string>({
  value,
  onValueChange,
  items,
  label,
  placeholder,
  "aria-label": ariaLabel,
}: DropdownProps<T>) {
  return (
    <Select.Root
      value={value}
      onValueChange={(next) => {
        if (next !== null) onValueChange(next);
      }}
    >
      <Select.Trigger className={styles.trigger} aria-label={ariaLabel}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon size={16} className={styles.icon}/>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner align="center" >
          <Select.Popup className={styles.popup}>
            {label && (
              <Select.GroupLabel className={styles.groupLabel}>
                {label}
              </Select.GroupLabel>
            )}
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className={styles.item}
              >
                <Select.ItemIndicator className={styles.indicator}>
                  <CheckIcon />
                </Select.ItemIndicator>
                <Select.ItemText>{item.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
