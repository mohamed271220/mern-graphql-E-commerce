import React, { createContext, useState, useEffect } from "react";
import { cartInterface, favInterface } from "../interfaces/user";
import { useMutation } from "@apollo/client";
import { GET_USER_DATA } from "../graphql/mutations/user";
import Cookies from "js-cookie";
import { useAppDispatch } from "../custom/reduxTypes";
import { addToFavRedux } from "../redux/favSlice";
import { addToCartRedux, changeCartCountRedux } from "../redux/CartSlice";
import { ChildrenInterFace } from "../interfaces/general.js";
import { addToCompareRedux } from "../redux/compareSlice";
import {
  addToNotificatinsRedux,
  changeNotificationCount,
} from "../redux/notificationsSlice";

export interface favArrInterface {
  productId: string;
  parentId?: string;
  price: number;
  title: string;
  path: string;
  _id: string;
}
export interface compareInterface {
  productId: string;
  title: string;
}
interface userDataState {
  email: string;
  name: string;
  country: string;
  phone: string;
  fav: favInterface[];
  cart: cartInterface[];
  compare: compareInterface[];
  //-imp to use braket notation wuth variables
  [key: string]: any;
}

interface authContextInterface extends userDataState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  userData: userDataState;
}

export const isAuthContext = createContext({} as authContextInterface);

const IsAuthContextComponent = ({ children }: ChildrenInterFace) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isowner, setIsowner] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    fav: [],
    cart: [],
    compare: [],
    country: "",
    phone: "",
    role: "",
  } as userDataState);
  const [getData, { data, loading }] = useMutation(GET_USER_DATA);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setUserId(Cookies.get("user-id") as unknown as string);
  }, [isAuth]);

  useEffect(() => {
    if (userId) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      setIsAdmin(false);
      setIsModerator(false);
      setIsowner(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getData({
        variables: {
          id: userId,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (data?.getUserData) {
      setUserData(data?.getUserData);
      dispatch(addToFavRedux(data?.getUserData?.fav));
      dispatch(addToCartRedux(data?.getUserData?.cart));
      dispatch(addToCompareRedux(data?.getUserData?.compare));
      dispatch(addToNotificatinsRedux(data?.getUserData?.notifications));
      dispatch(changeNotificationCount(data?.getUserData?.notificationsCount));
      setProfile(data?.getUserData?.image);
    }
    if (data?.getUserData?.role === "admin") {
      setIsAdmin(true);
    } else if (data?.getUserData?.role === "moderator") {
      setIsModerator(true);
    } else if (data?.getUserData?.role === "owner") {
      setIsowner(true);
    }
  }, [data?.getUserData?.name]);

  console.log({
    count: data?.getUserData?.notificationsCount,
    user: data?.getUserData,
  });
  return (
    <isAuthContext.Provider
      value={{
        userData,
        isAuth,
        fav: userData.fav,
        cart: userData.cart,
        compare: userData.compare,
        email: userData.email,
        name: userData.name,
        country: userData.country,
        phone: userData.phone,
        setIsAuth,
        userId,
        profile,
        setProfile,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};

export default IsAuthContextComponent;
