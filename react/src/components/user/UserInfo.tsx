import React, { useState, useContext } from "react";
import Detail from "./Detail";
import { isAuthContext } from "../../context/isAuth";
import { useMutation } from "@apollo/client";
import {
  Update_Country,
  Update_User_Email,
  Update_User_Phone,
  Update_user_name,
} from "../../graphql/mutations/user.js";
import Password from "./Password";

const UserInfo = () => {
  const { name, email, userId, country, phone } = useContext(isAuthContext);
  const [updateName, setUpdateName] = useState(false);
  const [updateCountry, setUpdateCountry] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePhone, setUpdatePhone] = useState(false);
  const [updateNameFn] = useMutation(Update_user_name);
  const [updatePhoneFn] = useMutation(Update_User_Phone);
  const [updateEmailFn] = useMutation(Update_User_Email);
  const [updateCountryFn] = useMutation(Update_Country);

  const userArr = [
    {
      detail: "name",
      value: name,
      setter: setUpdateName,
      fn: updateNameFn,
      bool: updateName,
    },

    {
      detail: "email",
      value: email,
      setter: setUpdateEmail,
      fn: updateEmailFn,
      bool: updateEmail,
    },
    {
      detail: "phone",
      value: phone || "No Phone Number is Added",
      setter: setUpdatePhone,
      fn: updatePhoneFn,
      bool: updatePhone,
    },
    {
      detail: "country",
      value: country,
      setter: setUpdateCountry,
      bool: updateCountry,
      fn: updateCountryFn,
    },
  ];
  return (
    <div>
      <h2 className="underline header user-head">User Info</h2>

      {userArr.map(({ detail, value, fn, setter, bool }, i) => {
        return (
          <>
            <Detail
              key={detail}
              detail={detail}
              value={value}
              setter={setter}
              fn={fn}
              bool={bool}
            />
            <div className="hr"></div>
            {detail === "email" && (
              <>
                <Password />
                <div className="hr"></div>
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default UserInfo;

//>npm i yup  @hookform/resolvers
