import React, { useEffect } from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Nav from "./components/Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import { Toaster } from "react-hot-toast";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import ThemeContext from "./context/ThemContext";

const App = () => {
  return (
    <ThemeContext>
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
                    background: "var(--secondary)",
                    color: "var(--main)",
                    width: "240px",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </BrowserRouter>
          </FilterDataContext>
        </GridViewContext>
      </IsAuthContextComponent>
    </ThemeContext>
  );
};

export default App;
