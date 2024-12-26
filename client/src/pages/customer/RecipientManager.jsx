import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from "antd";
import PublicService from "../../services/Public.service";

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

  const handleDeleteRecipient = async (accountNumber) => {
    const recipient = recipients.find(
      (r) => r.account_number === accountNumber
    );
    if (recipient) {
      await PublicService.reciept.deleteReciept(recipient.customer_id);
      setRecipients((prev) =>
        prev.filter((r) => r.account_number !== accountNumber)
      );
    }
  };

  const fetchDataRecipients = async () => {
    const response = await PublicService.reciept.getRecieptByCustomerID(
      "675babee10466a57086768eb"
    );
    if (response.data) {
      setRecipients(response.data);
    }
  };

  useEffect(() => {
    fetchDataRecipients();
  }, []);

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecipient) {
        const updatedRecipient = {
          customer_id: editingRecipient.customer_id,
          ...values,
        };
        await PublicService.reciept.updateReciept(
          updatedRecipient.customer_id,
          updatedRecipient.account_number,
          updatedRecipient.nickname,
          updatedRecipient.bank
        );
        setRecipients((prev) =>
          prev.map((r) =>
            r.account_number === editingRecipient.account_number
              ? updatedRecipient
              : r
          )
        );
      } else {
        const newRecipient = {
          customer_id: "675babee10466a57086768eb", // Replace with appropriate customer ID
          ...values,
        };
        const response = await PublicService.reciept.createReciept(
          newRecipient.customer_id,
          newRecipient.account_number,
          newRecipient.nickname,
          newRecipient.bank
        );
        if (response.data) {
          setRecipients((prev) => [...prev, response.data]);
        }
      }
      setIsModalVisible(false);
    } catch (error) {
      console.log("Validation or API error:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Số Tài Khoản",
      dataIndex: "account_number",
      key: "account_number",
    },
    {
      title: "Tên Gợi Nhớ",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Ngân Hàng",
      dataIndex: "bank",
      key: "bank",
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
            onConfirm={() => handleDeleteRecipient(record.account_number)}
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
      <Table
        columns={columns}
        dataSource={recipients}
        rowKey="account_number"
      />

      <Modal
        title={editingRecipient ? "Chỉnh Sửa Người Nhận" : "Thêm Người Nhận"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
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
          <Form.Item name="nickname" label="Tên Gợi Nhớ">
            <Input placeholder="Nhập tên gợi nhớ (nếu có)" />
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
    </div>
  );
};

export default RecipientSetup;
