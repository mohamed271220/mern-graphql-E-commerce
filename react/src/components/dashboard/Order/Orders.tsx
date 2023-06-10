import React, { useEffect, createContext, useState } from "react";
import DashMain from "../DashMain";

import Pages from "../../Product/Products/Pages";
import usePagination from "../../../custom/useNumberOfPages";
import { useAppSelector } from "../../../custom/reduxTypes";
import MobileOrders from "./Mobile/MobileOrders";

import useIsMobile from "../../../custom/useIsMobile";
import OrderTable from "./Table/OrderTable";
import { Outlet } from "react-router-dom";

interface contextInterface {
  setarrOfOrders: React.Dispatch<React.SetStateAction<string[]>>;
  arrOfOrders: string[];

  setSlectALl: React.Dispatch<React.SetStateAction<string | number>>;
  selectALl: string | number;
  dataShown: any[];
}
export const checkContext = createContext({} as contextInterface);
const Orders = () => {
  const { isMobile } = useIsMobile();

  const [selectALl, setSlectALl] = useState<string | number>("");
  const [arrOfOrders, setarrOfOrders] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { order } = useAppSelector((st) => st.order);
  const [dataShown, numberOfPages] = usePagination(14, page, order || []);

  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboaed | orders";
    }, 400);
  }, []);
  return (
    <checkContext.Provider
      value={{ dataShown, setarrOfOrders, arrOfOrders, setSlectALl, selectALl }}
    >
      <DashMain head="orders" key={"order-dashmain"}>
        {!isMobile ? (
          <>
            <OrderTable key={"table-order"} />
          </>
        ) : (
          <MobileOrders key={"mobile-order"} />
        )}
        <Pages
          key={"order-pages"}
          page={page}
          numOfPages={numberOfPages}
          setPage={setPage}
        />
        <Outlet />
      </DashMain>
    </checkContext.Provider>
  );
};

export default Orders;
