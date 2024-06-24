import React, { useState } from "react";
// import ReusableChart from "./ReusableChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DistributorReports.module.scss";
import ReusableChart from "../ReusableChart/ReusableChart";

const DistributorReports = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChartTypeChange = (type: "line" | "bar") => {
    setChartType(type);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filterDataByDate = (data: any[]) => {
    if (!startDate || !endDate) return data;
    return data.filter((item) => {
      const itemDate = new Date(item.month);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const salesData = [
    { month: "2023-01", sales: 1200 },
    { month: "2023-02", sales: 1500 },
    { month: "2023-03", sales: 1600 },
    // ... more data
  ];

  const pointsData = [
    { month: "2023-01", points: 200 },
    { month: "2023-02", points: 450 },
    { month: "2023-03", points: 600 },
    // ... more data
  ];

  const filteredSalesData = filterDataByDate(salesData);
  const filteredPointsData = filterDataByDate(pointsData);

  return (
    <div className={styles.DistributorReportsContainer}>
      <div className={styles.Header}>
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
        <div className={styles.DatePickerContainer}>
          <button
            className={styles.DatePickerToggle}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            Select Date Range
          </button>
          <div className={styles.DatePickerWrapper}>
            {showDatePicker && (
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.ChartTypeButtons}>
        <button
          className={`${styles.ChartTypeButton} ${
            chartType === "line" ? styles.Active : ""
          }`}
          onClick={() => handleChartTypeChange("line")}
        >
          Line Chart
        </button>
        <button
          className={`${styles.ChartTypeButton} ${
            chartType === "bar" ? styles.Active : ""
          }`}
          onClick={() => handleChartTypeChange("bar")}
        >
          Bar Chart
        </button>
      </div>
      <div className={styles.TabContent}>
        {activeTab === "sales" && (
          <ReusableChart
            title="Total Sales"
            data={filteredSalesData}
            dataKey="sales"
            chartType={chartType}
            color="#31c4e6"
          />
        )}
        {activeTab === "points" && (
          <ReusableChart
            title="Total Points"
            data={filteredPointsData}
            dataKey="points"
            chartType={chartType}
            color="#1e90ff"
          />
        )}
      </div>
    </div>
  );
};

export default DistributorReports;
