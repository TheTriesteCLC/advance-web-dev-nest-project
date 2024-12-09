// Nha si
import { lazy } from "react";

const HomeCustomer = lazy(() => import("../pages/customer/Home.page"));
const DefaultLayout = lazy(() => import("../components/Default"));
const CustomerRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeCustomer,
    Layout: DefaultLayout,
  },
];

export default CustomerRouter;
