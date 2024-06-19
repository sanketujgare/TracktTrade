import React, { useState } from "react";
import styles from "./Search.module.scss";
import { FaSearch } from "react-icons/fa";
import { SearchProps } from "./Search.types";

// type SearchProps = {
//   handleSearch: (query: string) => void;
// };

const Search = ({ handleSearch }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  const handleIconClick = () => {
    setActive(!active);
  };
  // ${active ? styles.active : ""}
  return (
    <div className={`${styles.searchContainer} `}>
      <FaSearch className={`${styles.searchIcon}`} onClick={handleIconClick} />
      <div
        className={`${styles.SearchInputContainer} ${
          active ? styles.active : ""
        } `}
        // onClick={handleIconClick}
      >
        <input
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
        />
        <button className={styles.searchButton} onClick={handleButtonClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
