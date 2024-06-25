import { Navigate, createBrowserRouter } from "react-router-dom";

import { GUARDS } from "./guard";

import DistributorPage from "../pages/DistributorPage/DistributorPage";
import Manufactureradmin from "../pages/ManufactureradminPage/Manufactureradmin";
import Login from "../components/Login/Login";
import LoginPage from "../pages/LoginPage/LoginPage";
import Logout from "../components/Logout/Logout";
import Products from "../components/Products/Products";
import ManufacturerDashBoard from "../components/ManufacturerDashBoard/ManufacturerDashBoard";
import DistributorList from "../components/DistributorList/DistributorList";
import ManufactureradminPage from "../pages/ManufactureradminPage/Manufactureradmin";
import DistributorInventory from "../components/DistributorInventory/DistributorInventory";
import ManufacturerReports from "../components/ManufacturerReports/ManufacturerReports";
import DistributorReports from "../components/DistributorReports/DistributorReports";
import ManufacturerInventory from "../components/ManufacturerInventory/ManufacturerInventory";
import ManufacturerCustomers from "../components/ManufacturerCustomers/ManufacturerCustomers";
import DistributorSales from "../components/DistributorSales/DistributorSales";
import ManufacturerOrders from "../components/ManufacturerOrders/ManufacturerOrders";

type predicate = () => boolean;

// can activate is higher order component menas it takes component and returns component.

const canActivate = (
  Component: React.ComponentType<any>,
  guards: predicate[],
  to: string = "/"
) => {
  // console.log("hello");
  return () => {
    // console.log(to);
    if (!guards.every((guard) => guard())) return <Navigate to={to} />;

    return <Component />;
  };
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/manufacturer",
    Component: canActivate(
      Manufactureradmin,
      [GUARDS.isLoggedIn, GUARDS.grantAccessTo(["manufacturer"])],
      "/"
    ),

    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "inventory",
        element: <ManufacturerInventory />,
      },
      {
        path: "distributors",
        element: <DistributorList />,
      },
      {
        path: "Customers",
        element: <ManufacturerCustomers />,
      },
      {
        path: "reports",
        element: <ManufacturerReports />,
      },
      {
        path: "orders",
        element: <ManufacturerOrders />,
      },
    ],
  },
  {
    path: "/distributor",
    // element: <DistributorPage />,
    Component: canActivate(
      DistributorPage,
      [GUARDS.isLoggedIn, GUARDS.grantAccessTo(["distributor"])],
      "/"
    ),
    children: [
      {
        path: "",
        Component: () => <div>Hello</div>,
      },
      {
        path: "inventory",
        element: <DistributorInventory />,
      },
      {
        path: "reports",
        element: <DistributorReports />,
      },
      {
        path: "sales",
        element: <DistributorSales />,
      },
    ],
  },
]);
