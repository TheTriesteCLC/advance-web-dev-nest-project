import { Fragment, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import AdminRouter from "./router/Admin";
import CustomerRouter from "./router/Customer";
import StaffRouter from "./router/Staff";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const VerifyRoure = () => {
    return CustomerRouter;
    return AdminRouter;
    return StaffRouter;
  };
  console.log("khanh", import.meta.env.SERVER_URL);
  return (
    <>
      <Router>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {VerifyRoure().map((route, index) => {
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
                  <h1>404</h1>
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
