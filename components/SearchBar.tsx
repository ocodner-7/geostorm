"use client";
import { useState } from "react";
import { Button } from "./Button";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSearch: (query: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {

    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if(!query.trim()) return;
        onSearch(query.trim());
        setQuery("");
    };

    return (
        <div className={styles.root}>
            <div className={styles.searchBar}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for a place..." className={styles.searchInput} />
                    <Button text="Search" type="submit" className={styles.searchButton} />
                </form>
            </div>
        </div>
    );
};