import React from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdateIngredientData from "../components/UpdateIngredientData/UpdateIngredientData";
import classes from "../components/UpdateProductData/UpdateProductData.module.css";

const UpdateIngredient = () => {
  return (
    <div className={classes.UpdateProductSection}>
      <div className={classes.UpdateHeader}>
        <h3>Update Ingredient</h3>
        <EditOutlined />
      </div>

      <UpdateIngredientData />
    </div>
  );
};

export default UpdateIngredient;
