import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import styles from "./Manufactureradmin.module.scss";
import {
  ManufactureradminProps,
  columns,
  data,
} from "./Manufactureradmin.types.ts";
import Table from "../../components/Table/Table.tsx";
import Header from "../../components/Header/Header.tsx";
import Button from "../../components/Button/Button.tsx";

const Manufactureradmin = ({}: ManufactureradminProps) => {
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

export default Manufactureradmin;

// <div className={styles.AddButton}>
//   <Button buttonText="+ Add" handleClick={() => ""} />
// </div>
// <div className={styles.Table}>
//   <h3>Table Component</h3>
//   <Table columns={columns} data={data} />
// </div>
