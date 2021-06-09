import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Popconfirm, message } from "antd";
import ProductFinder from "../../apis/ProductFinder";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ProductContext } from "../../context/ProductsContext";
import DeleteIngredient from "../../apis/DeleteIngredient";

const IngredientList = (props) => {
  const { id } = useParams();

  const { ingredientsProduct, setIngredientsProduct } =
    useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductFinder.get(`/ingredientlist/${id}`);
        const listOfIngredients = response.data.data.ingredients;
        setIngredientsProduct(listOfIngredients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setIngredientsProduct]);

  const columns = [
    {
      title: "Ingredient",
      dataIndex: "ingredient_name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Measurment Type",
      dataIndex: "measurement_type",
    },

    {
      title: "Delete",
      render: (record) => (
        <Popconfirm
          title="Are you sure you want to delete this ingredient from the product ?"
          okText="Yes"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => handleDelete(record.ingredient_id)}
        >
          <Button
            type="primary"
            style={{ background: "#fb3640", borderColor: "#fb3640" }}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await DeleteIngredient.delete("/", {
        data: { product_id: props.id, ingredient_id: id },
      });
      setIngredientsProduct(
        ingredientsProduct.filter((ingredient) => {
          return ingredient.ingredient_id !== id;
        })
      );
      message.success("Ingredient deleted succesfully!");
    } catch (error) {}
  };

  return (
    <div style={{ padding: "5rem" }}>
      {ingredientsProduct.length > 0 ? (
        <Table
          columns={columns}
          dataSource={ingredientsProduct}
          size="middle"
          rowKey="ingredient_id"
        />
      ) : (
        <p>No ingredients for this product, add ingredients to see them here</p>
      )}
    </div>
  );
};

export default IngredientList;
