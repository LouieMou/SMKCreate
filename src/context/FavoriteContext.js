import React, { useState, createContext } from "react";
import { setSavedObjects } from "../database/Logging";

export const FavoriteContext = createContext();

export function FavoriteContextProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState([]);

  function updateFavoriteList(object) {

    const object_database = {
      id: object.id,
      label: object.label_text,
      category_id: object.category_id
    }

    // sending saved object to database
    setSavedObjects(object_database)

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
