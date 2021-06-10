import React, { useContext, useEffect } from "react";
import { Collapse, List } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import ExpenseFinder from "../../apis/ExpenseFinder";
import { ProductContext } from "../../context/ProductsContext";

const Expenses = () => {
  const { expenses, setExpenses } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ExpenseFinder.get("/");
        const listOfExpenses = response.data.data.expenses;
        setExpenses(listOfExpenses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setExpenses]);

  const { Panel } = Collapse;
  return (
    <div style={{ marginBottom: "2rem" }}>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {expenses.map((expense) => {
          return (
            <Panel
              style={{ fontFamily: "quicksand", fontSize: "1.1rem" }}
              header={expense.description}
              key={expenses.expense_id}
              className="site-collapse-custom-panel"
            >
              <p>
                {"Total: $" +
                  expense.expense_total +
                  "Expense Date: " +
                  expense.expense_date}
              </p>
            </Panel>
          );
        })}
        {/* <Panel
            header="Expense de prueba 2021-03-2"
            key="1"
            className="site-collapse-custom-panel"
            >
            <p>{text}</p>
            </Panel>
            <Panel
            header="This is panel header 2"
            key="2"
            className="site-collapse-custom-panel"
            >
            <p>{text}</p>
            </Panel>
            <Panel
            header="This is panel header 3"
            key="3"
            className="site-collapse-custom-panel"
            >
            <p>{text}</p>
            </Panel> */}
      </Collapse>
    </div>
  );
};

export default Expenses;
