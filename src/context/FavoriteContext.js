import React, { useState, createContext } from "react";

export const FavoriteContext = createContext();

export function FavoriteContextProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState([]);

  function updateFavoriteList(object) {
    if (favoriteList.length === 0) {
      setFavoriteList([object]);
    } else {
      setFavoriteList([object, ...favoriteList]);
    }
    console.log("this is the favorite list: ", favoriteList);
  }

  return (
    <div>
      <FavoriteContext.Provider value={{ favoriteList, updateFavoriteList }}>
        {children}
      </FavoriteContext.Provider>
    </div>
  );
}
