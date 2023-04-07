import React, { createContext, useState, useEffect } from "react";
import { cartInterface, favInterface } from "../components/interfaces/user";
import { useMutation } from "@apollo/client";
import { GET_USER_DATA } from "../graphql/mutations/user";
import Cookies from "js-cookie";
import { useAppDispatch } from "../custom/reduxTypes";
import { addToFavRedux } from "../redux/cartSlice";

interface Props {
  children: React.ReactNode;
}

export interface favArrInterface {
  productId: string;
  price: number;
  title: string;
  path: string;
  _id: string;
}
interface userDataState {
  email: string;
  name: string;
  fav: favInterface[];
  cart: cartInterface[];
}

interface authContextInterface extends userDataState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const isAuthContext = createContext({} as authContextInterface);

const IsAuthContextComponent = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    fav: [],
    favArr: [],
    cart: [],
  } as userDataState);

  const [getData, { data, loading }] = useMutation(GET_USER_DATA);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = Cookies.get("user-id");
    if (userId) {
      getData({
        variables: {
          id: userId,
        },
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (data?.getUserData) {
      setUserData(data?.getUserData);
      dispatch(addToFavRedux(data?.getUserData?.fav));
    }
  }, [data?.getUserData?.name]);
  return (
    <isAuthContext.Provider
      value={{
        isAuth,
        fav: userData.fav,
        cart: userData.cart,
        email: userData.email,
        name: userData.name,
        setIsAuth,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};

export default IsAuthContextComponent;
