import { Navigate, createBrowserRouter } from "react-router-dom";

import { GUARDS } from "./guard";

import DistributorPage from "../pages/DistributorPage/DistributorPage";
import Manufactureradmin from "../pages/ManufactureradminPage/ManufactureradminPage";
import Login from "../components/Login/Login";
import LoginPage from "../pages/LoginPage/LoginPage";
import Logout from "../components/Logout/Logout";
import Products from "../components/Products/Products";
import ManufacturerDashBoard from "../components/ManufacturerDashBoard/ManufacturerDashBoard";
import DistributorList from "../components/DistributorList/DistributorList";
import ManufactureradminPage from "../pages/ManufactureradminPage/ManufactureradminPage";
import DistributorInventory from "../components/DistributorInventory/DistributorInventory";
import ManufacturerReports from "../components/ManufacturerReports/ManufacturerReports";
import DistributorReports from "../components/DistributorReports/DistributorReports";
import ManufacturerInventory from "../components/ManufacturerInventory/ManufacturerInventory";
import ManufacturerCustomers from "../components/ManufacturerCustomers/ManufacturerCustomers";
import DistributorSales from "../components/DistributorSales/DistributorSales";
import ManufacturerOrders from "../components/ManufacturerOrders/ManufacturerOrders";
import ManufacturerMerchandise from "../components/ManufacturerMerchandise/ManufacturerMerchandise";
import DistributorRewards from "../components/DistributorRewards/DistributorRewards";
import MerchandiseRequests from "../components/MerchandiseRequests/MerchandiseRequests";
import ReportsContainer from "../components/PerformersReportsContainer/ReportsContainer";
import ProductsReportsContainer from "../components/ProductsReportsContainer/ProductsReportsContainer";
import DistributorReportsContainer from "../components/DistributorReportsContainer/DistributorReportsContainer";
import DistributorHome from "../components/DistributorHome/DistributorHome";

type predicate = () => boolean;

// can activate is higher order component menas it takes component and returns component.

const canActivate = (
  Component: React.ComponentType<any>,
  guards: predicate[],
  to: string = "/"
) => {
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
        path: "products",
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
        path: "orders",
        element: <ManufacturerOrders />,
      },
      {
        path: "merchandise",
        element: <ManufacturerMerchandise />,
      },
      {
        path: "merchandiserequests",
        element: <MerchandiseRequests />,
      },
      // {
      //   path: "reports",
      //   element: <ManufacturerReports />,
      // },
      // {
      //   path: "reports/topsellingproducts",
      //   element: <ProductsReportsContainer />,
      // },
      // {
      //   path: "reports/topperformers",
      //   element: <ReportsContainer />,
      // },
      {
        path: "reports",
        children: [
          {
            path: "",
            element: <ManufacturerReports />,
          },
          {
            path: "topsellingproducts",
            element: <ProductsReportsContainer />,
          },
          {
            path: "topperformers",
            element: <ReportsContainer />,
          },
        ],
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
        path: "home",
        element: <DistributorHome />,
      },
      {
        path: "inventory",
        element: <DistributorInventory />,
      },
      {
        path: "reports",
        element: <DistributorReportsContainer />,
      },
      {
        path: "sales",
        element: <DistributorSales />,
      },
      {
        path: "rewards",
        element: <DistributorRewards />,
      },
    ],
  },
]);
