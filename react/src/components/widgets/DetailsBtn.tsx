import React from "react";
import { useNavigate } from "react-router-dom";
import OpacityBtn from "./OpacityBtn";
import { motion } from "framer-motion";
interface Props {
  cls: string;
  _id: string;
  btn: string;
  Icon?: React.ComponentType;
  title?: string;
}

const DetailsBtn = ({ cls, _id, btn, Icon, title }: Props) => {
  const navigate = useNavigate();
  const handleDetailsFn = () => {
    navigate(`/${_id}`);
  };

  return (
    <OpacityBtn
      Icon={Icon}
      title={title}
      cls={cls}
      fn={handleDetailsFn}
      btn={btn}
    />
  );
};

export default DetailsBtn;
