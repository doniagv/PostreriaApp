import React from "react";
import classes from "./Hero.module.css";
import bg from "./bakerybgt.jpg";
import ProductTable from "../ProductTable/ProductTable";
import { Button } from "antd";
import { ShopOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Hero = () => {
  return (
    <div>
      <div className={classes.Hero} style={{ backgroundImage: `url(${bg})` }}>
        <h1>Bakery Inventory System</h1>
      </div>
      <div className={classes.ProductsSection}>
        <div className={classes.ProductsHeader}>
          <h2>Products</h2>
          <ShopOutlined style={{ fontSize: "3rem", color: "#fff" }} />
        </div>
        <div className={classes.ProductTableSection}>
          <Button style={{ margin: "1rem" }} icon={<PlusCircleOutlined />}>
            Add product
          </Button>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Hero;
