import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Tag, message } from "antd";
import PublicService from "../../services/Public.service";

const my_id = "675db7c4cb2b0bf8ef4ffbf3";

const DebtReminderManager = () => {
  const [debtReminders, setDebtReminders] = useState([]);

  useEffect(() => {
    fetchDebtReminders();
  }, []);

  const fetchDebtReminders = async () => {
    try {
      const sentResponse = await PublicService.debt.getAllDebtbyCustomer(my_id);
      const receivedResponse = await PublicService.debt.deleteDebtReminder(
        my_id
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

  const handleDelete = async (record) => {
    try {
      await PublicService.debt.deleteDebtReminder(record._id);
      setDebtReminders((prev) =>
        prev.filter((item) => item._id !== record._id)
      );
      message.success("Debt reminder deleted successfully");
    } catch (error) {
      message.error("Failed to delete debt reminder");
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
      message.success("Debt reminder paid successfully");
    } catch (error) {
      message.error("Failed to pay debt reminder");
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
          <Button type="link" onClick={() => handlePay(record)}>
            Thanh Toán
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản Lý Nhắc Nợ</h1>
      <Table
        columns={columns}
        dataSource={debtReminders}
        rowKey={(record) => record._id}
        style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      />
    </div>
  );
};

export default DebtReminderManager;
