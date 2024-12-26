import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import ColumnSearch from "~/hooks/useSearchTable";

const initialEmployees = [
  {
    FullName: "Nguyen Van A",
    Gmail: "nguyenvana@gmail.com",
    Password: "123456",
  },
  {
    FullName: "Nguyen Van B",
    Gmail: "nguyenvanb@gmail.com",
    Password: "abcdef",
  },
];

const ManagerEmployee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditEmployee = (record) => {
    setEditingEmployee(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      FullName: record.FullName,
      Gmail: record.Gmail,
    });
  };

  const handleChangePassword = (record) => {
    setEditingEmployee(record);
    setIsPasswordModalVisible(true);
    passwordForm.resetFields();
  };

  const handleSaveEmployee = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingEmployee) {
          setEmployees((prev) =>
            prev.map((employee) =>
              employee.Gmail === editingEmployee.Gmail
                ? { ...employee, ...values }
                : employee
            )
          );
        } else {
          setEmployees((prev) => [...prev, values]);
        }
        setIsModalVisible(false);
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  const handleSavePassword = () => {
    passwordForm
      .validateFields()
      .then((values) => {
        setEmployees((prev) =>
          prev.map((employee) =>
            employee.Gmail === editingEmployee.Gmail
              ? { ...employee, Password: values.Password }
              : employee
          )
        );
        setIsPasswordModalVisible(false);
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
      title: "Email",
      dataIndex: "Gmail",
      key: "Gmail",
      ...ColumnSearch("FullName"),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEditEmployee(record)}>
            Chỉnh Sửa
          </Button>
          <Button type="link" onClick={() => handleChangePassword(record)}>
            Đổi Mật Khẩu
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản Lý Nhân Viên</h1>
      <Button type="primary" onClick={handleAddEmployee} className="mb-4">
        Thêm Nhân Viên
      </Button>
      <Table columns={columns} dataSource={employees} rowKey="Gmail" />

      {/* Modal for Adding or Editing Employee */}
      <Modal
        title={editingEmployee ? "Chỉnh Sửa Nhân Viên" : "Thêm Nhân Viên"}
        visible={isModalVisible}
        onOk={handleSaveEmployee}
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
            name="Gmail"
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
          {!editingEmployee && (
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

      {/* Modal for Changing Password */}
      <Modal
        title="Đổi Mật Khẩu"
        visible={isPasswordModalVisible}
        onOk={handleSavePassword}
        onCancel={() => setIsPasswordModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            name="Password"
            label="Mật Khẩu Mới"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerEmployee;
