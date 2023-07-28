import React from "react";
import { Grid } from "react-loader-spinner";

interface Props {
  cls: string;
}
const GridLoader = ({ cls }: Props) => {
  return (
    <div className={`grid-loading center text ${cls}`}>
      <Grid
        height="25"
        width="25"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default GridLoader;
