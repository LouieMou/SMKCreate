import React, { useState, createContext } from "react";

export const FavoriteContext = createContext();

export function FavoriteContextProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState([]);

  function updateFavoriteList(object) {
    if (favoriteList.some((item) => item.object.id === object.id)) {
      console.log("Object already exists in favoriteList");
      return;
    }

    setFavoriteList([{ object }, ...favoriteList]);

    console.log("this is the favorite list: ", favoriteList);
  }

  function removeFromFavoriteList(id) {
    setFavoriteList(favoriteList.filter((item) => item.object.id !== id));
    console.log(`Object with id ${id} removed from favoriteList`);
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
