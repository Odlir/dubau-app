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
import Maker from "@/pages/Maker/index.jsx";
import WaytoPay from "@/pages/WayToPay/index.jsx";
import Establishment from "@/pages/Establishment/index.jsx";
import TypeQualification from "@/pages/TypeQualification/index.jsx";
import UnitMeasure from "@/pages/UnitMeasure/index.jsx";
import Position from "@/pages/Position/index.jsx";
import Profile from "@/pages/Profile/index.jsx";
import Staff from "@/pages/Staff/index.jsx";

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
        },
        {
          path: "/maker",
          element: <Maker />,
        },{
          path: "/waytopay",
          element: <WaytoPay />,
        },{
          path: "/establishment",
          element: <Establishment />,
        },{
          path: "/typequalification",
          element: <TypeQualification />,
        },{
          path: "/unitmeasure",
          element: <UnitMeasure />,
        },{
          path: "/position",
          element: <Position />,
        },{
          path: "/profile",
          element: <Profile />,
        },{
          path: "/staff",
          element: <Staff />,
        }
          ]
    },
  ];

  return useRoutes(routes);
}

export default Router;
