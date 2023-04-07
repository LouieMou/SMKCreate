import React, { useState, createContext } from "react";

export const FavoriteContext = createContext();

export function FavoriteContextProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState([]);

  function updateFavoriteList(object) {
    /*     if (favoriteList.some((item) => item.id !== object.id)) {
      console.log("Object already exists in favoriteList");
      return;
    } */
    setFavoriteList([{ object }, ...favoriteList]);

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
