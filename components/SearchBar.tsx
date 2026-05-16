"use client";
import { useState } from "react";
import { Button } from "./Button";
import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";
import { InputField } from "./Input";

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
                    <InputField value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for a place..." className={styles.searchInput} icon={<Search />}/>
                    <Button text="Search" type="submit" className={styles.searchButton} />
                </form>
            </div>
        </div>
    );
};