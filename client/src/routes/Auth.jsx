// Nha si
import { lazy } from "react";
const SignIn = lazy(() => import("../pages/auth/Signin"));

const AuthRouter = [
  {
    name: "Signin",
    path: "/",
    component: SignIn,
    Layout: null,
  },
];

export default AuthRouter;
