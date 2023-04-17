import React from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import Product from "./components/Product/Product";
import AppRoutes from "./components/routes";
import IsAuthContextComponent from "./context/isAuth";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <IsAuthContextComponent>
      <BrowserRouter>
        <div className="App">
          {/* <Loading /> */}
          <Nav />
          <Product />
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
    </IsAuthContextComponent>
  );
};

export default App;
