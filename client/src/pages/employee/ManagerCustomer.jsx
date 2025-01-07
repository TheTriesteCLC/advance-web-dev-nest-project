import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Tag } from "antd";
import ColumnSearch from "~/hooks/useSearchTable";
import AccountService from "../../services/Account.service";
import AddCustomer from "../../components/employee/AddCustomer";
import { debounce } from "lodash";
const ManagerCustomer = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();
  const [balanceForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionForm] = Form.useForm();
  const [state, setState] = useState(false);
  const debouncedError = debounce((msg) => {
    message.error(msg);
  }, 300);
  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await AccountService.getAllAccount();
      if (response.data) {
        setAccounts(response.data);
      }
    } catch (error) {
      message.error("Không thể tải danh sách tài khoản");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBalance = async (values) => {
    try {
      await AccountService.updateBalance(
        editingAccount.account_number,
        values.balance
      );
      setState(!state);
      message.success("Cập nhật số dư thành công");
      setIsBalanceModalVisible(false);
      balanceForm.resetFields();
    } catch (error) {
      message.error("Không thể cập nhật số dư");
    }
  };

  useEffect(() => {
    fetchAccounts();
    return () => {
      debouncedError.cancel();
    };
  }, [state]);
  const columns = [
    {
      title: "Số Tài Khoản",
      dataIndex: "account_number",
      key: "account_number",
      ...ColumnSearch("account_number", "số tài khoản"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...ColumnSearch("username", "tên đăng nhập"),
    },
    {
      title: "Họ và Tên",
      dataIndex: "full_name",
      key: "full_name",
      ...ColumnSearch("full_name", "họ và tên"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...ColumnSearch("email", "email"),
    },
    {
      title: "Loại Tài Khoản",
      dataIndex: "account_type",
      key: "account_type",
      render: (type) => (
        <Tag color={type === "payment" ? "blue" : "green"}>
          {type === "payment" ? "Payment" : "Linked"}
        </Tag>
      ),
      filters: [
        { text: "Payment", value: "payment" },
        { text: "Linked", value: "linked" },
      ],
      onFilter: (value, record) => record.account_type === value,
    },
    {
      title: "Ngân Hàng",
      dataIndex: "bank",
      key: "bank",
      ...ColumnSearch("bank", "ngân hàng"),
    },
    {
      title: "Số Dư",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => `${balance?.toLocaleString()} VND`,
      sorter: (a, b) => a.balance - b.balance,
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            onClick={() => {
              setEditingAccount(record);
              setIsBalanceModalVisible(true);
              balanceForm.setFieldsValue({ balance: record.balance });
            }}
          >
            Sửa Số Dư
          </Button>
        </div>
      ),
    },
  ];

  const handleCustomerAdded = () => {
    setState(!state);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Tài Khoản</h1>
      <AddCustomer onSuccess={handleCustomerAdded} />
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey="_id"
        loading={isLoading}
        scroll={{ x: true }}
      />

      <Modal
        title="Chỉnh Sửa Số Dư"
        open={isBalanceModalVisible}
        onOk={() => balanceForm.submit()}
        onCancel={() => {
          setIsBalanceModalVisible(false);
          balanceForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={balanceForm} layout="vertical" onFinish={handleSaveBalance}>
          <div className="mb-4">
            <p>
              <strong>Số tài khoản:</strong> {editingAccount?.account_number}
            </p>
            <p>
              <strong>Tên khách hàng:</strong> {editingAccount?.full_name}
            </p>
            <p>
              <strong>Số dư hiện tại:</strong>{" "}
              {editingAccount?.balance?.toLocaleString()} VND
            </p>
          </div>

          <Form.Item
            name="balance"
            label="Số Dư Mới"
            rules={[
              { required: true, message: "Vui lòng nhập số dư!" },
              {
                validator: async (_, value) => {
                  if (value < 0) {
                    throw new Error("Số dư không thể âm!");
                  }
                  if (value === editingAccount?.balance) {
                    throw new Error("Số dư mới phải khác số dư hiện tại!");
                  }
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập số dư mới"
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerCustomer;
