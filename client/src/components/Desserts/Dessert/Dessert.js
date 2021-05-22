import React from "react";
import classes from "./Dessert.module.css";

const Dessert = (props) => {
  return (
    <div className={classes.Dessert}>
      <h3 className={classes.DessertTitle}>{props.name}</h3>
      <div className={classes.Line}></div>
      <li>
        {props.ingredients.map((ingredient) => (
          <ul key={Math.random()}>{ingredient}</ul>
        ))}
      </li>
      <p>
        <span>Price: </span> {props.price}
      </p>
    </div>
  );
};

export default Dessert;
