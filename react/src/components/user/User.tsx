import React, { useContext } from "react";
import UserDetails from "./UserDetails";
import UserImage from "./UserImage";
import { Navigate } from "react-router-dom";
import { isAuthContext } from "../../context/isAuth";

const User = () => {
  const { isAuth } = useContext(isAuthContext);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="user-page">
      <UserImage />
      <UserDetails />
    </div>
  );
};

export default User;
