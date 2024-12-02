import { lazy } from "react";

const PublicRoute = [
  {
    name: "Login",
    path: "/",
    component: lazy(() => import("../../../Pages/Login/Login")),
  },
  {
    name: "Page Not Found",
    path: "*",
    component: lazy(() => import("../../../Pages/NotFound/NotFound")),
  }
];

export default PublicRoute;