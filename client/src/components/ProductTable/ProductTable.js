import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";
import ProductFinder from "../../apis/ProductFinder";
import { Table, Button, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const ProductTable = () => {
  const { products, setProducts } = useContext(ProductContext);
  let history = useHistory();

  const columns = [
    {
      title: "Product",
      dataIndex: "product_name",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleProductSelect(record.product_id)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category_name",

      filters: [
        {
          text: "Bread",
          value: "Bread",
        },
        {
          text: "Rolls",
          value: "Rolls",
        },
        {
          text: "Cookies",
          value: "Cookies",
        },
        {
          text: "Pies",
          value: "Pies",
        },
        {
          text: "Pastries",
          value: "Pastries",
        },
        {
          text: "Muffins",
          value: "Muffins",
        },
      ],
      onFilter: (value, record) => record.category_name.indexOf(value) === 0,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Update",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => handleUpdate(record.product_id)}
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
          title="Are you sure you want to delete this product ?"
          okText="Yes"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => handleDelete(record.product_id)}
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
        const response = await ProductFinder.get("/");
        setProducts(response.data.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setProducts]);

  const handleDelete = async (id) => {
    try {
      const response = await ProductFinder.delete(`/${id}`);
      setProducts(
        products.filter((product) => {
          return product.product_id !== id;
        })
      );
      message.success("Product deleted succesfully!");
    } catch (error) {}
  };

  const handleUpdate = (id) => {
    history.push(`/product/${id}/update`);
  };

  const handleProductSelect = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div>
      {products.length > 0 ? (
        <Table
          columns={columns}
          pagination={{ pageSize: 10 }}
          dataSource={products}
          rowKey="product_id"
          bordered
        />
      ) : (
        <h3>Add a product to see the list of products</h3>
      )}
    </div>
  );
};

export default ProductTable;

// const data = [
//   {
//     key: "1",
//     product: "Cake",
//     price: 109,
//     category: "Pastries",
//     stock: 3,
//   },
//
// ];

// function onChange(pagination, filters, sorter, extra) {
//   console.log("params", pagination, filters, sorter, extra);
// }

// const result = products;

// setProducts(
//   products.map(({ product_id, product_name, category_name, ...rest }) => ({
//     ...rest,
//     key: product_id,
//     product: product_name,
//     category: category_name,
//   }))
// );
