import React from "react";
import DropDown from "./DropDown";

interface Props {
  bool: boolean;
}
const UserDropDown = ({ bool }: Props) => {
  return (
    <DropDown cls="user-drop" bool={bool}>
      <div>hello</div>
    </DropDown>
  );
};

export default UserDropDown;
