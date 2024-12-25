import { lazy } from "react";
const EmployeeLayout = lazy(() => import("~/components/Layout/EmployeeLayout"));
// import EmployeeLayout from "../components/Layout/EmployeeLayout";
const HomeEmployee = lazy(() => import("~/pages/employee/index"));
const Profile = lazy(() => import("~/pages/Profile"));
const ManagerCustomer = lazy(() => import("~/pages/employee/ManagerCustomer"));
const HistoryTransaction = lazy(() => import("~/pages/employee/HistoryTransfer"));
const EmployeeRouter = [
  {
    name: "Home",
    path: "/",
    component: Profile,
    Layout: EmployeeLayout,
  },
  {
    name: "Quản lý tài khoản",
    path: "/account-management",
    component: ManagerCustomer,
    Layout: EmployeeLayout,
  },
  {
    name: "Lịch sử giao dịch",
    path: "/history-transaction",
    component: HistoryTransaction,
    Layout: EmployeeLayout,
  },
];

export default EmployeeRouter;
