import React, { useContext } from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import { useForm, FormProvider, FieldValues } from "react-hook-form";

import Input from "./widgets/Input";
import { useMutation } from "@apollo/client";
import { Authenticate_Query } from "../graphql/mutations/user";
import OpacityBtn from "./widgets/OpacityBtn";
import { toast } from "react-hot-toast";
import { isAuthContext } from "../context/isAuth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Transition from "./widgets/Transition";

const socialMediaArr = [
  { id: "1", icon: <FaFacebookF color="" />, clr: "var(--fb)" },
  { id: "2", icon: <AiOutlineTwitter />, clr: "var(--twitter)" },
  {
    id: "3",
    icon: <SiGmail />,
    clr: "var(--gmail)",
  },
];
const Login = () => {
  const methods = useForm();
  const {
    formState: { errors },
    handleSubmit,
    getValues,
  } = methods;

  const { setIsAuth } = useContext(isAuthContext);
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const [authenticate] = useMutation(Authenticate_Query);
  const handleLogIn = async () => {
    const { email, password } = getValues();
    const res = await authenticate({
      variables: {
        email,
        password,
      },
      context: {
        credentials: "include",
      },
    });
    if (res.data.authenticate.msg) {
      toast.success(res.data.authenticate.msg);
      setIsAuth(true);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="log-in center">
      <Transition />

      <FormProvider {...methods}>
        <form action="" className="center" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="underline header " style={{ color: "var(--white)" }}>
            {" "}
            log in
          </h2>
          <Input
            placeholder={"email"}
            err={errors.email?.message?.toString()}
          />
          <Input
            placeholder={"password"}
            err={errors.password?.message?.toString()}
            type={"password"}
          />

          <OpacityBtn cls="btn main w-100" fn={handleLogIn} btn="log In" />

          <div className="redirect">
            <span> don&#39;t have an account</span>
            <NavLink to="/signup">sign up</NavLink>
          </div>

          <div className="or center">
            <span>or sign in with</span>
          </div>

          <div className="log-with center">
            {socialMediaArr.map(({ icon, id, clr }) => {
              return (
                <motion.div
                  animate={{ color: clr, background: "var(--white" }}
                  className="log-social center"
                  key={id}
                  whileHover={{
                    color: "white",
                    background: clr,
                  }}
                  onClick={() => {
                    // const prev = navigate(-1);
                    // console.log(prev);

                    //google
                    // window.open(
                    //   `http://localhost:3000/auth/login/google?location=about`,
                    //   "_self"
                    // );
                    window.open(
                      `http://localhost:3000/auth/login/facebook?location=about`,
                      "_self"
                    );
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
