
import { lazy } from "react";



const HomeAdmin = lazy(() => import("../pages/admin/Home.page"));
const DefaultLayout = lazy(() => import("../components/Default"));
const AdminRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeAdmin,
    Layout: DefaultLayout,
  },
];

export default AdminRouter;
