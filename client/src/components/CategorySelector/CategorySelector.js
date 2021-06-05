import React, { useState, useEffect } from "react";
import { Select } from "antd";
import CategoryFinder from "../../apis/CategoryFinder";

const CategorySelector = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryFinder.get("/");
        setCategories({ categories: response.data.data.categories });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setCategories]);

  return (
    <Select required={true} value={props.value} onChange={props.onChange}>
      {categories.length !== 0 ? (
        categories.categories.map((category) => (
          <Select.Option
            key={category.category_id}
            value={category.category_id}
          >
            {category.category_name}
          </Select.Option>
        ))
      ) : (
        <Select.Option>No data</Select.Option>
      )}
    </Select>
  );
};

export default CategorySelector;
