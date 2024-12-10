import { lazy } from "react";
const StaffLayout = lazy(() => import("~/components/Layout/StaffLayout"));

const HomeStaff = lazy(() => import("~/pages/staff/index"));

const StaffRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeStaff,
    Layout: StaffLayout,
  },
  {
    name: "Home",
    path: "/",
    component: HomeStaff,
    Layout: StaffLayout,
  },
];

export default StaffRouter;
