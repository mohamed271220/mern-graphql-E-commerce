import React, { useEffect } from "react";
import DashForm from "./DashForm";
import { Outlet, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_Product_By_Id } from "../../../graphql/general";
import { update_Product } from "../../../graphql/mutations/product";

const DashUpdateProduct = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  const [updateProductFn] = useMutation(update_Product);

  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboaed | update Product";
    }, 400);
  }, []);

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
          key="update-dash-form"
        />
        <Outlet />
      </>
    );
  } else return <></>;
};

export default DashUpdateProduct;
