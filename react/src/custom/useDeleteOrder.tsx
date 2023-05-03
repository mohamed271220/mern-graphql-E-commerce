import { toast } from "react-hot-toast";
import { removeFromOrderRedux } from "../redux/OrderSlice";
import { useAppDispatch } from "./reduxTypes";
import { Remove_Order } from "../graphql/mutations/order";
import { useMutation } from "@apollo/client";

const useDeleteOrder = (arr: string[]) => {
  const dispatch = useAppDispatch();
  const [deleteOrder] = useMutation(Remove_Order);
  const handleDeleteOrder = async () => {
    const res = deleteOrder({
      variables: { _id: arr },
    });
    dispatch(removeFromOrderRedux(arr));
    toast.success((await res).data.deleteOrder.msg);
  };

  return { handleDeleteOrder };
};

export default useDeleteOrder;
