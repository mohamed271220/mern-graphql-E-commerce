import { toast } from "react-hot-toast";
import { removeFromCompareRedux } from "../redux/compareSlice";
import { useMutation } from "@apollo/client";
import { remove_From_Compare } from "../graphql/mutations/user";
import { useAppDispatch } from "./reduxTypes";

interface Props {
  userId: string;
  productId: string;
}
const useRemoveFromCompareList = ({ userId, productId }: Props) => {
  const [removeFromCompare] = useMutation(remove_From_Compare);
  const dispatch = useAppDispatch();
  const handleRemoveFromCompare = async () => {
    const obj = { userId, productId };
    const { data } = await removeFromCompare({ variables: obj });
    if (data?.removeFromCompare?.msg)
      dispatch(removeFromCompareRedux(productId));
    toast.success(data?.removeFromCompare?.msg);
  };
  return { handleRemoveFromCompare };
};

export default useRemoveFromCompareList;
