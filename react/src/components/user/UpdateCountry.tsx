import React from "react";
import SlideButton from "../widgets/SlideButton";
import { useMutation } from "@apollo/client";
import { Update_Country } from "../../graphql/mutations/user";
import SelectCOuntry from "./SelectCOuntry";
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
