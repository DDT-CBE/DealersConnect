import React, { Fragment } from 'react';
import './home.css'; // Import your CSS file
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <Fragment >
          


      <div className='home'>
            <div className="home-container">
            <h1>Dealerspot</h1>
            <Link to={"/buyerpage"}><div>Buyer</div></Link>
            <Link to={"/sellerpage"}><div>Seller</div> </Link> 
             
             
            </div>
      </div>
     
    </Fragment>
  );
}

export default Home;
