import { useMutation } from "@apollo/client";
import { Add_To_Fav } from "../graphql/mutations/user";
import { addToFavRedux } from "../redux/favSlice";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "./reduxTypes";

interface Props {
  userId: string;
  productId: string;
  price: number;
  path: string;
  title: string;
  parentId: string;
}

const useAddToFav = (obj: Props) => {
  const [addToFav] = useMutation(Add_To_Fav);
  const dispatch = useAppDispatch();
  const handleAddToFav = async () => {
    const res = await addToFav({
      variables: obj,
    });
    toast.success(res.data.addToFav.msg);
    dispatch(addToFavRedux(obj));
  };

  return { handleAddToFav };
};

export default useAddToFav;
