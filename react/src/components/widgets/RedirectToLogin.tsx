import React, { useContext } from "react";
import { ChildrenInterFace } from "../../interfaces/general";
import { isAuthContext } from "../../context/isAuth";
import { Navigate } from "react-router-dom";

const RedirectToLogin = ({ children }: ChildrenInterFace) => {
  const { isAuth } = useContext(isAuthContext);

  return <>{isAuth ? children : <Navigate to={"/login"} />}</>;
};

export default RedirectToLogin;
