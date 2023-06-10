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
import { userDataInterface } from "./UserInfo";
import { toast } from "react-hot-toast";
interface Props {
  value: string;
  detail: string;
  fn: (variables: any) => any;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
  placeholder?: string;
  setUpdateUserData: React.Dispatch<React.SetStateAction<userDataInterface>>;
  userdata: userDataInterface;
}

const Detail = ({
  detail,
  value,
  setter,
  fn,
  bool,
  placeholder,
  setUpdateUserData,
  userdata,
}: Props) => {
  const { userId } = useContext(isAuthContext);
  const [UpdatedCountry, setUpdatedCountry] = useState("");
  const [IsStatus200, setIsStatus200] = useState(false);

  useEffect(() => {
    if (userdata?.country && UpdatedCountry === "") {
      setUpdatedCountry(userdata.country);
    }
  }, [userdata?.country]);
  const schema: { [key: string]: any } = {
    name: yup.object().shape({
      name: yup.string().min(6).max(20).required("insert a name"),
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
          /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "password must contain at least 1 number and 1 character"
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

  const methods = useForm({ resolver: yupResolver(schema[detail]) });
  const {
    getValues,

    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = methods;
  const { [detail]: detailvalue } = getValues();

  useEffect(() => {
    if (!IsStatus200) return;
    const timer = setTimeout(() => {
      setIsStatus200(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [IsStatus200]);

  const update = async () => {
    const { data: res } = await fn({
      variables: {
        _id: userId,
        [detail]: detail === "country" ? UpdatedCountry : detailvalue,
      },
    });

    if (detail === "email") {
      if (res?.updateEmail?.status === 200) {
        setIsStatus200(true);
      } else {
        toast.error(res?.updateEmail.msg);
        setIsStatus200(false);
      }
    }

    if (detail === "phone") {
      if (res?.updateUserPhone?.status === 200) {
        setIsStatus200(true);
      } else {
        toast.error(res?.updateUserPhone.msg);
        setIsStatus200(false);
      }
    }

    if (detail === "name") {
      if (res?.updateUserName?.status === 200) {
        setIsStatus200(true);
      } else {
        toast.error(res?.updateUserName.msg);
        setIsStatus200(false);
      }
    }

    if (detail === "country") {
      if (res?.updateUserCountry?.status === 200) {
        setIsStatus200(true);
      } else {
        toast.error(res?.updateUserCountry.msg);
        setIsStatus200(false);
      }
    }

    setUpdateUserData((cur: userDataInterface) => ({
      ...cur,
      [detail]: detailvalue,
      country: UpdatedCountry,
    }));
  };
  const OnSubmit = async (data: FieldValues) => {
    console.log(data);
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
                IsStatus200={IsStatus200}
                head={`update your ${detail}`}
              >
                {detail !== "country" && (
                  <>
                    <>{console.log({ detail })}</>
                    <Input
                      type={detail === "phone" ? "number" : "text"}
                      placeholder={placeholder || detail}
                      defaultVal={value}
                      err={(errors as { [key: string]: any })[
                        detail
                      ]?.message?.toString()}
                    />
                  </>
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
