import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import ColumnSearch from "~/hooks/useSearchTable";
const generateRandomVisa = () => {
  return Math.floor(10000000000 + Math.random() * 90000000000).toString();
};

const initialUsers = [
  {
    FullName: "Nguyen Van A",
    UserName: "nguyenvana",
    Phone: "0123456789",
    Email: "nguyenvana@gmail.com",
    Password: "123456",
    Visa: generateRandomVisa(),
    AccountBalance: 1000000,
  },
  {
    FullName: "Nguyen Van B",
    UserName: "nguyenvanb",
    Phone: "0123456789",
    Email: "nguyenvanb@gmail.com",
    Password: "123456",
    Visa: generateRandomVisa(),
    AccountBalance: 2000000,
  },
  {
    FullName: "Nguyen Van C",
    UserName: "nguyenvanc",
    Phone: "0123456789",
    Email: "nguyenvanc@gmail.com",
    Password: "123456",
    Visa: generateRandomVisa(),
    AccountBalance: 3000000,
  },
];

const ManagerCustomer = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingBalanceUser, setEditingBalanceUser] = useState(null);
  const [form] = Form.useForm();
  const [balanceForm] = Form.useForm();

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      FullName: record.FullName,
      Phone: record.Phone,
      Email: record.Email,
    });
  };

  const handleEditBalance = (record) => {
    setEditingBalanceUser(record);
    setIsBalanceModalVisible(true);
    balanceForm.setFieldsValue({ AccountBalance: record.AccountBalance });
  };

  const handleDeleteUser = (userName) => {
    setUsers((prev) => prev.filter((user) => user.UserName !== userName));
  };

  const handleSaveUser = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          setUsers((prev) =>
            prev.map((user) =>
              user.UserName === editingUser.UserName
                ? { ...user, ...values }
                : user
            )
          );
        } else {
          const newUser = {
            ...values,
            UserName: values.UserName,
            Password: values.Password,
            Visa: generateRandomVisa(),
            AccountBalance: 0,
          };
          setUsers((prev) => [...prev, newUser]);
        }
        setIsModalVisible(false);
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  const handleSaveBalance = () => {
    balanceForm
      .validateFields()
      .then((values) => {
        setUsers((prev) =>
          prev.map((user) =>
            user.UserName === editingBalanceUser.UserName
              ? { ...user, AccountBalance: values.AccountBalance }
              : user
          )
        );
        setIsBalanceModalVisible(false);
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "FullName",
      key: "FullName",
      ...ColumnSearch("FullName"),
    },
    {
      title: "Tên Đăng Nhập",
      dataIndex: "UserName",
      key: "UserName",
      ...ColumnSearch("UserName"),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "Phone",
      key: "Phone",
      ...ColumnSearch("Phone"),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      ...ColumnSearch("Email"),
    },
    {
      title: "Visa",
      dataIndex: "Visa",
      key: "Visa",
    },
    {
      title: "Số Dư Tài Khoản",
      dataIndex: "AccountBalance",
      key: "AccountBalance",
      sorter: (a, b) => a.AccountBalance - b.AccountBalance,
      render: (balance) => `${balance.toLocaleString()} VND`,
    },
    {
      title: "Quản Lý",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditUser(record)}>
            Chỉnh Sửa Thông Tin
          </Button>
          <Button type="link" onClick={() => handleEditBalance(record)}>
            Chỉnh Sửa Số Dư
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tài khoản này?"
            onConfirm={() => handleDeleteUser(record.UserName)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản Lý Tài Khoản Khách Hàng</h1>
      <Button type="primary" onClick={handleAddUser} className="mb-4">
        Thêm Tài Khoản
      </Button>
      <div className="rounded-lg shadow-md">
        <Table columns={columns} dataSource={users} rowKey="UserName" />
      </div>
      <Modal
        title={editingUser ? "Chỉnh Sửa Tài Khoản" : "Thêm Tài Khoản"}
        open={isModalVisible}
        onOk={handleSaveUser}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="FullName"
            label="Họ và Tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name="Phone"
            label="Số Điện Thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          {!editingUser && (
            <Form.Item
              name="Password"
              label="Mật Khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Modal
        title="Chỉnh Sửa Số Dư"
        visible={isBalanceModalVisible}
        onOk={handleSaveBalance}
        onCancel={() => setIsBalanceModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={balanceForm} layout="vertical">
          <Form.Item
            name="AccountBalance"
            label="Số Dư Tài Khoản"
            rules={[
              { required: true, message: "Vui lòng nhập số dư tài khoản!" },
            ]}
          >
            <Input type="number" placeholder="Nhập số dư tài khoản" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerCustomer;
