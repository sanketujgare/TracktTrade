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

import styles from "./ReportsContainer.module.scss";
import { ReportsContainerProps } from "./ReportsContainer.types.ts";

const ReportsContainer = ({ data }: ReportsContainerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState(data);

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
      <ResponsiveContainer
        className={styles.BarChartContainer}
        width="50%"
        height={300}
      >
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

export default ReportsContainer;
