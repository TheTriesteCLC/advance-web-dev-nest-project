import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Tag,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
} from "antd";
import { useSelector } from "react-redux";
import PublicService from "../../services/Public.service";

const DebtReminderManager = () => {
  const customerID = "675babee10466a57086768ee";//
  // const customerID = useSelector((state) => state.profile._id);
  const [debtReminders, setDebtReminders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDebtReminders();
  }, []);

  const fetchDebtReminders = async () => {
    try {
      const sentResponse = await PublicService.debt.getAllDebt_send(customerID);
      const receivedResponse = await PublicService.debt.getAllDebt_received(
        customerID
      );

      if (sentResponse.data && receivedResponse.data) {
        const combinedData = [
          ...sentResponse.data.map((item) => ({ ...item, type: "send" })),
          ...receivedResponse.data.map((item) => ({
            ...item,
            type: "receive",
          })),
        ];
        setDebtReminders(combinedData);
      }
    } catch (error) {
      message.error("Failed to fetch debt reminders");
    }
  };

  const handleCreateDebt = async (values) => {
    try {
      const response = await PublicService.debt.createDebtReminder(
        customerID, // creditor (người tạo nhắc nợ)
        values.debtor, // debtor (người bị nhắc nợ)
        values.amount,
        values.message,
        new Date(),
        "Pending"
      );

      if (response.data) {
        message.success("Tạo nhắc nợ thành công!");
        setIsModalVisible(false);
        form.resetFields();
        fetchDebtReminders(); // Refresh danh sách
      } else {
        message.error("Tạo nhắc nợ thất bại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tạo nhắc nợ");
    }
  };

  const handleDelete = async (record) => {
    try {
      await PublicService.debt.deleteDebtReminder(record._id);
      setDebtReminders((prev) =>
        prev.filter((item) => item._id !== record._id)
      );
      message.success("Xóa nhắc nợ thành công");
    } catch (error) {
      message.error("Xóa nhắc nợ thất bại");
    }
  };

  const handlePay = async (record) => {
    try {
      await PublicService.debt.payDebtReminder(record._id);
      setDebtReminders((prev) =>
        prev.map((item) =>
          item._id === record._id ? { ...item, status: "Paid" } : item
        )
      );
      message.success("Thanh toán nhắc nợ thành công");
    } catch (error) {
      message.error("Thanh toán nhắc nợ thất bại");
    }
  };

  const columns = [
    {
      title: "Chủ Nợ",
      dataIndex: "creditor",
      key: "creditor",
      render: (text) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "200px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Người Nợ",
      dataIndex: "debtor",
      key: "debtor",
      render: (text) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "200px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount.toLocaleString()} VND`,
    },
    {
      title: "Lời Nhắn",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Pending" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = type === "send" ? "blue" : "purple";
        let text = type === "send" ? "Đã gửi" : "Đã nhận";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
          {record.type === "receive" && record.status === "Pending" && (
            <Button type="link" onClick={() => handlePay(record)}>
              Thanh Toán
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản Lý Nhắc Nợ</h1>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Tạo Nhắc Nợ
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={debtReminders}
        rowKey={(record) => record._id}
        style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      />

      {/* Modal Tạo Nhắc Nợ */}
      <Modal
        title="Tạo Nhắc Nợ Mới"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateDebt}>
          <Form.Item
            name="debtor"
            label="ID Người Nợ"
            rules={[{ required: true, message: "Vui lòng nhập ID người nợ!" }]}
          >
            <Input placeholder="Nhập ID người nợ" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Số Tiền"
            rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Nhập số tiền"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label="Lời Nhắn"
            rules={[{ required: true, message: "Vui lòng nhập lời nhắn!" }]}
          >
            <Input.TextArea placeholder="Nhập lời nhắn" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DebtReminderManager;
