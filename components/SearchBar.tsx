"use client";
import { useState } from "react";
import { Button } from "./Button";
import styles from "./SearchBar.module.css";
import { Divide, Search } from "lucide-react";
import { InputField } from "./Input";
import { useCitySearch } from "@/data/queries/useCitySearch";
import type { CityResult } from "@/types";
import { Autocomplete } from "@base-ui/react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  suggestions: CityResult[];
  isSearchLoading: boolean;
  error: Error | null;
  onCitySelect: (city: CityResult) => void;
}

export const SearchBar = ({
  query,
  onQueryChange,
  suggestions,
  isSearchLoading,
  error,
  onCitySelect,
}: SearchBarProps) => {
  const [selected, setSelected] = useState<CityResult | null>(null);
  const [open, setOpen] = useState(true);

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
                setOpen(true);
                setSelected(null);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search for a place..."
            />
          }
        />

        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={4} align="start">
            <Autocomplete.Popup className={styles.popup}>
              {isSearchLoading && <div>Loading...</div>}

              {error && <div>Error</div>}

              {suggestions.length === 0 && !isSearchLoading && (
                <div>No results</div>
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

      <Button
        className={styles.searchButton}
        // onClick={handleSearchClick}
        disabled={suggestions.length === 0}
        text="Search"
      />
    </div>
  );
};
