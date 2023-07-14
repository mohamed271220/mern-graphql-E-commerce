import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import CountUpAnimation from "../../widgets/CountUpAnimation";
interface Props {
  head: string;
  percentage: number;
  analytics: string;
  to: string;
  link: string;
  Icon: React.ComponentType;
}
const DashBoardRecap = ({
  Icon,
  percentage,
  head,
  analytics,
  to,
  link,
}: Props) => {
  return (
    <div className="recap">
      <div className=" center between">
        <span
          className={`center gap ${
            percentage >= 0 ? "percent-pos" : "percent-negative"
          }`}
        >
          {percentage >= 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
          {percentage}%
        </span>
      </div>
      <div className="analytics center col">
        <span>
          {head === "earnings" ? "$ " : ""}
          <CountUpAnimation num={Number(analytics)} tofixed={0} />{" "}
        </span>
        <h3 className=" head-recap header center ">{head}</h3>
      </div>
      <div className="links-recap center between">
        <Link to={to}> {link}</Link>
        <Icon />
      </div>
    </div>
  );
};

export default DashBoardRecap;
