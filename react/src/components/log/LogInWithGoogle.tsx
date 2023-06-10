import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { isAuthContext } from "../../context/isAuth";

const LogInWithGoogle = ({ type }: { type?: string }) => {
  return (
    <div
      className="inp-parent center google-log between"
      style={{ background: "var(--main)" }}
      onClick={() => {
        if (type === "sign") {
          window.open("http://localhost:3000/auth/signup/google", "_self");
        } else {
          window.open(
            // `http://localhost:3000/auth/login/google?location=`,
            `http://localhost:3000/auth/login/google`,
            "_self"
          );
        }
      }}
    >
      <FcGoogle fontSize={18} />
      <span>continue with google</span>
    </div>
  );
};

export default LogInWithGoogle;
