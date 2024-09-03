import React, { useState } from "react";
import { Modal, Tabs, Form, Input, DatePicker, Button } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

const PurchaseModal = ({ visible, onClose, fund, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [form] = Form.useForm();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.getFieldsValue();
      const { amount, sipDate } = values;
      fund.nav = Math.round(fund.minimum_purchase_amount * 1.67)
      const units = Math.ceil(amount / fund.nav); // Calculate units based on amount and NAV
      let payload = {
        fund_id: fund.unique_no,
        units: Math.floor(units), 
        purchase_type: activeTab === "monthly" ? "SIP" : "One-Time",
        total_amount: amount,
        monthly_payment_date: sipDate ? sipDate.date() : 1,
        monthly_payment_amount: amount,
      };
      await onSubmit(payload);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation failed", error);
    }
  };

  return (
    <Modal
      title="Purchase Fund"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Tabs defaultActiveKey="monthly" onChange={handleTabChange}>
        <TabPane tab="Monthly SIP" key="monthly">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Monthly SIP Date"
              name="sipDate"
              rules={[{ required: true, message: "Please select SIP date!" }]}
            >
              <DatePicker
                picker="date"
                onChange={(date) => form.setFieldsValue({ sipDate: date })}
                disabledDate={(current) =>
                  current &&
                  (current < moment().startOf("month") ||
                    current > moment().endOf("month"))
                }
              />
            </Form.Item>
            <Form.Item
              label="SIP Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter SIP amount!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="One-Time" key="one-time">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter amount!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
      <div style={{ textAlign: "right" }}>
        <Button onClick={handleSubmit} type="primary">
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default PurchaseModal;
