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

  //   const data = [
  //     {
  //       category_id: 1,
  //       category_name: "Bread",
  //     },
  //     {
  //       category_id: 2,
  //       category_name: "Rolls",
  //     },
  //     {
  //       category_id: 3,
  //       category_name: "Cookies",
  //     },
  //     {
  //       category_id: 4,
  //       category_name: "Pies",
  //     },
  //     {
  //       category_id: 5,
  //       category_name: "Pastries",
  //     },
  //     {
  //       category_id: 6,
  //       category_name: "Muffins",
  //     },
  //   ];

  return (
    <Select required={true} onChange={props.onChange}>
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
