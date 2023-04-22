import React from "react";
import OpacityBtn from "../widgets/OpacityBtn";
import { GrUpdate } from "react-icons/gr";
interface Props {
  value: string;
  detail: string;
}

const Detail = ({ detail, value }: Props) => {
  return (
    <div className="user-detail-par center">
      <span className="user-detail detail">{detail} :</span>
      <span className="user-value value">{value}</span>
      <OpacityBtn
        key={detail}
        btn="update"
        cls="btn update-user center gap"
        fn={() => {
          console.log("first");
        }}
        Icon={GrUpdate}
      />
    </div>
  );
};

export default Detail;
