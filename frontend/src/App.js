import React from "react";
import "./App.css";
import RenderItems from './Item/renderItems';
import Fallback from "./fallbackPage";

function App() {
  if(window.ethereum){
    return <React.Fragment>
    <RenderItems />
    </React.Fragment>;
  }
  else{
    return <Fallback/>;
  }
}

export default App;
