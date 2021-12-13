import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import reportWebVitals from "./reportWebVitals";


  ReactDOM.render(
    <React.StrictMode>
      <MoralisProvider appId="BCQ5VuYNewPt64Su6kaiIQb9AaWx6INveywXm9DX" serverUrl="https://flek8gwue4ed.usemoralis.com:2053/server">
      <App />
      </MoralisProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );

reportWebVitals();
