import React, { useContext } from "react";
import Detail from "./Detail";
import { isAuthContext } from "../../context/isAuth";
const UserInfo = () => {
  const { name, email } = useContext(isAuthContext);
  const userArr = [
    { detail: "username", value: name },
    { detail: "email", value: email },
    { detail: "password", value: "****************" },
    { detail: "phone", value: "no phone numbers added" },
    { detail: "country", value: "no Country added" },
  ];
  return (
    <div>
      <h2 className="underline header user-head">User Info</h2>

      {userArr.map(({ detail, value }, i) => {
        return (
          <>
            <Detail key={detail} detail={detail} value={value}></Detail>
            <div className="hr"></div>
          </>
        );
      })}
    </div>
  );
};

export default UserInfo;
