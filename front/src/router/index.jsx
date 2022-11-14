import { useRoutes } from "react-router-dom";
import LayoutMain from "../componentes/Layout/Layout";
// import SimpleMenu from "../layouts/simple-menu/Main";
// import TopMenu from "../layouts/top-menu/Main";
import Api from "../services/post/Api.jsx";

import Dashboard from "../componentes/Vistas/dashboard/dashboard";
import Proveedor from "../componentes/Vistas/proveedor/Main";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Api />
    },
    // {
    //   path: "/",
    //   element: <SideMenu />,
    //   children: [
    //     {
    //       path: "/dashboard",
    //       element: <Dashboard />,
    //     },
    //     {
    //       path: "proveedor",
    //       element: <Proveedor />,
    //     },
    //   ],
    // },
    // {
    //   path: "/simple-menu",
    //   element: <SimpleMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
    // {
    //   path: "/top-menu",
    //   element: <TopMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
  ];

  return useRoutes(routes);
}

export default Router;
