import { toast } from "react-hot-toast";
import { removeFromOrderRedux, updateOrderRedux } from "../redux/OrderSlice";
import { useAppDispatch } from "./reduxTypes";
import { useMutation } from "@apollo/client";
import { update_Order } from "../graphql/mutations/order";

const useUpdateOrder = (id: string, state: string) => {
  const dispatch = useAppDispatch();
  const [updateOrder] = useMutation(update_Order);
  const handleUpdateOrder = async () => {
    const res = updateOrder({
      variables: { _id: id, state },
    });
    dispatch(updateOrderRedux({ id, state }));
    toast.success((await res).data.updateOrder.msg);
  };

  return { handleUpdateOrder };
};

export default useUpdateOrder;