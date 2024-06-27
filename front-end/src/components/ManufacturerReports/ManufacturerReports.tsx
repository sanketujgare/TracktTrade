import styles from "./ManufacturerReports.module.scss";
import ReportsContainer from "../PerformersReportsContainer/ReportsContainer";
import { useState } from "react";

import ReusableReportsContainer from "../ReusableReportsContainer/ReusableReportsContainer";

const ManufacturerReports = () => {
  const [activeTab, setActiveTab] = useState("sales");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.ReportsTabsContainer}>
      <div className={styles.AnalyticsContainer}>
        <h2>Welcome to the Reports Dashboard</h2>
        <p>
          Here you can find a comprehensive overview of various metrics and
          reports.
        </p>
        <ul>
          <li>Sales Data</li>
          <li>Points Data</li>
          <li>Top Selling Products</li>
          <li>Top Performers</li>
        </ul>
      </div>
    </div>
  );
};

export default ManufacturerReports;

// <div className={styles.ReportsTabsContainer}>
//   <div className={styles.Tabs}>
//     <buttonz
//       className={`${styles.TabButton} ${
//         activeTab === "analytics" ? styles.Active : ""
//       }`}
//       onClick={() => handleTabClick("analytics")}
//     >
//       Analytics
//     </button>
//     <button
//       className={`${styles.TabButton} ${
//         activeTab === "sales" ? styles.Active : ""
//       }`}
//       onClick={() => handleTabClick("sales")}
//     >
//       Sales
//     </button>
//     <button
//       className={`${styles.TabButton} ${
//         activeTab === "points" ? styles.Active : ""
//       }`}
//       onClick={() => handleTabClick("points")}
//     >
//       Points
//     </button>
//     <button
//       className={`${styles.TabButton} ${
//         activeTab === "topProducts" ? styles.Active : ""
//       }`}
//       onClick={() => handleTabClick("topProducts")}
//     >
//       Top Products
//     </button>
//     <button
//       className={`${styles.TabButton} ${
//         activeTab === "topPerformers" ? styles.Active : ""
//       }`}
//       onClick={() => handleTabClick("topPerformers")}
//     >
//       Top Performers
//     </button>
//   </div>
//   <div className={styles.TabContent}>
//     {/* {activeTab === "analytics" && <AnalyticsView />} */}
//     {activeTab === "sales" && (
//       <ReusableReportsContainer reportType="sales" />
//     )}
//     {activeTab === "points" && (
//       <ReusableReportsContainer reportType="points" />
//     )}
//     {activeTab === "topProducts" && (
//       <ReusableReportsContainer reportType="topProducts" />
//     )}
//     {activeTab === "topPerformers" && (
//       <ReusableReportsContainer reportType="topPerformers" />
//     )}
//   </div>
// </div>
