import { useMutation } from "@apollo/client";
import { Add_To_Cart } from "../graphql/mutations/user";
import { useAppDispatch } from "./reduxTypes";
import { addToCartRedux } from "../redux/CartSlice";
import { toast } from "react-hot-toast";

interface Props {
  userId: string;
  productId: string;
  path: string;
  parentId: string;
  price: number;
  title: string;
}
const useAddToCart = (obj: Props) => {
  const [addToCart] = useMutation(Add_To_Cart, {
    variables: {
      ...obj,
      count: 1,
    },
  });

  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    const { data } = await addToCart();
    dispatch(
      addToCartRedux({
        ...obj,
        count: 1,
      })
    );
    toast.success(data.addToCart.msg);
  };
  return { handleAddToCart };
};

export default useAddToCart;
