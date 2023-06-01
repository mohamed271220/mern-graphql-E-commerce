import React, { useContext } from "react";
import { isAuthContext } from "../../context/isAuth";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
interface Props {
  dimension: number;
}
const ProfileImg = ({ dimension }: Props) => {
  const { profile, name = "guest" } = useContext(isAuthContext);

  return (
    <>
      <LazyLoadImage
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
        effect="blur"
      />
    </>
  );
};

export default ProfileImg;
