import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./ReusableChart.module.scss";

interface ReusableChartProps {
  title: string;
  data: any[];
  dataKey: string;
  chartType: "line" | "bar";
  color: string;
}

const ReusableChart = ({
  title,
  data,
  dataKey,
  chartType,
  color,
}: ReusableChartProps) => {
  return (
    <div className={styles.ChartContainer}>
      <h2 className={styles.ChartTitle}>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke={color} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableChart;
