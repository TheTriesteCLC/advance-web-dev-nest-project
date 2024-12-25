import { lazy } from "react";

import CustomerLayout from "../components/Layout/CustomerLayout";
const HomeCustomer = lazy(() => import("../pages/customer/index"));
const Transfer = lazy(() => import("../pages/customer/Transfer"));
const History = lazy(() => import("../pages/customer/History"));
const ListReceiver = lazy(() => import("../pages/customer/Receiver"));
const Debt = lazy(() => import("../pages/customer/Debt"));

const CustomerRouter = [
  {
    name: "Trang chủ",
    path: "/",
    component: HomeCustomer,
    Layout: CustomerLayout,
  },
  {
    name: "Chuyển khoản",
    path: "/transfer",
    component: Transfer,
    Layout: CustomerLayout,
  },
  {
    name: "Lịch sử giao dịch",
    path: "/history",
    component: History,
    Layout: CustomerLayout,
  },
  {
    name: "Danh sách người nhận",
    path: "/listreceiver",
    component: ListReceiver,
    Layout: CustomerLayout,
  },
  {
    name: "Quản lí nhắc nợ",
    path: "/debt",
    component: Debt,
    Layout: CustomerLayout,
  },

  {
    name: null,
    path: "/profile",
    component: <h1>profile</h1>,
    Layout: CustomerLayout,
  },
];

export default CustomerRouter;
