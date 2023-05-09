import React, { useState } from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import BarChart from "../charts/Bar";
import useChartData from "./useChartData";

const Charts = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { order } = useAppSelector((st) => st.order);
  const productChartData = useChartData(Allproducts, "added products per time");
  const orderChartData = useChartData(order, "orders per time");
  const EarningChartData = useChartData(order, "total Earnings", "earn");
  return (
    <>
      <BarChart data={productChartData} key="added products per time" />
      <BarChart data={orderChartData} key="orders per time" />
      <BarChart data={EarningChartData} key="earning per time" />
    </>
  );
};

export default Charts;
