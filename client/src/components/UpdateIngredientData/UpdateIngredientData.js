import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Input, Form, message } from "antd";
import IngredientFinder from "../../apis/IngredientFinder";

const UpdateIngredientData = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const [ingredient_name, setIngredientName] = React.useState("");
  const [price, setPrice] = React.useState();
  const [stock, setStock] = React.useState();
  const [type, setType] = React.useState();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await IngredientFinder.get(`/${id}`);
      setIngredientName(response.data.data.ingredient_name);
      setPrice(response.data.data.price);
      setStock(response.data.data.stock);
      setType(response.data.data.type);
    };
    fetchData();
  }, [id]);

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 7,
          },
          wrapperCol: {
            span: 10,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 7,
          },
        }
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedIngredient = await IngredientFinder.put(`/${id}`, {
      ingredient_name,
      price,
      stock,
      type,
    });
    message.success("Ingredient updated succesfully!");
    history.push("/");
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Ingredient Name">
          <Input
            value={ingredient_name}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Stock">
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Type">
          <Input value={type} onChange={(e) => setType(e.target.value)} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateIngredientData;
