import React, { useContext } from "react";
import { isAuthContext } from "../context/isAuth";

interface Props {
  dimension: number;
}
const ProfileImg = ({ dimension }: Props) => {
  const { profile, name = "guest" } = useContext(isAuthContext);

  return (
    <>
      <img
        src={
          profile ||
          "https://res.cloudinary.com/domobky11/image/upload/v1682383659/download_d2onbx.png"
        }
        alt={`${name} proile`}
        style={{
          height: dimension,
          width: dimension,
          borderRadius: "50%",
          border: "0.5px grey solid",
        }}
      />
    </>
  );
};

export default ProfileImg;
