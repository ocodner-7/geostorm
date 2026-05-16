"use client";
import styles from "@/components/DropdownSeparator.module.css";

import { Menu } from "@base-ui/react";

export const DropdownSeparator = () => {
    return (
        <Menu.Separator className={styles.separator} />
    )
};