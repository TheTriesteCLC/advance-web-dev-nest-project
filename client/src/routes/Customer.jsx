import { lazy } from "react";
const CustomerLayout = lazy(() => import("../components/Layout/CustomerLayout"));
const HomeCustomer = lazy(() => import("../pages/customer/index"));

const CustomerRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeCustomer,
    Layout: CustomerLayout,
  },
  {
    name: "Home",
    path: "/",
    component: HomeCustomer,
    Layout: CustomerLayout,
  },
];

export default CustomerRouter;
