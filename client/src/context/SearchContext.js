import React, { useState, createContext } from "react";

export const SearchContext = createContext();

export function SearchContextProvider({ children }) {

  const [search, setSearch] = useState(null);

  function setCategoryIdAndFilter(category, filter) {
    let categoryIdAndFilter = {
      category_id: category.id,
      category_name: category.name,
      filter_label: undefined,
    };
    if (filter) {
      categoryIdAndFilter.filter_label = filter
    }
    setSearch(categoryIdAndFilter);
  }

  return (
    <SearchContext.Provider value={{ search, setCategoryIdAndFilter }}>
      {children}
    </SearchContext.Provider>
  );
}
