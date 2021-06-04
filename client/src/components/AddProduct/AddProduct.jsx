import React, { useContext } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
// import NumericInput from "../InputNumber/InputNumber";
import CategorySelector from "../CategorySelector/CategorySelector";
import ProductFinder from "../../apis/ProductFinder";
import { ProductContext } from "../../context/ProductsContext";

const AddProduct = () => {
  const { addProducts } = useContext(ProductContext);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [componentSize, setComponentSize] = React.useState("default");
  const [product_name, setProductName] = React.useState("");
  const [price, setPrice] = React.useState();
  const [stock, setStock] = React.useState();
  const [category, setCategory] = React.useState();

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
      const response = await ProductFinder.post("/", {
        product_name: product_name,
        price: price,
        category_id: category,
        stock: stock,
      });

      addProducts(response.data.data.product);
      setConfirmLoading(false);
      setVisible(false);
      message.success("Product added successfully!");
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
        Add product
      </Button>
      <Modal
        title="Add new product"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 5,
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
          <Form.Item label="Product Name">
            <Input
              required={true}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input type="number" onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item label="Stock">
            <Input type="number" onChange={(e) => setStock(e.target.value)} />
          </Form.Item>
          <Form.Item label="Category">
            <CategorySelector onChange={(value) => setCategory(value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
