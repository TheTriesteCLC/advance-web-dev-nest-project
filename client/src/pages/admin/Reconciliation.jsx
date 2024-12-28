import React from "react";
import { Pie } from "@ant-design/plots";

const data = [
  {
    id: 1,
    nameBank: "Bank A",
    volume: 1000000,
  },
  {
    id: 2,
    nameBank: "Bank B",
    volume: 2000000,
  },
  {
    id: 3,
    nameBank: "Bank C",
    volume: 3000000,
  },
  {
    id: 4,
    nameBank: "Bank D",
    volume: 4000000,
  },
  {
    id: 5,
    nameBank: "Bank E",
    volume: 5000000,
  },
];

const Reconciliation = () => {
 const config = {
   data: data,
   angleField: "volume",
   colorField: "nameBank",
   label: {
     text: "nameBank",
     position: "outside",
   },
   legend: {
     color: {
       title: "Bank",
       position: "top",
       rowPadding: 5,
     },
     interactions: [
       {
         type: "element-active",
       },
     ],
   },
 };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Biểu Đồ Phân Bổ Ngân Hàng</h1>
      <Pie {...config} />
    </div>
  );
};

export default Reconciliation;
