import React from "react";
import { Table, Tag } from "antd";
import ColumnSearch from "~/hooks/useSearchTable";

const dataHistoryTransfer = [
  {
    idTransfer: 1,
    idsender: 1,
    sender: "Nguyen Van A",
    idreceiver: 2,
    receiver: "Nguyen Van B",
    amount: 100000,
    type: "send", // send or receive
    message: "Chuyen tien",
    time: "2021-09-01T00:00:00.000Z",
    status: "Success",
  },
  {
    idTransfer: 2,
    idsender: 2,
    sender: "Nguyen Van B",
    idreceiver: 3,
    receiver: "Nguyen Van C",
    amount: 200000,
    type: "receive", // send or receive
    message: "Chuyen tien",
    time: "2021-09-01T00:00:00.000Z",
    status: "Success",
  },
  {
    idTransfer: 3,
    idsender: 3,
    sender: "Nguyen Van C",
    idreceiver: 1,
    receiver: "Nguyen Van A",
    amount: 300000,
    type: "send", // send or receive
    message: "Chuyen tien",
    time: "2021-09-01T00:00:00.000Z",
    status: "Success",
  },
  {
    idTransfer: 4,
    idsender: 1,
    sender: "Nguyen Van A",
    idreceiver: 2,
    receiver: "Nguyen Van B",
    amount: 100000,
    type: "send", // send or receive
    message: "Chuyen tien",
    time: "2021-09-01T00:00:00.000Z",
    status: "Success",
  },
  {
    idTransfer: 5,
    idsender: 2,
    sender: "Nguyen Van B",
    idreceiver: 3,
    receiver: "Nguyen Van C",
    amount: 200000,
    type: "send", // send or receive
    message: "Chuyen tien",
    time: "2021-09-01T00:00:00.000Z",
    status: "Success",
  },
];

const HistoryTransfer = () => {
  const columns = [
    {
      title: "ID Giao Dịch",
      dataIndex: "idTransfer",
      key: "idTransfer",
      sorter: (a, b) => a.idTransfer - b.idTransfer,
    },
    {
      title: "Người Gửi",
      dataIndex: "sender",
      key: "sender",
      ...ColumnSearch("sender"),
    },
    {
      title: "Người Nhận",
      dataIndex: "receiver",
      key: "receiver",
      ...ColumnSearch("receiver"),
    },
    {
      title: "Số Tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => {
        const color = record.type === "send" ? "red" : "green";
        const sign = record.type === "send" ? "-" : "+";
        return (
          <span
            style={{ color }}
          >{`${sign} ${amount.toLocaleString()} VND`}</span>
        );
      },
    },
    {
      title: "Loại Giao Dịch",
      dataIndex: "type",
      key: "type",
      render: (type) => (type === "send" ? "Gửi" : "Nhận"),
    },
    {
      title: "Lời Nhắn",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Thời Gian",
      dataIndex: "time",
      key: "time",
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Success" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lịch Sử Giao Dịch</h1>
      <Table
        columns={columns}
        dataSource={dataHistoryTransfer}
        rowKey="idTransfer"
      />
    </div>
  );
};

export default HistoryTransfer;
