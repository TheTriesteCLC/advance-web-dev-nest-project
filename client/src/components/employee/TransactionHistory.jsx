import React, { useState, useEffect } from "react";
import { Table, Input, Button, message } from "antd";
import ColumnSearch from "~/hooks/useSearchTable";

const TransactionHistory = ({ fetchData, type }) => {
  const [transactions, setTransactions] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!customerID) {
      message.warning("Vui lòng nhập ID khách hàng!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchData(customerID);
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      message.error("Không thể tải dữ liệu giao dịch");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = {
    DEPOSIT: [
      {
        title: "ID Giao Dịch",
        dataIndex: "_id",
        key: "_id",
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
        render: (amount) => (
          <span style={{ color: "green" }}>
            {`+ ${amount.toLocaleString()} VND`}
          </span>
        ),
      },
      {
        title: "Nội Dung",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "Số Dư",
        dataIndex: "receiver_balance",
        key: "receiver_balance",
        render: (balance) => `${balance.toLocaleString()} VND`,
      },
      {
        title: "Thời Gian",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (time) => new Date(time).toLocaleString(),
      },
    ],
    TRANSFER: [
      {
        title: "ID Giao Dịch",
        dataIndex: "_id",
        key: "_id",
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
        render: (amount) => `${amount.toLocaleString()} VND`,
      },
      {
        title: "Phí",
        dataIndex: "fee",
        key: "fee",
        render: (fee) => (fee ? `${fee.toLocaleString()} VND` : "N/A"),
      },
      {
        title: "Nội Dung",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "Số Dư Người Gửi",
        dataIndex: "sender_balance",
        key: "sender_balance",
        render: (balance) => `${balance.toLocaleString()} VND`,
      },
      {
        title: "Số Dư Người Nhận",
        dataIndex: "receiver_balance",
        key: "receiver_balance",
        render: (balance) => `${balance.toLocaleString()} VND`,
      },
      {
        title: "Thời Gian",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (time) => new Date(time).toLocaleString(),
      },
    ],
    DEBT: [
      {
        title: "ID Giao Dịch",
        dataIndex: "_id",
        key: "_id",
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
        render: (amount) => `${amount.toLocaleString()} VND`,
      },
      {
        title: "Nội Dung",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "Số Dư Người Gửi",
        dataIndex: "sender_balance",
        key: "sender_balance",
        render: (balance) => `${balance.toLocaleString()} VND`,
      },
      {
        title: "Số Dư Người Nhận",
        dataIndex: "receiver_balance",
        key: "receiver_balance",
        render: (balance) => `${balance.toLocaleString()} VND`,
      },
      {
        title: "Thời Gian",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (time) => new Date(time).toLocaleString(),
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Nhập ID khách hàng"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleFetch} loading={loading}>
          Tìm Kiếm
        </Button>
      </div>
      <Table
        columns={columns[type]}
        dataSource={transactions}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default TransactionHistory;
