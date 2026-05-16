"use client";
import { Menu } from '@base-ui/react';
import styles from './WeatherMenu.module.css';
import { Settings } from "lucide-react";
import { ArrowSvg } from '@/components/ArrowSvg';


export const WeatherMenu = () => {
    return (
        <Menu.Root>
            <Menu.Trigger className={styles.Button}>
                <Settings className={styles.Icon} /> 
                Units <ChevronDownIcon className={styles.ButtonIcon} />
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner className={styles.Positioner} sideOffset={8}>
                    <Menu.Popup className={styles.Popup}>
                        <Menu.Arrow className={styles.Arrow}>
                            <ArrowSvg />
                        </Menu.Arrow>
                        <Menu.Item className={styles.Item}>Celcius</Menu.Item>
                        <Menu.Separator className={styles.Separator} />
                        <Menu.Item className={styles.Item}>Farenheiht</Menu.Item>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
};

function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
            <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
        </svg>
    );
};