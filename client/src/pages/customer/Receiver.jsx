import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from "antd";

const RecipientSetup = () => {
  const [recipients, setRecipients] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState(null);

  const [form] = Form.useForm();

  const handleAddRecipient = () => {
    setEditingRecipient(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditRecipient = (record) => {
    setEditingRecipient(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDeleteRecipient = (accountNumber) => {
    setRecipients((prev) => prev.filter((r) => r.sotk !== accountNumber));
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingRecipient) {
          setRecipients((prev) =>
            prev.map((r) =>
              r.sotk === editingRecipient.sotk ? { ...r, ...values } : r
            )
          );
        } else {
          setRecipients((prev) => [
            ...prev,
            {
              ...values,
              tengoinho: values.tengoinho || values.sotk, // Default tengoinho if not provided
            },
          ]);
        }
        setIsModalVisible(false);
      })
      .catch((info) => console.log("Validation Failed:", info));
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Số Tài Khoản",
      dataIndex: "sotk",
      key: "sotk",
    },
    {
      title: "Tên Gợi Nhớ",
      dataIndex: "tengoinho",
      key: "tengoinho",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditRecipient(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người nhận này?"
            onConfirm={() => handleDeleteRecipient(record.sotk)}
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Thiết Lập Danh Sách Người Nhận</h1>
      <Button type="primary" onClick={handleAddRecipient} className="mb-4">
        Thêm Người Nhận
      </Button>
      <Table columns={columns} dataSource={recipients} rowKey="sotk" />

      <Modal
        title={editingRecipient ? "Chỉnh Sửa Người Nhận" : "Thêm Người Nhận"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="sotk"
            label="Số Tài Khoản"
            rules={[{ required: true, message: "Vui lòng nhập số tài khoản!" }]}
          >
            <Input placeholder="Nhập số tài khoản" />
          </Form.Item>
          <Form.Item name="tengoinho" label="Tên Gợi Nhớ">
            <Input placeholder="Nhập tên gợi nhớ (nếu có)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RecipientSetup;
