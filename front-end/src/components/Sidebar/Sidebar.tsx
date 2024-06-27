import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.types.ts";
import SidebarList from "../SidebarList/SidebarList.tsx";
import { logoutRequst } from "../../services/Authentication.services.ts";

const sidebarTabs = {
  manufacturer: [
    { tabName: "Home", path: "/manufacturer" },
    { tabName: "Products", path: "/manufacturer/products" },
    { tabName: "Inventory", path: "/manufacturer/inventory" },
    { tabName: "Distributors", path: "/manufacturer/distributors" },
    { tabName: "Orders", path: "/manufacturer/orders" },
    { tabName: "Customers", path: "/manufacturer/customers" },

    {
      tabName: "Merchandise",
      path: [
        {
          tabName: "Merchandise",
          path: "merchandise",
        },
        {
          tabName: "Requests",
          path: "merchandiserequests",
        },
      ],
    },
    {
      tabName: "Reports",
      path: [
        {
          tabName: "Reports",
          path: "reports",
        },
        {
          tabName: "TopProducts",
          path: "reports/topsellingproducts",
        },
        {
          tabName: "topPerformers",
          path: "reports/topperformers",
        },
      ],
    },
  ],
  distributor: [
    { tabName: "Home", path: "/distributor/home" },
    { tabName: "Inventory", path: "/distributor/inventory" },
    { tabName: "Sales", path: "/distributor/sales" },
    { tabName: "Rewards", path: "/distributor/rewards" },
    { tabName: "Reports", path: "/distributor/reports" },
  ],
};

const Sidebar = ({}: SidebarProps) => {
  const navigate = useNavigate();
  const { role } = JSON.parse(localStorage.getItem("user") as string);
  // const {role}=localStorage.getItem("role")
  // const role = "manufacturer";

  const currentUserList = sidebarTabs[role];

  const handleLogout = () => {
    logoutRequst();
    navigate("/");
  };

  return (
    <div className={styles.SidebarContainer}>
      <SidebarList lists={currentUserList} />

      <ul className={styles.SidebarList}>
        <li>
          <Link className={styles.Link} to={"/"} onClick={handleLogout}>
            LogOut
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
