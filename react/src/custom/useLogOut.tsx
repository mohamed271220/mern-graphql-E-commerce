import { useMutation } from "@apollo/client";
import { LogOut_Mutation } from "../graphql/mutations/user";
import { useContext } from "react";
import { isAuthContext } from "../context/isAuth";
import { toast } from "react-hot-toast";

const useLogOut = () => {
  const { setIsAuth, userId } = useContext(isAuthContext);

  const [fn] = useMutation(LogOut_Mutation);
  const handleLogOut = async () => {
    const { data } = await fn({
      variables: {
        lastLogIn: new Date().toISOString(),
        _id: userId,
      },
      context: {
        credentials: "include",
      },
    });
    // console.log(data);
    if (data?.logOut.msg) {
      toast.success(data?.logOut.msg);
      setIsAuth(false);
    }
  };

  return { handleLogOut };
};

export default useLogOut;
