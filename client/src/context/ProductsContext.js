import React, { useState, createContext } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([null]);
  const [ingredientsProduct, setIngredientsProduct] = useState([]);

  const addProducts = (product) => {
    setProducts([...products, product]);
  };

  const addIngredientsProduct = (ingredient) => {
    setIngredientsProduct([...ingredientsProduct, ingredient]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProducts,
        selectedProduct,
        setSelectedProduct,
        ingredientsProduct,
        setIngredientsProduct,
        addIngredientsProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
