import { useMutation } from "@apollo/client";
import { LogOut_Mutation } from "../graphql/mutations/user";
import { useContext } from "react";
import { isAuthContext } from "../context/isAuth";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const useLogOut = () => {
  const { setIsAuth, userId } = useContext(isAuthContext);

  const [fn, { data }] = useMutation(LogOut_Mutation);
  const handleLogOut = () => {
    fn({
      variables: {
        lastLogIn: new Date().toISOString(),
        _id: userId,
      },
    });
    if (data?.logOut.msg) {
      toast.success(data?.logOut.msg);
      setIsAuth(false);
      const cookies = Cookies.get();

      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
    }
  };

  return { handleLogOut };
};

export default useLogOut;
