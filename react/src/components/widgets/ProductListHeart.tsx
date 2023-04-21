import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { isAuthContext } from "../../context/isAuth";
import { favInterface, imagesInterface } from "../../interfaces/user";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { addToFavRedux, removeFromFavRedux } from "../../redux/favSlice";
import { Add_To_Fav, REMOVE_FROM_FAV } from "../../graphql/mutations/user";
import { heartVariant } from "../../variants/globals";
import { productContext } from "../product Route/Product";
import { toast } from "react-hot-toast";

interface Props {
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoraited: boolean;
  price: number;
  title: string;
  images?: imagesInterface[];
  parentId: string;
}

const ProductListHeart = ({
  isFavoraited,
  setIsFavorited,
  images,
  price,
  title,
  parentId,
}: Props) => {
  const { fav } = useAppSelector((state) => state.fav);

  useEffect(() => {
    if (fav?.length === 0) {
      setIsFavorited(false);
    }

    if (fav?.length > 0) {
      for (const image of images as imagesInterface[]) {
        const check = fav.some((e: favInterface) => image._id == e.productId);
        if (check) {
          setIsFavorited(true);
          break;
        } else {
          setIsFavorited(false);
        }
      }
    }
  }, [fav, images]);

  const [addToFav] = useMutation(Add_To_Fav);
  const [RemoveFromFav] = useMutation(REMOVE_FROM_FAV);

  const dispatch = useAppDispatch();

  return (
    <span className="heart-parent ">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        onClick={async () => {
          const userId = Cookies.get("user-id");
          setIsFavorited(!isFavoraited);

          if (!isFavoraited) {
            const obj = {
              userId,
              productId: (images as imagesInterface[])[0]._id,
              price,
              path: (images as imagesInterface[])[0].productPath,
              title,
              parentId,
            };
            const res = await addToFav({
              variables: obj,
            });
            toast.success(res.data.addToFav.msg);
            dispatch(addToFavRedux(obj));
          } else {
            const productId = images?.map((image) => image._id);
            const res = await RemoveFromFav({
              variables: {
                userId,
                productId,
              },
            });
            dispatch(removeFromFavRedux(productId));
            toast.success(res.data.removeFromFav.msg);
          }
        }}
      >
        <motion.path
          variants={heartVariant}
          initial="start"
          animate="end"
          custom={isFavoraited}
          d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
        />
      </svg>
    </span>
  );
};

export default ProductListHeart;
