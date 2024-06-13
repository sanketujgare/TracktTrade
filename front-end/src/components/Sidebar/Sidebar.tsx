import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.types.ts";
import SidebarList from "../SidebarList/SidebarList.tsx";

const sidebarTabs = {
  // admin: ["Home", "Customers", "Deleted Customers",],
  admin: [
    { tabName: "Home", path: "/manufacturer" },

    { tabName: "Inventory", path: "/manufacturer/inventory" },
    { tabName: "Distributors", path: "/manufacturer/deletedCustomers" },
    { tabName: "Orders", path: "/manufacturer/deletedCustomers" },
    { tabName: "Customers", path: "/manufacturer/deletedCustomers" },
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
      <SidebarList lists={currentUserList} />

      <ul className={styles.SidebarList}>
        <li>
          <Link className={styles.Link} to={"/logout"}>
            LogOut
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
