// Nha si
import { lazy } from "react";
import { TiHomeOutline } from "react-icons/ti";

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
    name: "Quản lí nhân viên",
    icon: <TiHomeOutline />,
    path: "/staff-management",
    component: HomeAdmin,
    Layout: AdminLayout,
  },
  {
    name : "Xem đối soát",
    icon: <TiHomeOutline />,
    pạth: "/reconciliation",
    component: HomeAdmin,
    Layout: AdminLayout,
  }
];

export default AdminRouter;
