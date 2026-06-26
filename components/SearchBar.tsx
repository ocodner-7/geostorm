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

export const SearchBar = ({
  query,
  onQueryChange,
  suggestions,
  isSearchLoading,
  onCitySelect,
}: SearchBarProps) => {


  return (
    <div className={styles.root}>
      <Autocomplete.Root items={suggestions}>
        <Autocomplete.Input
          render={
            <InputField
              className={styles.searchInput}
              icon={<Search />}
              type="text"
              value={query}
              onChange={(e) => {
                onQueryChange(e.target.value);
              }}
              placeholder="Search for a place..."
            />
          }
        />

        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={4} align="start">
            <Autocomplete.Popup className={styles.popup}>
              {isSearchLoading && (
                <Autocomplete.Item className={styles.item} disabled>
                  <div className={styles.loader}>
                    <LoaderCircle className={styles.rotate} size={16} />
                    Loading
                  </div>
                </Autocomplete.Item>
              )}

              {suggestions.map((city) => (
                <Autocomplete.Item
                  className={styles.item}
                  key={city.id}
                  value={city.cityName}
                  onClick={() => {
                    onCitySelect(city)     
                }}
                >
                  {city.cityName}, {city.country}
                </Autocomplete.Item>
              ))}
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
};
