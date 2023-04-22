import React from "react";
import UserInfo from "./UserInfo";
import OrderHistory from "./OrderHistory";

const UserDetails = () => {
  return (
    <div className="user-details">
      <UserInfo />
      <OrderHistory />
    </div>
  );
};

export default UserDetails;
