import React from "react";
import { FcGoogle } from "react-icons/fc";
import { logInWithGoogle, signUpWithGoogle } from "../../assets/routes.js";

const LogInWithGoogle = ({ type }: { type?: string }) => {
  return (
    <div
      className="inp-parent center google-log between"
      style={{ background: "var(--main)" }}
      onClick={() => {
        if (type === "sign") {
          window.open(signUpWithGoogle, "_self");
        } else {
          window.open(logInWithGoogle, "_self");
        }
      }}
    >
      <FcGoogle fontSize={18} />
      <span>continue with google</span>
    </div>
  );
};

export default LogInWithGoogle;
