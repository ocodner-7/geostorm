"use client";
import styles from "@/components/DayDropdown.module.css";
import { Menu } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { ArrowSvg } from "@/components/ArrowSvg";

export const DayDropdown = () => {
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
    <Menu.Root>
      <Menu.Trigger className={styles.Button}>
        {days[1]} <ChevronDownIcon className={styles.ButtonIcon} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className={styles.Positioner} sideOffset={8}>
          <Menu.Popup className={styles.Popup}>
            <Menu.Arrow className={styles.Arrow}>
              <ArrowSvg />
            </Menu.Arrow>
            <Menu.Item className={styles.Item}>{days[2]}</Menu.Item>
            <Menu.Separator className={styles.Separator} />
            <Menu.Item className={styles.Item}>{days[4]}</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};
