import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.types.ts";
import SidebarList from "../SidebarList/SidebarList.tsx";

const sidebarTabs = {
  // admin: ["Home", "Customers", "Deleted Customers",],
  admin: [
    { tabName: "Home", path: "/admin" },
    { tabName: "Inventory", path: "/admin/allcustomers" },
    { tabName: "Distributors", path: "/admin/deletedCustomers" },
    { tabName: "Orders", path: "/admin/deletedCustomers" },
    { tabName: "Customers", path: "/admin/deletedCustomers" },
    {
      tabName: "Reports",
      path: [
        {
          tabName: "top10SellingProducts",
          path: "manufacturer/top10sellingproducts",
        },
        {
          tabName: "top10SellingProducts",
          path: "manufacturer/top10sellingproducts",
        },
      ],
    },
  ],
  boardMember: [
    { tabName: "Home", path: "/boardMember" },
    { tabName: "Customer", path: "/boardMember/allcustomers" },
    { tabName: "Deleted Customers", path: "/boardMember/deletedCustomers" },
  ],
};
const Sidebar = ({}: SidebarProps) => {
  const role = "admin";

  const currentUserList = sidebarTabs[role];

  return (
    <div className={styles.SidebarContainer}>
      <ul className={styles.SidebarList}>
        <SidebarList lists={currentUserList} />
        <Link to={"/logout"}>
          <li>LogOut</li>
        </Link>
      </ul>
    </div>
    // <div></div>
  );
};

export default Sidebar;
