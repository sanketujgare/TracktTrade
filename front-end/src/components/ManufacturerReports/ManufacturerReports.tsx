import styles from "./ManufacturerReports.module.scss";
import ReportsContainer from "../ReportsContainer/ReportsContainer";

import { useState } from "react";
import { pointsData, salesData } from "./ManufacturerReports.types";

const ManufacturerReports = () => {
  const [activeTab, setActiveTab] = useState("sales");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.ReportsTabsContainer}>
      <div className={styles.Tabs}>
        <button
          className={`${styles.TabButton} ${
            activeTab === "sales" ? styles.Active : ""
          }`}
          onClick={() => handleTabClick("sales")}
        >
          Sales
        </button>
        <button
          className={`${styles.TabButton} ${
            activeTab === "points" ? styles.Active : ""
          }`}
          onClick={() => handleTabClick("points")}
        >
          Points
        </button>
      </div>
      <div className={styles.TabContent}>
        {activeTab === "sales" && <ReportsContainer data={salesData} />}
        {activeTab === "points" && <ReportsContainer data={pointsData} />}
      </div>
    </div>
  );
};

export default ManufacturerReports;
