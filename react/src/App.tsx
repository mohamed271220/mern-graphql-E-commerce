import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Nav from "./components/Nav";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./components/routes";
import IsAuthContextComponent from "./context/isAuth";
import { Toaster, toast } from "react-hot-toast";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import useMeasure from "react-use-measure";

const App = () => {
  return (
    <IsAuthContextComponent>
      <GridViewContext>
        <FilterDataContext>
          <BrowserRouter>
            <div className="App">
              {/* <Loading /> */}

              <Nav />
              <AppRoutes />
            </div>

            <Toaster
              position="bottom-left"
              reverseOrder={false}
              containerClassName=""
              toastOptions={{
                style: {
                  background: "black",
                  color: "white",
                  width: "240px",
                  whiteSpace: "nowrap",
                },
              }}
            />
          </BrowserRouter>
        </FilterDataContext>
      </GridViewContext>
    </IsAuthContextComponent>
  );
};

export default App;
