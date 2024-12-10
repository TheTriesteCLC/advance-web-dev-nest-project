import { lazy } from "react";
const StudentLayout = lazy(() => import("~/components/Layout/StudentLayout"));
const HomeStudent = lazy(() => import("~/pages/student/index"));

const CustomerRouter = [
  {
    name: "Home",
    path: "/",
    component: HomeStudent,
    Layout: StudentLayout,
  },
];

export default CustomerRouter;
