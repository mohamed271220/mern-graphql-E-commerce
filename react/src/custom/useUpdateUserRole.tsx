import { useMutation } from "@apollo/client";
import { Update_User_ROle } from "../graphql/mutations/user";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "./reduxTypes";
import { updateUserRedux } from "../redux/UserSlice";

const useUpdateUserRole = (_id: string, role: string) => {
  const [fn] = useMutation(Update_User_ROle, {
    variables: {
      _id,
      role,
    },
  });

  const dispatch = useAppDispatch();
  const handleUpdateUserRole = async () => {
    try {
      const res = await fn();
      if (await res?.data.updateUserRole?.msg) {
        dispatch(updateUserRedux({ role, _id }));
        toast.success(res?.data.updateUserRole?.msg);
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error((err as Error).message);
      }
    }
  };
  return { handleUpdateUserRole };
};

export default useUpdateUserRole;
