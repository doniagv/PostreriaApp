import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Input, Form, message } from "antd";

import CategorySelector from "../CategorySelector/CategorySelector";
import ProductFinder from "../../apis/ProductFinder";

const UpdateProductData = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const [product_name, setProductName] = React.useState("");
  const [price, setPrice] = React.useState();
  const [stock, setStock] = React.useState();
  const [categoryid, setCategory] = React.useState();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductFinder.get(`/${id}`);
      setProductName(response.data.data.product_name);
      setPrice(response.data.data.price);
      setStock(response.data.data.stock);
      setCategory(response.data.data.category_id);
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
    const updatedProduct = await ProductFinder.put(`/${id}`, {
      product_name,
      price,
      stock,
      categoryid,
    });
    message.success("Product updated succesfully!");
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
        <Form.Item label="Product Name">
          <Input
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
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
        <Form.Item label="Category">
          <CategorySelector
            value={categoryid}
            onChange={(value) => setCategory(value)}
          />
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

export default UpdateProductData;
