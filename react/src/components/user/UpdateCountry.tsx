import React from "react";
import SelectCOuntry from "./SelectCOuntry";
import { userDataInterface } from "./UserInfo";
interface Props {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
}
const UpdateCountry = ({ country, setCountry }: Props) => {
  return (
    <>
      <SelectCOuntry country={country} setCountry={setCountry} bottom={true} />
    </>
  );
};

export default UpdateCountry;
