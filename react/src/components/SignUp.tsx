import React, { useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { motion, stagger, useAnimate } from "framer-motion";
import { btnHover } from "../variants/globals";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Input from "./Input";
import { ADD_USER } from "../graphql/mutations/user";
const socialMediaArr = [
  { id: "1", icon: <FaFacebookF color="" />, clr: "var(--fb)" },
  { id: "2", icon: <AiOutlineTwitter />, clr: "var(--twitter)" },
  {
    id: "3",
    icon: <SiGmail />,
    clr: "var(--gmail)",
  },
];

const SignUp = () => {
  const methods = useForm();
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;
  const OnSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const [formRef, animateForm] = useAnimate();

  useEffect(() => {
    animateForm(
      "form > *,.log-with > *",
      { opacity: [0, 1], x: [20, 0] },
      { delay: stagger(0.2) }
    );
  }, []);

  const [addUserFn, { data }] = useMutation(ADD_USER);
  return (
    <div className="log-in center">
      <FormProvider {...methods}>
        <form
          action=""
          className="center"
          onSubmit={handleSubmit(OnSubmit)}
          ref={formRef}
        >
          <h3 className="underline header white"> sign Up</h3>
          <Input
            placeholder={"username"}
            err={errors?.username?.message?.toString()}
          />
          <Input
            placeholder={"email"}
            err={errors?.email?.message?.toString()}
          />{" "}
          <Input
            placeholder={"password"}
            err={errors?.password?.message?.toString()}
          />{" "}
          <Input
            placeholder={"confirm"}
            err={errors?.confirm?.message?.toString()}
          />{" "}
          {/* <Input
            placeholder={"phone"}
            err={errors?.phone?.message?.toString()}
          /> */}
          <motion.button
            whileHover={btnHover}
            type="submit"
            className="btn main"
            onClick={async () => {
              const { username: name, password, email } = getValues();

              const res = await addUserFn({
                variables: { name, password, email },
              });

              console.log(res);
            }}
          >
            sign Up
          </motion.button>
          <div className="redirect">
            <span> have an account</span>
            <a>log in</a>
          </div>
          <div className="or center">
            <span>or sign Up with</span>
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

export default SignUp;
