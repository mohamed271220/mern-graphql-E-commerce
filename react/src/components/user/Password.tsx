import React, { useState, useContext, useEffect } from "react";
import OpacityBtn from "../widgets/OpacityBtn";
import { GrUpdate } from "react-icons/gr";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/Input";
import { isAuthContext } from "../../context/isAuth";
import SlideButton from "../widgets/SlideButton";
import { AnimatePresence } from "framer-motion";
import { useMutation } from "@apollo/client";
import { Check_Old_Pass, Update_Pass } from "../../graphql/mutations/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface Props {
  value: string;
  detail: string;
  fn: (variables: any) => void;
  placeholder?: string;
}

const Password = () => {
  const { userData, userId } = useContext(isAuthContext);

  const schema = yup.object().shape({
    old: yup
      .string()
      .min(6)
      .max(20)

      .matches(
        /\w+\d+[^a-zA-Z0-9]+/,
        "insert 1 number,1 letter and 1 character"
      )
      .required(),
    new: yup
      .string()
      .min(6)
      .max(20)
      .required()
      .matches(
        /\w+\d+[^a-zA-Z0-9]+/,
        "insert 1 number,1 letter and 1 character"
      ),
    confirm: yup
      .string()
      .oneOf([yup.ref("new")], "doesn't match your password")
      .required(),
  });

  const [showPass, setShowPass] = useState(false);

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const { old, new: newPass } = getValues();

  const OnSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const [checkOldPass] = useMutation(Check_Old_Pass, {
    variables: { _id: userId, password: old },
  });

  const [updatePass] = useMutation(Update_Pass, {
    variables: { _id: userId, password: newPass },
  });

  const passwordFn = async () => {
    const {
      data: {
        checkOldPassword: { status, msg },
      },
    } = await checkOldPass();
    if (status === 200) {
      const data = await updatePass();
      console.log(data);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        action=""
        // className="center col gap"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <div className="user-detail-par center">
          <span className="user-detail detail">Password :</span>

          <span className="user-value value"> **********</span>

          <OpacityBtn
            key={"password"}
            btn="update"
            cls="btn update-user center gap"
            fn={() => {
              setShowPass(true);
            }}
            Icon={GrUpdate}
          />
          <AnimatePresence>
            {showPass && (
              <SlideButton
                key={`password-btn`}
                height={280}
                sethide={setShowPass}
                cls="update-user-slide password"
                doneMsg={`your password is updated`}
                fn={passwordFn}
                head={`update your password`}
                isVaild={isValid}
              >
                <Input
                  placeholder={"old"}
                  err={errors?.old?.message?.toString()}
                />
                <Input
                  placeholder={"new"}
                  err={errors?.new?.message?.toString()}
                />
                <Input
                  placeholder={"confirm"}
                  err={errors?.confirm?.message?.toString()}
                />
              </SlideButton>
            )}
          </AnimatePresence>
        </div>
      </form>
    </FormProvider>
  );
};

export default Password;
