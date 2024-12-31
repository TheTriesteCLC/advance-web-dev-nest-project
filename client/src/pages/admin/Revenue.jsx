import React from "react";
import { Column } from "@ant-design/plots";

const revenuedata = [
  {
    id: 1,
    time: "2021-01-01",
    Deposit: 1000000,
    Withdraw: 500000,
  },
  {
    id: 2,
    time: "2021-01-02",
    Deposit: 1000000,
    Withdraw: 1000000,
  },
  {
    id: 3,
    time: "2021-01-03",
    Deposit: 3000000,
    Withdraw: 1500000,
  },
  {
    id: 4,
    time: "2021-01-04",
    Deposit: 400000,
    Withdraw: 2000000,
  },
  {
    id: 5,
    time: "2021-01-05",
    Deposit: 5000000,
    Withdraw: 2500000,
  },
  {
    id: 6,
    time: "2021-01-06",
    Deposit: 6000000,
    Withdraw: 3000000,
  },
  {
    id: 7,
    time: "2021-01-07",
    Deposit: 7000000,
    Withdraw: 300000,
  },
  {
    id: 8,
    time: "2021-01-08",
    Deposit: 800000,
    Withdraw: 4000000,
  },
  {
    id: 9,
    time: "2021-01-09",
    Deposit: 9000000,
    Withdraw: 4500000,
  },
  {
    id: 10,
    time: "2021-01-10",
    Deposit: 100000,
    Withdraw: 5000000,
  },
];

// Update this section to show the correct values

const Revenue = () => {
  const config = {
    label: {
      formatter: (datum) => `${datum.type}: ${datum.value} VND`,

      position: "middle",
    },
    data: revenuedata.flatMap(({ time, Deposit, Withdraw }) => [
      { type: "Deposit", value: Deposit, time },
      { type: "Withdraw", value: Withdraw, time },
    ]),
    xField: "time",
    yField: "value",
    seriesField: "type",
    color: ["#1890ff", "#ff4d4f"],
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    annotations: revenuedata.flatMap(({ time, Deposit, Withdraw }) => [
      {
        type: "shape",
        xField: "Deposit",
        yField: Deposit,
        time,
        render: ({ x, y }, context) => {
          const { document } = context;
          const rect = document.createElement("rect", {
            x,
            y: y - 10,
            width: 10,
            height: 10,
            fill: "orange",
          });
          return rect;
        },
      },
    ]),
    label: {
      formatter: (datum) => `${datum.type}: ${datum.value} VND`,
      position: "middle",
    },
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Thống Kê Doanh Thu</h1>
      <Column {...config} />
    </div>
  );
};

export default Revenue;
