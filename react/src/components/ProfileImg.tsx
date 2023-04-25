import React, { useContext } from "react";
import { isAuthContext } from "../context/isAuth";

interface Props {
  dimension: number;
}
const ProfileImg = ({ dimension }: Props) => {
  const { profile, name } = useContext(isAuthContext);

  return (
    <>
      <img
        src={profile}
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
