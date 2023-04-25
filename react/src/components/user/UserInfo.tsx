import React, { useState, useContext } from "react";
import Detail from "./Detail";
import { isAuthContext } from "../../context/isAuth";
import { useMutation } from "@apollo/client";
import { Update_user_name } from "../../graphql/mutations/user.js";
const UserInfo = () => {
  const { name, email, userId } = useContext(isAuthContext);
  const [updateName, setUpdateName] = useState(false);
  const [updateNameFn] = useMutation(Update_user_name);

  const userArr = [
    {
      detail: "name",
      value: name,
      setter: setUpdateName,
      fn: updateNameFn,
      bool: updateName,
    },
    // { detail: "email", value: email },
    // { detail: "password", value: "****************" },
    // { detail: "phone", value: "no phone numbers added" },
    // { detail: "country", value: "no Country added" },
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
          </>
        );
      })}
    </div>
  );
};

export default UserInfo;
