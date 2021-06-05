import React from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdateProductData from "../components/UpdateProductData/UpdateProductData";
import classes from "../components/UpdateProductData/UpdateProductData.module.css";

const UpdateProduct = () => {
  return (
    <div className={classes.UpdateProductSection}>
      <div className={classes.UpdateHeader}>
        <h3>Update Product</h3>
        <EditOutlined />
      </div>

      <UpdateProductData />
    </div>
  );
};

export default UpdateProduct;
