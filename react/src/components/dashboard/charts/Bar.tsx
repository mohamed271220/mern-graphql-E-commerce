import React from "react";
import { PolarArea, Doughnut, Radar, Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";

const BarChart = ({ data }: any) => {
  ChartJS.register(CategoryScale);

  return (
    <>
      <Bar data={data} />
      <Pie data={data} />
      <Line data={data} />
      <Doughnut data={data} />
      <Radar data={data} />
      <PolarArea data={data} />
    </>
  );
};

export default BarChart;
