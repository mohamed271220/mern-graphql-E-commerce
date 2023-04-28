import React from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes";
import IsAuthContextComponent from "./context/isAuth";
import { Toaster } from "react-hot-toast";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import Transition from "./components/widgets/Transition";
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
