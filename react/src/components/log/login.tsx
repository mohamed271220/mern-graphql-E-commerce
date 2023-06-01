import React, { useContext } from "react";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

import Input from "../widgets/Input";
import { useMutation } from "@apollo/client";
import { Authenticate_Query } from "../../graphql/mutations/user";
import OpacityBtn from "../widgets/OpacityBtn";
import { toast } from "react-hot-toast";
import { isAuthContext } from "../../context/isAuth";
import { NavLink } from "react-router-dom";
import Animation from "../widgets/Animation";
import LogInWithGoogle from "./LogInWithGoogle";
import FormAnimation from "../widgets/FormAnimation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email("insert a valid email").required(),
    password: yup.string().required(),
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    formState: { errors },
    handleSubmit,
    getValues,
  } = methods;

  const { setIsAuth } = useContext(isAuthContext);

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
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    handleLogIn();
  };

  return (
    <Animation>
      <div className="log-in center">
        <FormProvider {...methods}>
          <FormAnimation fn={handleSubmit(onSubmit)} cls="center">
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

            <OpacityBtn
              cls="btn main w-100"
              fn={() => null}
              btn="log In"
              type="submit"
            />

            <div className="redirect">
              <span> don&#39;t have an account</span>
              <NavLink to="/signup">sign up</NavLink>
            </div>

            <div className="or center">
              <span>or</span>
            </div>
            <LogInWithGoogle />
          </FormAnimation>
        </FormProvider>
      </div>
    </Animation>
  );
};

export default Login;
