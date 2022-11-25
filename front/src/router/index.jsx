import { useRoutes } from "react-router-dom";
import Login from "@/pages/Login/index.jsx";
import Dashboard from "@/pages/Dashboard/index.jsx";
import User from "@/pages/User/index.jsx";
import Layout from "@/pages/Layout/index.jsx";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/users",
          element: <User />,
        },
          ]
    },
  ];

  return useRoutes(routes);
}

export default Router;
