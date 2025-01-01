import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Tag,
} from "antd";
import ColumnSearch from "~/hooks/useSearchTable";
import AccountService from "../../services/Account.service";
import CustomerService from "../../services/Customer.service";
import { debounce } from "lodash";

const ManagerCustomer = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();
  const [balanceForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const debouncedError = debounce((msg) => {
    message.error(msg);
  }, 300);
  useEffect(() => {
    fetchAccounts();
    return () => {
      debouncedError.cancel();
    };
  }, []);

  const fetchAccounts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await AccountService.getAllAccount();
      if (response.data) {
        setAccounts(response.data);
      }
    } catch (error) {
      message.error("Không thể tải danh sách tài khoản");
      console.error("Error fetching accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAccount = () => {
    setEditingAccount(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditAccount = (record) => {
    setEditingAccount(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      account_number: record.account_number,
      account_type: record.account_type,
      bank: record.bank,
    });
  };

  const handleEditBalance = (record) => {
    setEditingAccount(record);
    setIsBalanceModalVisible(true);
    balanceForm.setFieldsValue({ balance: record.balance });
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await AccountService.deleteAccount(accountId);
      message.success("Xóa tài khoản thành công");
      fetchAccounts();
    } catch (error) {
      message.error("Không thể xóa tài khoản");
      console.error("Error deleting account:", error);
    }
  };

  const handleSaveAccount = async () => {
    try {
      const values = await form.validateFields();
      if (editingAccount) {
        await AccountService.updateAccount(editingAccount._id, values);
        message.success("Cập nhật tài khoản thành công");
      } else {
        await AccountService.createAccount(values);
        message.success("Tạo tài khoản thành công");
      }
      setIsModalVisible(false);
      fetchAccounts();
    } catch (error) {
      message.error("Có lỗi xảy ra");
      console.error("Error saving account:", error);
    }
  };

  const handleSaveBalance = async () => {
    try {
      const values = await balanceForm.validateFields();
      await AccountService.updateBalance(editingAccount._id, values.balance);
      message.success("Cập nhật số dư thành công");
      setIsBalanceModalVisible(false);
      fetchAccounts();
    } catch (error) {
      message.error("Không thể cập nhật số dư");
      console.error("Error updating balance:", error);
    }
  };

  const columns = [
    {
      title: "Số Tài Khoản",
      dataIndex: "account_number",
      key: "account_number",
      ...ColumnSearch("account_number"),
    },
    {
      title: "Loại Tài Khoản",
      dataIndex: "account_type",
      key: "account_type",
      filters: [
        { text: "Payment", value: "payment" },
        { text: "Linked", value: "linked" },
      ],
      onFilter: (value, record) => record.account_type === value,
      render: (account_type) => {
        let color = account_type === "payment" ? "green" : "blue";
        return <Tag color={color}>{account_type}</Tag>;
      },
    },
    {
      title: "Ngân Hàng",
      dataIndex: "bank",
      key: "bank",
      ...ColumnSearch("bank"),
    },
    {
      title: "Số Dư",
      dataIndex: "balance",
      key: "balance",
      sorter: (a, b) => a.balance - b.balance,
      render: (balance) => `${balance.toLocaleString()} VND`,
    },
    {
      title: "Quản Lý",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="link" onClick={() => handleEditAccount(record)}>
            Chỉnh Sửa
          </Button>
          <Button type="link" onClick={() => handleEditBalance(record)}>
            Sửa Số Dư
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tài khoản này?"
            onConfirm={() => handleDeleteAccount(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản Lý Tài Khoản Khách Hàng</h1>
      <Button type="primary" onClick={handleAddAccount} className="mb-4">
        Thêm Tài Khoản
      </Button>
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey="_id"
        className="rounded-lg shadow-md"
      />

      <Modal
        title={editingAccount ? "Chỉnh Sửa Tài Khoản" : "Thêm Tài Khoản"}
        open={isModalVisible}
        onOk={handleSaveAccount}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="account_number"
            label="Số Tài Khoản"
            rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
          >
            <Input placeholder="Nhập số tài khoản" />
          </Form.Item>
          <Form.Item
            name="account_type"
            label="Loại Tài Khoản"
            rules={[
              { required: true, message: "Vui lòng chọn loại tài khoản!" },
            ]}
          >
            <Input placeholder="payment/linked" />
          </Form.Item>
          <Form.Item
            name="bank"
            label="Ngân Hàng"
            rules={[
              { required: true, message: "Vui lòng nhập tên ngân hàng!" },
            ]}
          >
            <Input placeholder="Nhập tên ngân hàng" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh Sửa Số Dư"
        open={isBalanceModalVisible}
        onOk={handleSaveBalance}
        onCancel={() => setIsBalanceModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={balanceForm} layout="vertical">
          <Form.Item
            name="balance"
            label="Số Dư Tài Khoản"
            rules={[{ required: true, message: "Vui lòng nhập số dư!" }]}
          >
            <Input type="number" placeholder="Nhập số dư tài khoản" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerCustomer;
