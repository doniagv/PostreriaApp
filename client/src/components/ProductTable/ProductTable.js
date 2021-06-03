import React from "react";
import { Table, Button } from "antd";
import "antd/dist/antd.css";

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Price",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Category",
    dataIndex: "category",
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
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    defaultSortOrder: "descend",

    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: "Update",
    render: () => (
      <Button
        type="primary"
        style={{ background: "#44516c", borderColor: "#44516c" }}
      >
        Update
      </Button>
    ),
  },
  {
    title: "Delete",
    render: () => (
      <Button
        type="primary"
        style={{ background: "#fb3640", borderColor: "#fb3640" }}
      >
        Delete
      </Button>
    ),
  },
];

const data = [
  {
    key: "1",
    product: "Cake",
    price: 109,
    category: "Pastries",
    stock: 3,
  },
  {
    key: "2",
    product: "Muffin",
    price: 39,
    category: "Muffins",
    stock: 5,
  },
  {
    key: "3",
    product: "Cookie",
    price: 32,
    category: "Cookies",
    stock: 10,
  },
  {
    key: "4",
    product: "Chocolate Cake",
    price: 299,
    category: "Pastries",
    stock: 2,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const ProductTable = () => {
  return (
    <div>
      <Table
        columns={columns}
        pagination={{ pageSize: 10 }}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ProductTable;
