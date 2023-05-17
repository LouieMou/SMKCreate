import { React, useContext } from "react";
import { useNavigate, generatePath } from "react-router-dom";
/* Components */
import CategoryItem from "../CategoryItem/CategoryItem";
/* Context */
import { SearchContext } from "../../context/SearchContext";
/* Styles */
import "./CategoryGrid.css";

export default function CategoryGrid(props) {
  const { setCategoryIdAndFilter } = useContext(SearchContext);
  const navigate = useNavigate();

  function handleClick(category) {
    setCategoryIdAndFilter(category, undefined);
    const path = generatePath("/search/:id", {
      id: category.name.toLowerCase(),
    });
    navigate(path);
  }

  return (
    <div className="category-grid">
      {props.data.map((item, index) => {
        return (
          <CategoryItem
            key={index}
            source1={`categories/${item.category.name}1.png`}
            source2={`categories/${item.category.name}2.png`}
            source3={`categories/${item.category.name}3.png`}
            title={item.category.name}
            handleClick={() => handleClick(item.category)}
          />
        );
      })}
    </div>
  );
}
