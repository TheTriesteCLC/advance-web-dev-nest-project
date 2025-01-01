import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, Select, message } from "antd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountService from "../../services/Account.service";
import PublicService from "../../services/Public.service";
const { TabPane } = Tabs;
const { Option } = Select;

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

const InternalBankTransfer = ({ form, handleSubmit }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const accountBanking = useSelector((state) => state.accountBanking);
  const myAccount = accountBanking?.account_number || "667788990011";

  const fetchInfo = async (accNumber) => {
    if (accNumber === myAccount) {
      message.error("Không thể chuyển tiền cho chính mình!");
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
      return;
    }

    try {
      const response = await AccountService.getInfoAccountNumberID(accNumber);
      if (response.data) {
        setFullName(response.data.full_name);
        form.setFieldsValue({
          recipientName: response.data.full_name,
          accountNumber: accNumber,
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
    }
  };

  const handleTransfer = async (values) => {
    if (!myAccount) {
      message.error("Không tìm thấy thông tin tài khoản của bạn!");
      return;
    }

    setLoading(true);
    try {
      const payer =
        values.feeType === "sender" ? myAccount : values.accountNumber;

      const response = await PublicService.transaction.transfer(
        myAccount,
        values.accountNumber,
        values.amount,
        values.content || "Chuyển tiền",
        payer
      );

      if (response.data) {
        message.success("Chuyển khoản thành công!");
        form.resetFields();
        setAccountNumber("");
        setFullName("");
      } else if (response.error) {
        message.error(response.error);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi chuyển khoản");
      console.error("Error transfer: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    setAccountNumber(value);
    if (value) {
      fetchInfo(value);
    } else {
      setFullName("");
      form.setFieldsValue({ recipientName: "" });
    }
  };

  useEffect(() => {
    if (location.state?.accountNumber) {
      const accNumber = location.state.accountNumber;
      setAccountNumber(accNumber);
      fetchInfo(accNumber);
    }
  }, [location.state]);
  return (
    <>
    
      <Form form={form} layout="vertical" onFinish={handleTransfer}>
        <Form.Item
          name="accountNumber"
          label="Số tài khoản"
          rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
        >
          <Input
            placeholder="Nhập số tài khoản"
            onChange={handleAccountNumberChange}
            value={accountNumber}
          />
        </Form.Item>

        <Form.Item
          name="recipientName"
          label="Tên người nhận"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số tài khoản để hiển thị tên người nhận!",
            },
          ]}
        >
          <Input
            placeholder="Tên người nhận sẽ tự động hiển thị"
            readOnly
            value={fullName}
          />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Số tiền"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền!" },
            // {
            //   type: "number",
            //   min: 1000,
            //   message: "Số tiền phải lớn hơn 1,000 VND",
            // },
          ]}
        >
          <Input type="number" placeholder="Nhập số tiền" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung chuyển khoản"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea placeholder="Nhập nội dung chuyển khoản" />
        </Form.Item>

        <FeeSelect />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={loading}
          disabled={!accountNumber || !fullName}
        >
          Chuyển khoản
        </Button>
      </Form>
    </>
  );
};

const ExternalBankTransfer = ({ form, handleSubmit }) => {
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
  const [currentTab, setCurrentTab] = useState("internalBank");

  const handleSubmit = (values) => {
    console.log("Form values: ", values);
    const feeMessage =
      values.feeType === "sender" ? "Người gửi trả phí" : "Người nhận trả phí";
    alert(`Chuyển khoản thành công!\n${feeMessage}`);
    form.resetFields();
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <Tabs
        defaultActiveKey="internalBank"
        onChange={(key) => setCurrentTab(key)}
      >
        <TabPane tab="Chuyển khoản trong ngân hàng" key="internalBank">
          <InternalBankTransfer form={form} handleSubmit={handleSubmit} />
        </TabPane>

        <TabPane tab="Chuyển khoản ngân hàng khác" key="externalBank">
          <ExternalBankTransfer form={form} handleSubmit={handleSubmit} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Transfer;
