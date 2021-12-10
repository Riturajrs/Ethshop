import React from "react";
import "./App.css";
import RenderItems from './Item/renderItems';

function App() {
  if(window.ethereum){
    console.log(true);
  }
  else{
    console.log(false);
  }
  return <React.Fragment>
    <RenderItems />
  </React.Fragment>;
}

export default App;
