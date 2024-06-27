import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import styles from "./DistributorReportsContainer.module.scss";
import { getDistributorSalesData } from "../../services/Distributor.services";

const DistributorReportsContainer = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  //   const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getDistributorSalesData(startDate, endDate);
      setData(response);
      //   setFilteredData(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  //   useEffect(() => {
  //     if (startDate && endDate) {
  //       const filtered = data.filter((item) => {
  //         const itemDate = new Date(item.date);
  //         return itemDate >= startDate && itemDate <= endDate;
  //       });
  //       setFilteredData(filtered);
  //     } else {
  //       setFilteredData(data);
  //     }
  //   }, [data, startDate, endDate]);

  return (
    <div className={styles.ChartContainer}>
      <h2 className={styles.ChartTitle}>Sales Report</h2>
      <div className={styles.DatePickerContainer}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className={styles.DatePicker}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className={styles.DatePicker}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalRevenue" fill="#1e90ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributorReportsContainer;
