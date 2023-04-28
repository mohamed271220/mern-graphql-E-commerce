import React, { useContext } from "react";
import Title from "../widgets/Title";
import { RiEditLine } from "react-icons/ri";
import DashMain from "./DashMain";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import Input from "../widgets/Input";
import { productListContext } from "../../context/FilterData";
import Products from "../Product/Products/Products";
import { useParams } from "react-router-dom";
import { GET_Product_By_Id } from "../../graphql/general";
import { useMutation, useQuery } from "@apollo/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import { motion } from "framer-motion";
import InpErr from "../widgets/InpErr";
import { update_Product } from "../../graphql/mutations/product";
import { toast } from "react-hot-toast";
const UpdateProduct = () => {
  const { id } = useParams();

  const schema = yup.object().shape({
    state: yup.string().min(3).max(10).required(),
    category: yup.string().min(3).max(10).required(),
    title: yup.string().min(12).max(30).required(),
    stock: yup.number().min(1).max(100).required(),
    price: yup.number().min(1).max(1000).required(),
    description: yup.string().trim().min(50).required(),
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isValid },
  } = methods;
  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  const [updateProductFn] = useMutation(update_Product);
  if (data?.product) {
    const { title, description, stock, category, state, price } = data.product;
    const inpArr = [
      { type: "text", placeholder: "title", value: title },
      { type: "text", placeholder: "category", value: category },
      { type: "number", placeholder: "stock", value: stock },
      { type: "text", placeholder: "state", value: state },
      { type: "number", placeholder: "price", value: price },
    ];

    const formData = getValues();
    console.log(formData);
    const onSubmit = async (data: FieldValues) => {
      console.log(data);
      const obj = { ...formData, _id: id };
      console.log(obj);
      const { data: res } = await updateProductFn({
        variables: { ...formData, _id: id, stock: Number(stock) },
      });
      toast.success(res.updateProduct.msg);
    };
    return (
      <DashMain head="">
        <FormProvider {...methods}>
          <form
            className="update-product-form center  col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="underline header " style={{ color: "var(--white)" }}>
              update product
            </h2>
            {inpArr.map(({ placeholder, value, type }, i) => {
              return (
                <>
                  <Input
                    key={i}
                    placeholder={placeholder}
                    defaultVal={value}
                    type={type}
                    err={
                      (errors as { [key: string]: any })[placeholder]?.message
                    }
                  />
                </>
              );
            })}
            <div className="inp-parent">
              <InpErr
                key={"description"}
                err={errors.description?.message?.toString()}
              />
              <textarea
                {...register("description")}
                className="update-product  inp relative"
                name=""
                id=""
                defaultValue={description}
              />
            </div>

            <button className="main btn">update</button>
          </form>
        </FormProvider>
      </DashMain>
    );
  } else {
    return <></>;
  }
};

export default UpdateProduct;
