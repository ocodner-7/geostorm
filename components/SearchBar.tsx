"use client";
import styles from "./SearchBar.module.css";
import { Search, LoaderCircle } from "lucide-react";
import { InputField } from "./Input";
import type { CityResult } from "@/types";
import { Autocomplete } from "@base-ui/react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  suggestions: CityResult[];
  isSearchLoading: boolean;
  onCitySelect: (city: CityResult) => void;
};

const cityLabel = (city: CityResult) => `${city.cityName}, ${city.country}`;

export const SearchBar = ({
  query,
  onQueryChange,
  suggestions,
  isSearchLoading,
  onCitySelect,
}: SearchBarProps) => {
  return (
    <div className={styles.root}>
      <Autocomplete.Root
        items={suggestions}
        mode="none"
        modal={false}
        value={query}
        itemToStringValue={cityLabel}
        onValueChange={(value, details) => {
          if (details.reason === "item-press") {
            const city = suggestions.find((c) => cityLabel(c) === value);
            if (city) onCitySelect(city);
            return;
          }
          onQueryChange(value);
        }}
      >
        <Autocomplete.Input
          aria-label="Search for a place"
          render={
            <InputField
              className={styles.searchInput}
              icon={<Search />}
              type="text"
              placeholder="Search for a place..."
            />
          }
        />

        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={4} align="start">
            <Autocomplete.Popup className={styles.popup}>
              {/* Announced to screen readers when it changes */}
              <Autocomplete.Status>
                {isSearchLoading && (
                  <div className={`${styles.item} ${styles.loader}`}>
                    <LoaderCircle className={styles.rotate} size={16} aria-hidden />
                    Loading
                  </div>
                )}
              </Autocomplete.Status>

              {/* List gives the input its aria-controls target */}
              <Autocomplete.List>
                {(city: CityResult) => (
                  <Autocomplete.Item
                    key={city.id}
                    value={city}
                    className={styles.item}
                  >
                    {cityLabel(city)}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
};