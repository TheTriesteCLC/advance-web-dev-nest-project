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
  }
];

export default AdminRouter;
