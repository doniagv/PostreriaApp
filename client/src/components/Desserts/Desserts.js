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
      name: "Jelly",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "6",
      name: "Muffin",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
    {
      id: "7",
      name: "Bread shell",
      price: 400,
      ingredients: ["Sugar", "Cheese", "Strawberry"],
    },
  ];
  return (
    <div className={classes.DessertsSection}>
      {desserts.map(({ id, name, ingredients, price }) => (
        <Dessert key={id} name={name} ingredients={ingredients} price={price} />
      ))}
    </div>
  );
};

export default Desserts;
