import { useMutation } from "@apollo/client";
import { LogOut_Mutation } from "../graphql/mutations/user";
import { useContext } from "react";
import { isAuthContext } from "../context/isAuth";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const useLogOut = () => {
  const { setIsAuth, userId } = useContext(isAuthContext);

  const [fn] = useMutation(LogOut_Mutation);
  const handleLogOut = async () => {
    console.log({ setIsAuth, userId });
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
    const { data } = await fn({
      variables: {
        lastLogIn: new Date().toISOString(),
        _id: userId,
      },
    });
    console.log(data);
    if (data?.logOut.msg) {
      toast.success(data?.logOut.msg);
      setIsAuth(false);
    }
  };

  return { handleLogOut };
};

export default useLogOut;
