import React from "react";
import DashForm from "./DashForm";
import { Outlet, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_Product_By_Id } from "../../graphql/general";
import { update_Product } from "../../graphql/mutations/product";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const DashUpdateProduct = () => {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  const [updateProductFn] = useMutation(update_Product);

  if (data?.product) {
    return (
      <>
        <DashForm
          btn="update"
          head="update product"
          id={id}
          type="update"
          obj={data.product}
          fn={updateProductFn}
          Icon={FaEdit}
        />
        <Outlet />
      </>
    );
  } else return <></>;
};

export default DashUpdateProduct;
