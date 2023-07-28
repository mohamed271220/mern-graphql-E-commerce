import React from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import useChartData from "./useChartData";
import { motion } from "framer-motion";
import { ChildrenInterFace } from "../../../interfaces/general";

const MainPageCharts = ({ userData }: { userData: any[] }) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { order } = useAppSelector((st) => st.order);
  const productChartData = useChartData(Allproducts, "products");
  const orderChartData = useChartData(order, "Orders");
  const EarningChartData = useChartData(order, "Earnings", "earn");
  const userChartData = useChartData(userData, "users");
  ChartJS.register(CategoryScale);

  interface Props extends ChildrenInterFace {
    head: string;
  }

  const InViewPar = ({ head, children }: Props) => {
    return (
      <motion.div
        className=" center chart-par col  between"
        style={{ opacity: 0 }}
        transition={{ delay: 0.05 }}
        whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
      >
        <h3 className="header">{head}</h3>

        {children}
      </motion.div>
    );
  };

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
      {Allproducts.length >= 1 && (
        <div className="dash-main-charts">
          <InViewPar head="Earnings Per Time">
            <div>
              <Bar data={EarningChartData || []} options={options} />
            </div>
          </InViewPar>
          <InViewPar head="Orders Per Time">
            <div>
              <Pie data={orderChartData || []} options={options} />
            </div>
          </InViewPar>
          <InViewPar head="Added Products Per Time">
            <Line data={productChartData || []} options={options} />
          </InViewPar>

          <InViewPar head="Users Per Time">
            <Line data={userChartData || []} options={options} />
          </InViewPar>
        </div>
      )}
    </>
  );
};

export default MainPageCharts;
