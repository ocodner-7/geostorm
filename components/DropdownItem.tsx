import styles from "./DropdownItem.module.css";
import { Menu } from "@base-ui/react";
import { ReactNode } from "react";

type DropdownItemProps = {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
};

export function DropdownItem({ icon, children, onClick }: DropdownItemProps) {
  return (
    <Menu.Item className={styles.item} onClick={onClick}>
      <span className={styles.leftSection}>
        {icon && <span className={styles.iconSlot}>{icon}</span>}

        {children}
      </span>
    </Menu.Item>
  );
}
