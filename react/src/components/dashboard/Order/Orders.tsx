import React, { createContext, useContext, useEffect, useState } from "react";
import DashMain from "../DashMain";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../../../graphql/queries.js";
import Order from "./Table/Order";
import Checkbox from "../../../custom SVGs/checkbox";
import Title from "../../widgets/Title";
import Pages from "../../Product/Products/Pages";
import usePagination from "../../../custom/useNumberOfPages";
import { Remove_Order } from "../../../graphql/mutations/order.js";
import { AiTwotoneDelete } from "react-icons/ai";
import FadeElement from "../../widgets/FadeElement";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../custom/reduxTypes";
import MobileOrders from "./Mobile/MobileOrders";
import {
  addToOrderRedux,
  removeFromOrderRedux,
} from "../../../redux/OrderSlice";
import { opacityVariant } from "../../../variants/globals";
import { toast } from "react-hot-toast";
import { GrUpgrade } from "react-icons/gr";
import useIsMobile from "../../../custom/useIsMobile";
import OrderTable from "./Table/OrderTable";

interface contextInterface {
  setarrOfOrders: React.Dispatch<React.SetStateAction<string[]>>;
  arrOfOrders: string[];

  setSlectALl: React.Dispatch<React.SetStateAction<string | number>>;
  selectALl: string | number;
  dataShown: any[];
}
export const checkContext = createContext({} as contextInterface);
const Orders = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useIsMobile();

  const { data } = useQuery(GET_ALL_ORDERS);
  const [selectALl, setSlectALl] = useState<string | number>("");
  const [arrOfOrders, setarrOfOrders] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const { order } = useAppSelector((st) => st.order);

  const [dataShown, numberOfPages] = usePagination(14, page, order || []);
  useEffect(() => {
    if (data?.orders && order.length === 0) {
      dispatch(addToOrderRedux(data?.orders));
    }
  }, [data?.orders]);

  return (
    <checkContext.Provider
      value={{ dataShown, setarrOfOrders, arrOfOrders, setSlectALl, selectALl }}
    >
      <DashMain head="orders" key={"order-dashmain"}>
        {!isMobile ? (
          <OrderTable key={"table-order"} />
        ) : (
          <MobileOrders key={"mobile-order"} />
        )}
        <Pages
          key={"order-pages"}
          page={page}
          numOfPages={numberOfPages}
          setPage={setPage}
        />
      </DashMain>
    </checkContext.Provider>
  );
};

export default Orders;
