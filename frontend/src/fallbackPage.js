import React from "react";
import "./fallbackPage.css";

const fallback = (props) => {
  return (
    <div className="maintext">
      <div className="content">
        Seems your browser does not have a crypto wallet
        <br />
        Please install a wallet or open site in a crypto wallet containing
        browser
        <br />
        <hr />
        <a href="https://metamask.io/" target="_blank">
          <button>Download Metamask</button>
        </a>
      </div>
    </div>
  );
};

export default fallback;
