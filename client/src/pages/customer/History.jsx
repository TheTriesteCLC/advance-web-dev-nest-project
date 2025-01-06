import React, { useEffect, useState } from "react";
import { Table, Tag, Tabs } from "antd";
import ColumnSearch from "~/hooks/useSearchTable";
import { useSelector } from "react-redux";
import PublicService from "../../services/Public.service";

const { TabPane } = Tabs;

const HistoryTransfer = () => {
  const accountNumber = useSelector((state) => state.profile.accountNumber);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const fetchHistoryTransfer = async () => {
    try {
      const response = await PublicService.transaction.select_his_trans_anb(
        accountNumber
      );
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchHistoryTransfer();
  }, []);

  // Lọc giao dịch theo loại
  const filterTransactions = (type) => {
    if (type === "all") return transactions;
    return transactions.filter((transaction) => transaction.type === type);
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
        render: (amount, record) => {
          const isReceiving = record.receiver === accountNumber;
          return (
            <span style={{ color: isReceiving ? "green" : "red" }}>
              {`${isReceiving ? "+" : "-"} ${amount.toLocaleString()} VND`}
            </span>
          );
        },
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
        render: (amount, record) => {
          const isReceiving = record.receiver === accountNumber;
          return (
            <span style={{ color: isReceiving ? "green" : "red" }}>
              {`${isReceiving ? "+" : "-"} ${amount.toLocaleString()} VND`}
            </span>
          );
        },
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
  };

  const items = [
    // {
    //   key: "all",
    //   label: "Tất Cả",
    //   children: (
    //     <Table
    //       columns={columns.TRANSFER}
    //       dataSource={filterTransactions("all")}
    //       rowKey="_id"
    //     />
    //   ),
    // },
    {
      key: "DEPOSIT",
      label: "Nạp Tiền",
      children: (
        <Table
          columns={columns.DEPOSIT}
          dataSource={filterTransactions("DEPOSIT")}
          rowKey="_id"
        />
      ),
    },
    {
      key: "TRANSFER",
      label: "Chuyển Khoản",
      children: (
        <Table
          columns={columns.TRANSFER}
          dataSource={filterTransactions("TRANSFER")}
          rowKey="_id"
        />
      ),
    },
    {
      key: "DEBT",
      label: "Thanh Toán Nợ",
      children: (
        <Table
          columns={columns.DEBT}
          dataSource={filterTransactions("DEBT")}
          rowKey="_id"
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lịch Sử Giao Dịch</h1>
      <Tabs
        defaultActiveKey="all"
        items={items}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
};

export default HistoryTransfer;
