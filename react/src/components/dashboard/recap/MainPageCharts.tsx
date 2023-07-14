import React from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import useChartData from "./useChartData";

const MainPageCharts = ({ userData }: { userData: any[] }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { order } = useAppSelector((st) => st.order);
  const productChartData = useChartData(Allproducts, "products");
  const orderChartData = useChartData(order, "Orders");
  const EarningChartData = useChartData(order, "Earnings", "earn");
  const userChartData = useChartData(userData, "users");
  ChartJS.register(CategoryScale);
  const options = {
    scales: {
      x: {
        grid: {
          color: "grey",
        },
      },
      y: {
        grid: {
          color: "grey",
        },
      },
    },
  };
  return (
    <>
      <div className="dash-main-charts">
        <div className=" center chart-par between col ">
          <h3 className="header">Earnings Per Time</h3>

          <Bar data={EarningChartData || []} options={options} />
        </div>
        <div className=" center chart-par col  between">
          <h3 className="header">Orders Per Time</h3>
          <div>
            <Pie data={orderChartData || []} options={options} />
          </div>
        </div>
        <div className="center  chart-par col  between">
          <h3 className="header">Added Products Per Time</h3>
          <Line data={productChartData || []} options={options} />
        </div>

        <div className="center chart-par col  between">
          <h3>Users Per Time</h3>
          <Line data={userChartData || []} options={options} />
        </div>
      </div>
    </>
  );
};

export default MainPageCharts;
