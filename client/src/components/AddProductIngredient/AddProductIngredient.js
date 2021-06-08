import React, { useEffect, useContext } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import IngredientSelector from "../IngredientSelector/IngredientSelector";
import AddFinder from "../../apis/AddFinder";
import { ProductContext } from "../../context/ProductsContext";

const AddProductIngredient = (props) => {
  const { addIngredientsProduct } = useContext(ProductContext);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [componentSize, setComponentSize] = React.useState("default");
  const [ingredient, setIngredient] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [ms_type, setMS] = React.useState();
  const [product_id, setProductId] = React.useState();

  useEffect(() => {
    setProductId(props.id);
  }, [props.id]);

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
      const response = await AddFinder.post("/", {
        ingredient_id: ingredient,
        product_id: product_id,
        measurement_type: ms_type,
        quantity: quantity,
      });
      addIngredientsProduct(response.data.data.ingredient);
      setConfirmLoading(false);
      setVisible(false);
      message.success("Ingredient added successfully to product!");
    } catch (error) {
      console.log(error);
    }
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
        title="Add ingredient to product"
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
          <Form.Item label="Ingredient">
            <IngredientSelector onChange={(value) => setIngredient(value)} />
          </Form.Item>

          <Form.Item label="Quantity">
            <Input type="text" onChange={(e) => setQuantity(e.target.value)} />
          </Form.Item>
          <Form.Item label="Measurment Type">
            <Input type="text" onChange={(e) => setMS(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProductIngredient;
