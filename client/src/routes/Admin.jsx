// Nha si
import { lazy } from "react";
import { TiHomeOutline } from "react-icons/ti";

const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
const ManagerEmployee = lazy(() => import("~/pages/admin/ManagerEmployee"));
const Profile = lazy(() => import("~/pages/admin/ProfilePage"));
const Revenue = lazy(() => import("~/pages/admin/Revenue"));
const Reconciliation = lazy(() => import("~/pages/admin/Reconciliation"));
const AdminRouter = [
  {
    name: "Home",
    icon: <TiHomeOutline />,
    path: "/",
    component: ManagerEmployee,
    Layout: AdminLayout,
  },
  {
    name: "Quản lí nhân viên",
    icon: <TiHomeOutline />,
    path: "/staff-management",
    component: ManagerEmployee,
    Layout: AdminLayout,
  },
  {
    name: "Xem đối soát",
    icon: <TiHomeOutline />,
    path: "/reconciliation",
    component: Reconciliation,
    Layout: AdminLayout,
  },
  {
    name: "Doanh thu",
    icon: <TiHomeOutline />,
    path: "/revenue",
    component: Revenue,
    Layout: AdminLayout,
  },
  {
    name: null,
    icon: null,
    path: "/profile",
    component: Profile,
    Layout: AdminLayout,
  },
];

export default AdminRouter;
