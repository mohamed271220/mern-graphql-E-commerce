import React, { useState } from "react";
import OrderDropDown from "../Order/DashDropDown";
import FadeElement from "../../widgets/FadeElement";
import { AnimatePresence } from "framer-motion";
import DashDropDown from "../Order/DashDropDown";

interface Props {
  role: string;
  _id: string;
  name: string;
  email: string;
  index: number;
  createdAt: string;
  lastLogIn: string;
}
const UserMobile = ({
  role,
  _id,
  lastLogIn,
  name,
  email,

  index,
  createdAt,
}: Props) => {
  const [updateRole, setUpdateRole] = useState(role);

  return (
    <div
      className="order-mobile box-shadow center gap col start"
      style={{ padding: 20 }}
    >
      <div className="center between w-100">
        {/* <span style={{ fontWeight: "bold" }} className="mobile-order-id">
          user
          <span style={{ fontWeight: "normal" }}> #{_id}</span>
        </span> */}
        <span style={{ fontWeight: "bold" }}>
          <span>Name : </span>
          {name}
        </span>
        <div className="order-state-par center gap`">
          <AnimatePresence mode="wait">
            <FadeElement cls="" key={role}>
              <span
                style={{ background: `var(--${role.split(" ").slice(-1)})` }}
                className="order-state center gap"
              >
                {role}
              </span>
            </FadeElement>
          </AnimatePresence>
          <DashDropDown
            _id={_id}
            setter={setUpdateRole}
            state={updateRole}
            arr={["user", "admin", "owner", "moderator"]}
            type="user"
          />
        </div>
      </div>
      {/* <span className="date">
        <span className="order-date">name : </span>
        {name}
      </span> */}

      <span className="date">
        <span className="order-date" style={{ margin: 0 }}>
          email :{" "}
        </span>
        {email}
      </span>
      <span className="date">
        <span className="order-date" style={{ margin: 0 }}>
          created at :{" "}
        </span>
        &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </span>
      <span className="date " style={{ display: "flex" }}>
        <span className="order-date" style={{ margin: 0 }}>
          last login :{" "}
        </span>
        <AnimatePresence mode="wait">
          <FadeElement cls="" key={lastLogIn}>
            &#160;{" "}
            {lastLogIn
              ? `${new Date(lastLogIn).toLocaleDateString()} -
        ${new Date(lastLogIn).toLocaleTimeString()}`
              : "_"}
          </FadeElement>
        </AnimatePresence>
      </span>
      {/* <StyledPrice price={cost} /> */}
    </div>
  );
};

export default UserMobile;
