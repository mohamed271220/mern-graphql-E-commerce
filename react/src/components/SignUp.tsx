import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { motion, stagger, useAnimate } from "framer-motion";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Input from "./widgets/Input";
import { ADD_USER } from "../graphql/mutations/user";
import { NavLink, useNavigate } from "react-router-dom";
import OpacityBtn from "./widgets/OpacityBtn";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import SelectCOuntry from "./user/SelectCOuntry";
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
  const navigate = useNavigate();
  const [addUserFn] = useMutation(ADD_USER);
  const [country, setCountry] = useState("egypt");

  const handleSignUp = async () => {
    const { username: name, password, email } = getValues();

    const { data } = await addUserFn({
      variables: { name, password, email, country },
    });
    console.log(data);
    if (data.addUser.status === 200) {
      navigate("/login");
      toast.success(data.addUser.msg);
    } else {
      toast(data.addUser.msg, {
        icon: <AiFillWarning fontSize={18} color="var(--star)" />,
      });
    }
  };
  return (
    <div className="log-in center">
      <FormProvider {...methods}>
        <form
          action=""
          className="center"
          onSubmit={handleSubmit(OnSubmit)}
          ref={formRef}
        >
          <h2 className="underline header white"> sign Up</h2>
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
          />
          <SelectCOuntry setCountry={setCountry} country={country} />
          <Input
            placeholder={"confirm"}
            err={errors?.confirm?.message?.toString()}
          />
          <OpacityBtn btn="sign up" cls="btn main" fn={handleSignUp} />
          <div className="redirect">
            <span> have an account</span>
            <NavLink to="/login">log in</NavLink>
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
