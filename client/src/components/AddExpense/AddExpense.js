import React, { useContext } from "react";
import { Button, Modal, Input, Form, message, DatePicker } from "antd";
import moment from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import ExpenseFinder from "../../apis/ExpenseFinder";
import { ProductContext } from "../../context/ProductsContext";

const AddExpense = () => {
  const today = new Date();
  const { addTotalExpense, addExpenses } = useContext(ProductContext);
  const { TextArea } = Input;
  const dateFormat = "YYYY-MM-DD";
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [componentSize, setComponentSize] = React.useState("default");
  const [total, setTotal] = React.useState();
  const [description, setDescription] = React.useState("");
  const [expense_date, setExpenseDate] = React.useState(
    moment(today, dateFormat)
  );

  const dd = String(today.getDate());
  const mm = String(today.getMonth());
  const yyyy = today.getFullYear();

  const formatToday = mm + "-" + dd + "-" + yyyy;

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setConfirmLoading(true);
    console.log(
      `total: ${total}, desciption: ${description}, expense_date: ${expense_date}`
    );
    try {
      const response = await ExpenseFinder.post("/", {
        expense_total: total,
        description: description,
        expense_date: expense_date,
      });
      // addIngredients(response.data.data.ingredient);

      addExpenses(response.data.data.expense);
      addTotalExpense(total);
      setConfirmLoading(false);
      setVisible(false);
      message.success("Expense added successfully!");
    } catch (error) {}
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  function dateChange(data, dateString) {
    setExpenseDate(dateString);
  }

  return (
    <div>
      <Button
        style={{ margin: "1rem" }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add Expense
      </Button>
      <Modal
        title="Add new expense"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 8,
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
          <Form.Item label="Total">
            <Input type="number" onChange={(e) => setTotal(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              showCount
              maxLength={50}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Data of Expense">
            <DatePicker
              defaultValue={moment(today, dateFormat)}
              format={dateFormat}
              onChange={dateChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddExpense;
