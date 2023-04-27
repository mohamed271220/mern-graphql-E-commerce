import React, { useState, useContext, useEffect } from "react";
import OpacityBtn from "../widgets/OpacityBtn";
import { GrUpdate } from "react-icons/gr";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/Input";
import { isAuthContext } from "../../context/isAuth";
import SlideButton from "../widgets/SlideButton";
import { AnimatePresence } from "framer-motion";
import UpdateCountry from "./UpdateCountry";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFormSchema from "../../custom/useFormSchema";
interface Props {
  value: string;
  detail: string;
  fn: (variables: any) => void;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
  placeholder?: string;
}

const Detail = ({ detail, value, setter, fn, bool, placeholder }: Props) => {
  const { userData, userId, setIsUpdated } = useContext(isAuthContext);
  const [UpdatedCountry, setUpdatedCountry] = useState("");

  useEffect(() => {
    if (userData?.country) {
      setUpdatedCountry(userData.country);
    }
  }, [userData?.country]);
  const schema: { [key: string]: any } = {
    name: yup.object().shape({
      name: yup.string().min(6).max(12).required("insert a name"),
    }),
    email: yup.object().shape({
      email: yup.string().email().required("insert a vaild email"),
    }),
    password: yup.object().shape({
      old: yup
        .string()
        .min(6)
        .max(20)

        .matches(
          /\w+\d+[^a-zA-Z0-9]+/,
          "insert 1 number,1 letter and 1 character"
        ),
      new: yup
        .string()
        .min(6)
        .max(20)

        .matches(
          /\w+\d+[^a-zA-Z0-9]+/,
          "insert 1 number,1 letter and 1 character"
        ),
      confirm: yup
        .string()
        .oneOf([yup.ref("new")], "doesn't match your password")
        .required(),
    }),
    phone: yup.object().shape({
      phone: yup.string().min(10).required(),
    }),
    country: yup.object().shape({
      phone: yup.mixed().notRequired(),
    }),
  };
  // const k = yup.object().shape({
  // name: yup.string().min(6).max(12).required(),
  // email: yup.string().email().required("insert a vaild email"),
  // password: yup
  //   .string()
  //   .min(6)
  //   .max(20)

  //   .matches(
  //     /\w+\d+[^a-zA-Z0-9]+/,
  //     "insert 1 number,1 letter and 1 character"
  //   ),
  // confirm: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "doesn't match your password")
  //   .required(),
  // phone: yup.string().min(10),
  // });
  const methods = useForm({ resolver: yupResolver(schema[detail]) });
  const {
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const { [detail]: detailvalue } = getValues();
  const update = () => {
    fn({
      variables: {
        _id: userId,
        [detail]: detail === "country" ? UpdatedCountry : detailvalue,
      },
    });
    setIsUpdated(true);
  };
  const OnSubmit = (data: FieldValues) => {
    console.log(data);
    update();
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(OnSubmit)}>
        <div className="user-detail-par center">
          <span className="user-detail detail">{detail} :</span>
          <span className="user-value value">{value}</span>

          <OpacityBtn
            key={detail}
            btn="update"
            cls="btn update-user center gap"
            fn={() => {
              setter(true);
            }}
            Icon={GrUpdate}
          />
          <AnimatePresence>
            {bool && (
              <SlideButton
                key={`${detail}-btn`}
                height={200}
                sethide={setter}
                cls="update-user-slide"
                doneMsg={`your ${detail} is updated`}
                fn={update}
                isVaild={detail !== "detail" ? isValid : true}
                head={`update your ${detail}`}
              >
                {detail !== "country" && (
                  <Input
                    placeholder={placeholder || detail}
                    defaultVal={userData[detail]}
                    err={(errors as { [key: string]: any })[
                      detail
                    ]?.message?.toString()}
                  />
                )}
                {detail === "country" && (
                  <UpdateCountry
                    country={UpdatedCountry}
                    setCountry={setUpdatedCountry}
                  />
                )}
              </SlideButton>
            )}
          </AnimatePresence>
        </div>
      </form>
    </FormProvider>
  );
};

export default Detail;
