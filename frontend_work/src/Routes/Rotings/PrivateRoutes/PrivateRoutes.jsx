import { lazy } from "react";

const privateRoute = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: lazy(() => import("../../../Pages/Dashboard/Dashoboard")),
  },
  {
    name: "Generator",
    path: "/generator",
    component: lazy(() => import("../../../Pages/Generator/Generator")),
  },
  {
    name: "Corasal Image",
    path: "/corasalImage",
    component: lazy(() => import("../../../Pages/CorasalImage/CorasalImage")),
  },
  {
    name: "Event Visualize",
    path: "/visualize",
    component: lazy(() => import("../../../Pages/EventVisualize/EventVisualize")),
  },
  {
    name: "Page Not Found",
    path: "*",
    component: lazy(() => import("../../../Pages/NotFound/NotFound")),
  }
];

export default privateRoute;