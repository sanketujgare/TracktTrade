import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";

import styles from "./ManufactureradminPage.module.scss";
import {
  ManufactureradminPageProps,
  columns,
  data,
} from "./ManufactureradminPage.types.ts";
import Table from "../../components/Table/Table.tsx";
import Header from "../../components/Header/Header.tsx";
import Button from "../../components/Button/Button.tsx";
import Products from "../../components/Products/Products.tsx";

const ManufactureradminPage = ({}: ManufactureradminPageProps) => {
  return (
    <div className={styles.ManufacturerAdminPage}>
      <div className={styles.Sidebar}>
        <Sidebar />
      </div>
      <div className={styles.Screen}>
        {/* <div className={styles.Header}>Header</div> */}
        <Header />
        <div className={styles.MainScrren}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManufactureradminPage;
