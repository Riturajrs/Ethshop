import React from "react";
import { useParams } from "react-router-dom";
import Data from "../DUMMY_DATA";
import "./itemPage.css"

const Page = (props) => {
  const uid = useParams().uid;
  const place = Data.find((item) => {
    return item.id === uid});
  return (
    <div className="page">
      <img src={place.img} alt={place.name} />
      {place.name}
      <br />
      <fieldset className="desc"> Description:<br/>{place.desc}</fieldset>
    </div>
  );
};

export default Page;
