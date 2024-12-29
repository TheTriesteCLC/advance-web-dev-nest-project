import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Select } from "antd";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;
const my_id = "675babee10466a57086768eb";

const FeeSelect = () => (
  <Form.Item
    name="feeType"
    label="Phí giao dịch"
    rules={[{ required: true, message: "Vui lòng chọn người trả phí!" }]}
  >
    <Select placeholder="Chọn người trả phí">
      <Option value="sender">Người gửi trả phí</Option>
      <Option value="receiver">Người nhận trả phí</Option>
    </Select>
  </Form.Item>
);

const IntraBankTransfer = ({ form, handleSubmit }) => (
  <Form form={form} layout="vertical" onFinish={handleSubmit}>
    {/* Nhập số tài khoản */}
    <Form.Item
      name="accountNumber"
      label="Số tài khoản"
      rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
    >
      <Input placeholder="Nhập số tài khoản" />
    </Form.Item>

    {/* Nhập tên người nhận */}
    <Form.Item
      name="recipientName"
      label="Tên người nhận"
      rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
    >
      <Input placeholder="Nhập tên người nhận" />
    </Form.Item>

    {/* Nhập số tiền */}
    <Form.Item
      name="amount"
      label="Số tiền"
      rules={[{ required: true, message: "Vui lòng nhập s��� tiền!" }]}
    >
      <Input type="number" placeholder="Nhập số tiền" />
    </Form.Item>

    <FeeSelect />

    <Button type="primary" htmlType="submit" className="w-full">
      Chuyển khoản
    </Button>
  </Form>
);

const InterBankTransfer = ({ form, handleSubmit }) => {
  const banks = ["Ngân hàng A", "Ngân hàng B", "Ngân hàng C"];

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {/* Chọn ngân hàng */}
      <Form.Item
        name="bank"
        label="Chọn ngân hàng"
        rules={[{ required: true, message: "Vui lòng chọn ngân hàng!" }]}
      >
        <Select placeholder="Chọn ngân hàng">
          {banks.map((bank, index) => (
            <Option key={index} value={bank}>
              {bank}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Nhập số tài khoản */}
      <Form.Item
        name="accountNumber"
        label="Số tài khoản"
        rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
      >
        <Input placeholder="Nhập số tài khoản" />
      </Form.Item>

      {/* Nhập tên người nhận */}
      <Form.Item
        name="recipientName"
        label="Tên người nhận"
        rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
      >
        <Input placeholder="Nhập tên người nhận" />
      </Form.Item>

      {/* Nhập số tiền */}
      <Form.Item
        name="amount"
        label="Số tiền"
        rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
      >
        <Input type="number" placeholder="Nhập số tiền" />
      </Form.Item>

      <FeeSelect />

      <Button type="primary" htmlType="submit" className="w-full">
        Chuyển khoản
      </Button>
    </Form>
  );
};

const Transfer = () => {
  const [form] = Form.useForm();
  const [currentTab, setCurrentTab] = useState("intraBank");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.accountNumber) {
      form.setFieldsValue({ accountNumber: location.state.accountNumber });
    }
  }, [location.state, form]);

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    const feeMessage =
      values.feeType === "sender" ? "Người gửi trả phí" : "Người nhận trả phí";
    alert(`Chuyển khoản thành công!\n${feeMessage}`);
    form.resetFields();
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <Tabs defaultActiveKey="intraBank" onChange={(key) => setCurrentTab(key)}>
        <TabPane tab="Chuyển khoản trong ngân hàng" key="intraBank">
          <IntraBankTransfer form={form} handleSubmit={handleSubmit} />
        </TabPane>

        <TabPane tab="Chuyển khoản ngân hàng khác" key="interBank">
          <InterBankTransfer form={form} handleSubmit={handleSubmit} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Transfer;
