import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import reportWebVitals from "./reportWebVitals";


  ReactDOM.render(
    <React.StrictMode>
      <MoralisProvider appId="kpeO47tA8Ju1ioLczdsdSPIbsTZO7cBDejGqBYPu" serverUrl="https://kij7aoo5lfx9.usemoralis.com:2053/server">
      <App />
      </MoralisProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );

reportWebVitals();
