import React, { useContext, useEffect } from "react";
import classes from "./Expense.module.css";
import {
  BarChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Row, Col, Statistic, Card } from "antd";
import AddExpense from "../AddExpense/AddExpense";
import Expenses from "../Expenses/Expenses";
import { ProductContext } from "../../context/ProductsContext";
import ExpenseFinder from "../../apis/ExpenseFinder";

const Expense = () => {
  const { totalExpense, setTotalExpense } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ExpenseFinder.get("/total");
        const total = response.data.data.total;
        console.log(response.data.data.total);
        setTotalExpense(total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setTotalExpense]);

  return (
    <div className={classes.ExpensesSection}>
      <div className={classes.HeaderExpenses}>
        <h2>Finances</h2>
        <BarChartOutlined />
      </div>
      <Row>
        <Col span={12}>
          <h3>Expenses</h3>
          <Card>
            <Statistic
              title="Total expenses"
              value={totalExpense !== null ? totalExpense : 0}
              precision={1}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="$"
            />
          </Card>
          <AddExpense />
          <Expenses />
        </Col>
        <Col span={12}>
          <h3>Incomes</h3>
          <Card>
            <Statistic
              title="Total incomes"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Expense;
