import React, { useState, createContext } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const addProducts = (product) => {
    setProducts([...products, product]);
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, addProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};
