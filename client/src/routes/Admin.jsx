// Nha si
import { lazy } from "react";
import { TiHomeOutline } from "react-icons/ti";

const AdminLayout = lazy(() => import("~/components/Layout/AdminLayout"));
const HomeAdmin = lazy(() => import("~/pages/admin/index"));
const ManagerEmployee = lazy(() => import("~/pages/admin/ManagerEmployee"));
const Profile = lazy(() => import("~/pages/admin/ProfilePage"));
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
    component: HomeAdmin,
    Layout: AdminLayout,
  },
  {
    name: "Xem đối soát",
    icon: <TiHomeOutline />,
    pạth: "/reconciliation",
    component: HomeAdmin,
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
