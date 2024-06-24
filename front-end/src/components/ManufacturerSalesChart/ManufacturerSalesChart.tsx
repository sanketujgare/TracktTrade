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
import styles from "./ManufacturerSalesChart.module.scss";
import { ManufacturerSalesChartProps } from "./ManufacturerSalesChart.types";

// Example sales data
const salesData = [
  { month: "2023-01", sales: 4000 },
  { month: "2023-02", sales: 3000 },
  { month: "2023-03", sales: 2000 },
  { month: "2023-04", sales: 2780 },
  { month: "2023-05", sales: 1890 },
  { month: "2023-06", sales: 2390 },
  { month: "2023-07", sales: 3490 },
  { month: "2023-08", sales: 2000 },
  { month: "2023-09", sales: 2780 },
  { month: "2023-10", sales: 1890 },
  { month: "2023-11", sales: 2390 },
  { month: "2023-12", sales: 3490 },
];

const ManufacturerSalesChart = ({ salesData }: ManufacturerSalesChartProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState(salesData);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = salesData.filter((item) => {
        const itemDate = new Date(item.month);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(salesData);
    }
  }, [startDate, endDate]);

  return (
    <div className={styles.ChartContainer}>
      <h2 className={styles.ChartTitle}>Total Sales</h2>
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
          <Bar dataKey="sales" fill="#1e90ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManufacturerSalesChart;
