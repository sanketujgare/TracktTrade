import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.tsx";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import styles from "./DistributorPage.module.scss";
import { DistributorPageProps } from "./DistributorPage.types.ts";

const DistributorPage = ({}: DistributorPageProps) => {
  return (
    <div className={styles.DistributorPage}>
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

export default DistributorPage;
