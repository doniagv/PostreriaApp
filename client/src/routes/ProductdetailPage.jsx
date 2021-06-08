import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductsContext";
import ProductFinder from "../apis/ProductFinder";
import IngredientList from "../components/IngredientList/IngredientList";
import AddProductIngredient from "../components/AddProductIngredient/AddProductIngredient";
import classes from "../Styles/ProductDetail.module.css";

const ProductdetailPage = () => {
  const { id } = useParams();
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductFinder.get(`/${id}`);
        setSelectedProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setSelectedProduct]);

  let title;

  switch (selectedProduct.category_id) {
    case 1:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name} 🍞
        </h4>
      );
      break;
    case 2:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name} 🍥
        </h4>
      );
      break;
    case 3:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name} 🍪
        </h4>
      );
      break;
    case 4:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name} 🥧
        </h4>
      );
      break;
    case 5:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name} 🍰
        </h4>
      );
      break;
    case 6:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name} 🧁
        </h4>
      );
      break;
    default:
      title = (
        <h4 className={classes.ProductTitle}>
          {selectedProduct && selectedProduct.product_name}
        </h4>
      );
  }

  return (
    <div>
      {title}
      <div className={classes.Ingredients}>
        <h5 style={{ color: "#56332a", fontFamily: "'Quicksand', sans-serif" }}>
          List of ingredients
        </h5>
        <AddProductIngredient id={id} />
        <IngredientList id={id} />
      </div>
    </div>
  );
};

export default ProductdetailPage;
