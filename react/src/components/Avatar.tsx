import React, { useEffect, useRef, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import AvatarEditor from "react-avatar-editor";
import { isAuthContext } from "../context/isAuth";
import OpacityBtn from "./widgets/OpacityBtn";
interface Props {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setnewImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  newImg: File | undefined;
  handleCancel: () => void;
}
const Avatar = ({ setEdit, newImg, handleCancel }: Props) => {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const editorRef = useRef<AvatarEditor | null>(null);
  const { setProfile } = useContext(isAuthContext);

  interface positionInterface {
    x: number;
    y: number;
  }
  const handlePositionChange = (position: positionInterface) => {
    setPosition(position);
  };

  const { userId } = useContext(isAuthContext);
  const uploadFn = async (dataa: any) => {
    const data = await axios.patch(
      `http://localhost:3000/upload/${userId}`,
      dataa
    );
    console.log(data);
  };

  async function handleSaveButtonClick() {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      setEdit(false);
      setProfile(croppedImage as string);

      const formData = new FormData();

      if (croppedImage) {
        const blob = await fetch(croppedImage).then((res) => res.blob());
        formData.append(
          "image",
          new File(
            [blob],
            `cropped Image-${Date.now()}-${Math.random().toString(16)}`
          )
        );
        uploadFn(formData);
      }
    }
  }

  const [scale, setScale] = useState(0);
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };

  return (
    <>
      <h3 className="underline header">update your profile image</h3>
      <AvatarEditor
        style={{ backgroundColor: "white", border: "0" }}
        ref={editorRef}
        image={newImg ? URL.createObjectURL(newImg as any) : ""}
        width={250}
        height={250}
        border={5}
        borderRadius={125}
        position={position}
        onPositionChange={handlePositionChange}
        scale={1 + scale}
      />
      <div className="zoom-cont col center start w-100">
        <label htmlFor="zoom" className="zoom">
          {" "}
          zoom
        </label>
        <input
          type="range"
          id="zoom"
          onChange={handleScaleChange}
          min="0"
          max="1"
          step=".01"
          defaultValue={0.01}
          className="w-100"
        />
      </div>
      <div className=" center gap " style={{ gap: 30, marginTop: 6 }}>
        <OpacityBtn fn={handleSaveButtonClick} btn="Save" cls="btn main" />
        <OpacityBtn fn={handleCancel} btn="cancel" cls="btn details" />
      </div>
    </>
  );
};

export default Avatar;
