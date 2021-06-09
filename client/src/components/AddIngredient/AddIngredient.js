import React, { useContext } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import IngredientFinder from "../../apis/IngredientFinder";
import { ProductContext } from "../../context/ProductsContext";

const AddIngredient = () => {
  const { addIngredients } = useContext(ProductContext);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [componentSize, setComponentSize] = React.useState("default");
  const [ingredient_name, setIngredientName] = React.useState("");
  const [price, setPrice] = React.useState();
  const [stock, setStock] = React.useState();
  const [type, setType] = React.useState();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setConfirmLoading(true);
    try {
      const response = await IngredientFinder.post("/", {
        ingredient_name: ingredient_name,
        price: price,
        stock: stock,
        type: type,
      });
      addIngredients(response.data.data.ingredient);
      setConfirmLoading(false);
      setVisible(false);
      message.success("Ingredient added successfully!");
    } catch (error) {}
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <div>
      <Button
        style={{ margin: "1rem" }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add ingredient
      </Button>
      <Modal
        title="Add new ingredient"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item label="Ingredient Name">
            <Input
              required={true}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input type="number" onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item label="Stock">
            <Input type="number" onChange={(e) => setStock(e.target.value)} />
          </Form.Item>
          <Form.Item label="Type">
            <Input required={true} onChange={(e) => setType(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddIngredient;
