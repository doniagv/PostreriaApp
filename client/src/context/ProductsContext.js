import React, { useState, createContext } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([null]);
  const [ingredientsProduct, setIngredientsProduct] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState();

  const addProducts = (product) => {
    setProducts([...products, product]);
  };

  const addIngredients = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const addIngredientsProduct = (ingredient) => {
    setIngredientsProduct([...ingredientsProduct, ingredient]);
  };

  const addExpenses = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addTotalExpense = (total) => {
    if (totalExpense === null) {
      setTotalExpense(parseInt(total));
    } else {
      setTotalExpense(parseInt(totalExpense) + parseInt(total));
    }
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
        ingredients,
        setIngredients,
        addIngredients,
        expenses,
        setExpenses,
        addExpenses,
        totalExpense,
        setTotalExpense,
        addTotalExpense,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
