import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const BeardCrumbs = () => {
  const location = useLocation();
  let to = ``;

  const crumbs = location.pathname
    .split("/")
    .filter((path) => path != "")
    .map((crumb, i, arr) => {
      to += `/${crumb}`;
      return (
        <div className="center gap" key={crumb}>
          <NavLink className={"crumb-link"} to={to}>
            {crumb}
          </NavLink>
          {i !== arr.length - 1 && (
            <FaGreaterThan
              fontSize={".8rem"}
              color="var(--wheat-light)"
              className="crumb-icon"
            />
          )}
        </div>
      );
    });

  return (
    <div className="crumbs ">
      <NavLink className={"crumb-link"} to={"/"}>
        Home
      </NavLink>
      <div className="crumbs-line"></div>
      {crumbs}
    </div>
  );
};

export default BeardCrumbs;
