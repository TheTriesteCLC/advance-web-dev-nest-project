<<<<<<< HEAD
import React from "react";
import AdminRouter from "./routes/Admin";
import EmployeeRouter from "./routes/Employee";
import CustomerRouter from "./routes/Customer";
import AuthRouter from "./routes/Auth";
import { Fragment, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./components/err/loading";
const NotfoundError = lazy(() => import("~/components/err"));
function App() {
  const role = useSelector((state) => state.profile.role);
  const VerifyRoure = () => {
    switch (role) {
      case "admin":
        return AdminRouter;
      case "employee":
        return EmployeeRouter;
      case "customer":
        return CustomerRouter;
      default:
        return AuthRouter;
    }
=======
import  AdminRouter from "./routes/Admin";
import StaffRouter from "./routes/Staff";
import CustomerRouter from "./routes/Customer";

import { Fragment, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/err/loading";
const NotfoundError = lazy(() => import("~/components/err"));

function App() {
  const VerifyRoure = () => {
    return CustomerRouter;
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
  };
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
<<<<<<< HEAD
            {VerifyRoure().map((route, index) => {
=======
            {CustomerRouter.map((route, index) => {
>>>>>>> b41e90baba50aea756eb95c614ca0422242aaa7b
              const Layout = route.Layout === null ? Fragment : route.Layout;
              const Page =
                route.component === null ? Fragment : route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <Fragment>
                  <NotfoundError />
                </Fragment>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
