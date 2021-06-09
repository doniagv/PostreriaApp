import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";
import IngredientFinder from "../../apis/IngredientFinder";
import { Table, Button, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const IngredientTable = () => {
  const { ingredients, setIngredients } = useContext(ProductContext);
  let history = useHistory();

  const columns = [
    {
      title: "Ingredient",
      dataIndex: "ingredient_name",
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },

    {
      title: "Stock",
      dataIndex: "stock",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Update",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => handleUpdate(record.ingredient_id)}
          style={{ background: "#44516c", borderColor: "#44516c" }}
        >
          Update
        </Button>
      ),
    },
    {
      title: "Delete",
      render: (record) => (
        <Popconfirm
          title="Are you sure you want to delete this ingredient ?"
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
    // {
    //   title: "Add ingredients",
    //   render: () => <Button type="primary">Add ingredients</Button>,
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IngredientFinder.get("/");
        setIngredients(response.data.data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setIngredients]);

  const handleDelete = async (id) => {
    try {
      const response = await IngredientFinder.delete(`/${id}`);
      setIngredients(
        ingredients.filter((ingredient) => {
          return ingredient.ingredient_id !== id;
        })
      );
      message.success("Ingredient deleted succesfully!");
    } catch (error) {}
  };

  const handleUpdate = (id) => {
    history.push(`/ingredient/${id}/update`);
  };

  return (
    <div>
      {ingredients.length > 0 ? (
        <Table
          columns={columns}
          pagination={{ pageSize: 10 }}
          dataSource={ingredients}
          rowKey="ingredient_id"
          bordered
        />
      ) : (
        <h3>Add an ingredient to see the list of ingredients</h3>
      )}
    </div>
  );
};

export default IngredientTable;
