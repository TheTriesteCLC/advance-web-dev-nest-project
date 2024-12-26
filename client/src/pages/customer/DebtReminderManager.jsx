import React from "react";
import { Table, Button, Popconfirm,Tag } from "antd";
import _ from "lodash";

const dataDebtRemindersend = [
  {
    creditor: "675babee10466a5sadfasdfadsffsdafsadf7086768ee",
    debtor: "675babee104sadfsadfadasfasfsdffasdfdasfasdf66a57086768eb",
    amount: 2500000,
    message: "Monthly rent payment",
    createdAt: "2024-12-10T08:30:00.000Z",
    status: "Pending",
  },
];

const dataDebtReminderreceive = [
  {
    creditor: "675babfadsffsdafsadf7086768ee",
    debtor: "675babee104sad086768eb",
    amount: 2400000,
    message: "Monthly rent payment",
    createdAt: "2024-12-10T08:30:00.000Z",
    status: "Pending",
  },
];

const combinedData = _.concat(
  dataDebtRemindersend.map((item) => ({ ...item, type: "send" })),
  dataDebtReminderreceive.map((item) => ({ ...item, type: "receive" }))
);

const DebtReminderManager = () => {
  const handleDelete = (record) => {
    console.log("Delete record:", record);
    // Add delete logic here
  };

  const handlePay = (record) => {
    console.log("Pay record:", record);
    // Add payment logic here
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
      }
      
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
        dataSource={combinedData}
        rowKey={(record) => `${record.creditor}-${record.debtor}`}
        style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      />
    </div>
  );
};

export default DebtReminderManager;
