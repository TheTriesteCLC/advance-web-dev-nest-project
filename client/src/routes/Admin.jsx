// Nha si
import { lazy } from "react";
import { TiHomeOutline } from "react-icons/ti";
<<<<<<< HEAD
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { AiTwotoneReconciliation } from "react-icons/ai";

const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
const ManagerEmployee = lazy(() => import("~/pages/admin/ManagerEmployee"));
const Profile = lazy(() => import("~/pages/admin/ProfilePage"));
const Revenue = lazy(() => import("~/pages/admin/Revenue"));
const Reconciliation = lazy(() => import("~/pages/admin/Reconciliation"));
const AdminRouter = [
  // {
  //   name: "Home",
  //   icon: <TiHomeOutline />,
  //   path: "/",
  //   component: ManagerEmployee,
  //   Layout: AdminLayout,
  // },
  {
    name: "Quản lí nhân viên",
    icon: <FaUsersBetweenLines />,
    path: "/",
    component: ManagerEmployee,
    Layout: AdminLayout,
  },
  {
    name: "Xem đối soát",
    icon: <AiTwotoneReconciliation />,
    path: "/reconciliation",
    component: Reconciliation,
    Layout: AdminLayout,
  },
  {
    name: "Doanh thu",
    icon: <IoStatsChartSharp />,
    path: "/revenue",
    component: Revenue,
    Layout: AdminLayout,
  },
  {
    name: null,
    icon: null,
    path: "/profile",
    component: Profile,
=======

const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));

const AdminRouter = [
  {
    name: "Home",
    icon: <TiHomeOutline />,
    path: "/",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
  {
    name: "Home2",
    icon: <TiHomeOutline />,
    path: "/adsfa",
    component: HomeAdmin,
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
    Layout: AdminLayout,
  },
];

export default AdminRouter;
