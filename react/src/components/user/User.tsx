import React, { useState } from "react";
import UserDetails from "./UserDetails";
import UserImage from "./UserImage";

const User = () => {
  return (
    <div className="user-page">
      <UserImage />
      <UserDetails />
    </div>
  );
};

export default User;
