import styles from "./ProductsReportsContainer.module.scss";
import { ProductsReportsContainerProps } from "./ProductsReportsContainer.types.ts";

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

import { getTopProductsReports } from "../../services/Manufacturer.services";

const ProductsReportsContainer = ({}: ProductsReportsContainerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [productsData, setProductsData] = useState([]);
  //   const [filteredData, setFilteredData] = useState(apiData);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("clciked");
        if (startDate && endDate) {
          const fetchedData = await getTopProductsReports(startDate, endDate);
          setProductsData(fetchedData);
          //   setFilteredData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (startDate && endDate) {
      loadData();
    }
  }, [startDate, endDate]);

  //   console.log(apiData);

  //   useEffect(() => {
  //     if (startDate && endDate) {
  //       const filtered = apiData.filter((item) => {
  //         const itemDate = new Date(item.month);
  //         return itemDate >= startDate && itemDate <= endDate;
  //       });
  //       setFilteredData(filtered);
  //     } else {
  //       setFilteredData(apiData);
  //     }
  //   }, [startDate, endDate, apiData]);

  console.log();
  return (
    <div className={styles.ChartContainer}>
      <h2 className={styles.ChartTitle}>Top Products</h2>
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
        width="100%"
        height={300}
      >
        <BarChart data={productsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalQuantitySold" fill="#1e90ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductsReportsContainer;
