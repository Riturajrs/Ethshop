import React from "react";
import {Button, Fade} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fallbackPage.css";

const fallback = (props) => {
  return (
      <Fade in={true}>
    <div className="maintext">
      <div className="content">
        Seems your browser does not have a crypto wallet
        <br />
        Please install a wallet or open site in a crypto wallet containing
        browser
        <br />
        <hr />
        <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">
          <Button color="primary">Download Metamask</Button>
        </a>
      </div>
    </div>
    </Fade>
  );
};

export default fallback;
