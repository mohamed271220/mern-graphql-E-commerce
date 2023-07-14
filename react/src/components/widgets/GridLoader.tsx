import React from "react";
import { Grid } from "react-loader-spinner";

const GridLoader = () => {
  return (
    <div className="loading center text">
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
