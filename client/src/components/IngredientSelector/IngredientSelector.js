import React, { useState, useEffect } from "react";
import { Select } from "antd";
import IngredientFinder from "../../apis/IngredientFinder";

const IngredientSelector = (props) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IngredientFinder.get("/");
        setIngredients({ ingredients: response.data.data.ingredients });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setIngredients]);

  return (
    <Select required={true} value={props.value} onChange={props.onChange}>
      {ingredients.length !== 0 ? (
        ingredients.ingredients.map((ingredient) => (
          <Select.Option
            key={ingredient.ingredient_id}
            value={ingredient.ingredient_id}
          >
            {ingredient.ingredient_name}
          </Select.Option>
        ))
      ) : (
        <Select.Option>No data</Select.Option>
      )}
    </Select>
  );
};

export default IngredientSelector;
