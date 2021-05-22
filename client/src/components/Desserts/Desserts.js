import React from "react";
import classes from "./Desserts.module.css";
import Dessert from "./Dessert/Dessert";

const Desserts = () => {
  const desserts = [
    {
      id: "1",
      name: "Cake",
      price: 230,
      ingredients: ["Sugar", "Flour"],
    },
    {
      id: "2",
      name: "Cheescake",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "3",
      name: "Cheescake",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "4",
      name: "Cheescake",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "5",
      name: "Cheescake",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "6",
      name: "Cheescake",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "7",
      name: "Cheescake",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
  ];
  return (
    <div className={classes.DessertsSection}>
      {desserts.map((dessert) => (
        <Dessert
          key={dessert.id}
          name={dessert.name}
          ingredients={dessert.ingredients}
          price={dessert.price}
        />
      ))}
    </div>
  );
};

export default Desserts;
