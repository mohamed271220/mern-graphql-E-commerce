import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { motion } from "framer-motion";
import { btnHover } from "../variants/globals";
import { useForm, FormProvider, FieldValues } from "react-hook-form";

import Input from "./widgets/Input";
import { useMutation } from "@apollo/client";
import { Authenticate_Query } from "../graphql/mutations/user";

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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const [authenticate, { data }] = useMutation(Authenticate_Query);
  return (
    <div className="log-in center">
      <FormProvider {...methods}>
        <form action="" className="center" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="underline header white"> log in</h3>
          <Input
            placeholder={"email"}
            err={errors.email?.message?.toString()}
          />
          <Input
            placeholder={"password"}
            err={errors.password?.message?.toString()}
          />
          <motion.button
            whileHover={btnHover}
            type="submit"
            className="btn main"
            onClick={async () => {
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
              console.log(res);
            }}
          >
            log in
          </motion.button>

          <div className="redirect">
            <span> don&#39;t have an account</span>
            <a>sign up</a>
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
