import React, { Fragment } from "react";
import "./find.css";

import Nav2 from "../Nav2/Nav2";

const Findyourmatch = () => {


  return (
    <Fragment>
  
      <center>
        <h1 className="heading">Find Your Best Business Matchmaking !</h1>
      </center>
      <div className="findcontainer">
        <h1 className="title">For Registration & Search</h1>
        <div className="findbox">
        <a href="/buyerpage"> <div className="findbtn" > Business Provider</div></a>
        <a href="/sellerpage"> <div className="findbtn" > Business Seeker</div></a>
        </div>
      </div>
    </Fragment>
  );
};

export default Findyourmatch;
