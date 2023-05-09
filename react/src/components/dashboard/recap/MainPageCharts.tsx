import React, { useContext } from "react";
import useDashProgress from "../../../custom/useDashProgress";
import { useAppSelector } from "../../../custom/reduxTypes";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { PolarArea, Bar, Pie, Line } from "react-chartjs-2";
import useChartData from "./useChartData";
import { themeContext } from "../../../context/ThemContext";
const MainPageCharts = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { order } = useAppSelector((st) => st.order);
  const productChartData = useChartData(Allproducts, "products");
  const orderChartData = useChartData(order, "Orders");
  const EarningChartData = useChartData(order, "Earnings", "earn");
  const { theme } = useContext(themeContext);
  ChartJS.register(CategoryScale);
  const options = {
    scales: {
      x: {
        grid: {
          color: theme === "light" ? "white" : "black",
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "white" : "black",
        },
      },
    },
  };
  return (
    <>
      <h2
        style={{ marginTop: 40, marginBottom: -20 }}
        className="underline header col"
      >
        analytics
      </h2>
      <div className="dash-main-charts">
        <div
          className="box-shadow center w-100 chart-par between col"
          style={{ marginTop: 10 }}
        >
          <h3>Orders Per Time</h3>
          <Bar data={EarningChartData} options={options} />
        </div>
        <div
          className="box-shadow center w-100 chart-par col between"
          style={{ marginTop: 10 }}
        >
          <h3>Earnings Per Time</h3>

          <Pie data={orderChartData} options={options} />
        </div>
        <div
          className="box-shadow center w-100 chart-par col between"
          style={{ marginTop: 10 }}
        >
          <h3>Added Products Per Time</h3>
          <Line data={productChartData} options={options} />
        </div>
      </div>
    </>
  );
};

export default MainPageCharts;
