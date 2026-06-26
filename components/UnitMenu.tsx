"use client";

import { Menu } from "@base-ui/react";
import { useUnits } from "@/hooks/useUnits";
import styles from "./UnitMenu.module.css";
import { Units } from "@/types";
import { ChevronDown, Settings, Check } from "lucide-react";


export const UnitMenu = () => {

  const { units, setUnit, setAll } = useUnits();

  const ICON_SIZE = 16;

  const isImperial =
    units.temperature === "fahrenheit" &&
    units.windSpeed === "mph" &&
    units.precipitation === "inch";

  return (
    <Menu.Root>
      <Menu.Trigger className={styles.trigger}>
        <Settings size={ICON_SIZE} />
        Units
        <ChevronDown size={ICON_SIZE} />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className={styles.popup}>
            <Menu.Item
              className={styles.item}
              onClick={() => setAll(isImperial ? "metric" : "imperial")}
            >
              Switch to {isImperial ? "Metric" : "Imperial"}
            </Menu.Item>

            <Menu.Group>
              <Menu.RadioGroup
                value={units.temperature}
                onValueChange={(v) =>
                  setUnit("temperature", v as Units["temperature"])
                }
              >
                <Menu.GroupLabel className={styles.groupLabel}>
                  Temperature
                </Menu.GroupLabel>
                <Menu.RadioItem value="celsius" className={styles.radioItem}>
                  Celsius (°C)
                  <Menu.RadioItemIndicator className={styles.indicator}>
                   <Check size={ICON_SIZE} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
                <Menu.RadioItem value="fahrenheit" className={styles.radioItem}>
                  Fahrenheit (°F)
                  <Menu.RadioItemIndicator className={styles.indicator}>
                    <Check size={ICON_SIZE} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Group>

            <Menu.Separator className={styles.separator} />

            <Menu.Group>
              <Menu.RadioGroup
                value={units.windSpeed}
                onValueChange={(v) =>
                  setUnit("windSpeed", v as Units["windSpeed"])
                }
              >
                <Menu.GroupLabel className={styles.groupLabel}>
                  Wind Speed
                </Menu.GroupLabel>
                <Menu.RadioItem value="kmh" className={styles.radioItem}>
                  km/h
                  <Menu.RadioItemIndicator className={styles.indicator}>
                    <Check size={ICON_SIZE} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
                <Menu.RadioItem value="mph" className={styles.radioItem}>
                  mph
                  <Menu.RadioItemIndicator className={styles.indicator}>
                    <Check size={ICON_SIZE} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Group>

            <Menu.Separator className={styles.separator} />

            <Menu.Group>
              <Menu.RadioGroup
                value={units.precipitation}
                onValueChange={(v) =>
                  setUnit("precipitation", v as Units["precipitation"])
                }
              >
                <Menu.GroupLabel className={styles.groupLabel}>
                  Precipitation
                </Menu.GroupLabel>
                <Menu.RadioItem value="mm" className={styles.radioItem}>
                  Millimeters (mm)
                  <Menu.RadioItemIndicator className={styles.indicator}>
                    <Check size={ICON_SIZE} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
                <Menu.RadioItem value="inch" className={styles.radioItem}>
                  Inches (in)
                  <Menu.RadioItemIndicator className={styles.indicator}>
                    <Check size={ICON_SIZE} />
                  </Menu.RadioItemIndicator>
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};
