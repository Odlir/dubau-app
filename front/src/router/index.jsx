import { useRoutes } from "react-router-dom";
import Login from "@/pages/Login/index.jsx";
import Dashboard from "@/pages/Dashboard/index.jsx";
import User from "@/pages/User/index.jsx";
import Role from "@/pages/Role/index.jsx";
import AddUser from "@/pages/User/add.jsx";
import Layout from "@/pages/Layout/index.jsx";
import Brand from "@/pages/Brand/index.jsx";
import Area from "@/pages/Area/index.jsx";
import Line from "@/pages/Line/index.jsx";

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
        {
          path: "/roles",
          element: <Role />,
        },
        {
          path: "/brand",
          element: <Brand />,
        },
        {
          path: "/line",
          element: <Line />,
        },
        {
          path: "/area",
          element: <Area />,
        }
          ]
    },
  ];

  return useRoutes(routes);
}

export default Router;
