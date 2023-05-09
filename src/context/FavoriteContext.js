import React, { useState, createContext } from "react";

export const FavoriteContext = createContext();

export function FavoriteContextProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState([]);

  function updateFavoriteList(object) {
    if (favoriteList.some((item) => item.object.id === object.id)) {
      return;
    }

    setFavoriteList([{ object }, ...favoriteList]);
  }

  function removeFromFavoriteList(id) {
    setFavoriteList(favoriteList.filter((item) => item.object.id !== id));
  }

  return (
    <div>
      <FavoriteContext.Provider
        value={{ favoriteList, updateFavoriteList, removeFromFavoriteList }}
      >
        {children}
      </FavoriteContext.Provider>
    </div>
  );
}
