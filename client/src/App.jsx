import  AdminRouter from "./routes/Admin";
import EmployeeRouter from "./routes/Employee";
import CustomerRouter from "./routes/Customer";

import { Fragment, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/err/loading";
const NotfoundError = lazy(() => import("~/components/err"));

function App() {
  const VerifyRoure = () => {
    return CustomerRouter;
  };
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {CustomerRouter.map((route, index) => {
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
