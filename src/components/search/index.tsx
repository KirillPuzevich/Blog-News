import React, { FC, useState } from "react";
import searchWhite from "./img/searchWhite.svg";

interface SearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const Search: FC<SearchProps> = ({ onSearch, placeholder = "Поиск" }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue); 
  };

  return (
    <div className="header__search">
      <input
        className="header__search-txt"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
      />
      <button className="header__search-btn" onClick={handleSearch}>
        <img className="header__search-img" src={searchWhite} alt="search" />
      </button>
    </div>
  );
};
