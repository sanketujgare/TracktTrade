import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import styles from "./ReusableReportsContainer.module.scss";
import {
  getTopPerformersReports,
  getTopProductsReports,
} from "../../services/Manufacturer.services";

const ReusableReportsContainer = ({ reportType }: { reportType: string }) => {
  const [startDate, setStartDate] = useState(null | Date);
  const [endDate, setEndDate] = useState(null | Date);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (reportType) {
          case "sales":
            response = await getSalesData(startDate, endDate);
            break;
          case "points":
            response = await getPointsData(startDate, endDate);
            break;
          case "topProducts":
            response = await getTopProductsReports(startDate, endDate);
            break;
          case "topPerformers":
            response = await getTopPerformersReports(startDate, endDate);
            break;
          default:
            return;
        }
        setData(response);
        setFilteredData(response);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (startDate && endDate) {
      fetchData();
    }
  }, [reportType, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.month);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, startDate, endDate]);

  return (
    <div className={styles.ChartContainer}>
      <h2 className={styles.ChartTitle}>
        {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
      </h2>
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
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#1e90ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableReportsContainer;
