import { useRoutes } from "react-router-dom";
import Login from "@/pages/Login/index.jsx";
import Dashboard from "@/components/Dashboard.jsx";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    /*{
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },*/
  ];

  return useRoutes(routes);
}

export default Router;
