import React from "react";
import { useNavigate } from "react-router-dom";
import OpacityBtn from "./OpacityBtn";

interface Props {
  cls: string;
  _id: string;
  btn: string;
}

const DetailsBtn = ({ cls, _id, btn }: Props) => {
  const navigate = useNavigate();
  const handleDetailsFn = () => {
    navigate(`/${_id}`);
  };
  return <OpacityBtn cls={cls} fn={handleDetailsFn} btn={btn} />;
};

export default DetailsBtn;
