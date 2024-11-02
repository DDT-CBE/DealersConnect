import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios"

const Sellerpage = () => {


  const [sellerdata, setSellerData] = useState([]);

    const getbuyerdata = () => {
        axios.get("http://localhost:8000/getsellerdata")
            .then(res => {
                console.log(res.data);
                setSellerData(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getbuyerdata();
    }, []);
  return (
   <Fragment>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">DealerSpot</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/sellerform/seller">Form</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link" href="/login/seller"> Login </a>
                  </li>
                  
                   
                
                  {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li> */}
                  
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>



          <h1 className="buyer-title">Seller</h1>
            <div className="buyer-container">
                {sellerdata.map((data, index) => (
                    <div className="buyer-card" key={index}>
                        <div className="buyer-id">ID: {data._id}</div>
                        <div className="buyer-name">Name: {data.name}</div>
                        <div className="buyer-name">Title: {data.title}</div>
                        <div className="buyer-name">Description: {data.description}</div>
                        <div className="buyer-name">Companyname: {data.companyname}</div>
                        <div className="buyer-name">Brandname: {data.brandname}</div>
                        <div className="buyer-name">Category: {data.category}</div>
                        <div className="buyer-name">Industry: {data.industry}</div>
                        <div className="buyer-name">Product: {data.product}</div>
                        <div className="buyer-name">Services: {data.services}</div>
                        <div className="buyer-name">Space: {data.space}</div>
                        <div className="buyer-name">State: {data.state}</div>
                        <div className="buyer-name">District: {data.district}</div>
                        <div className="buyer-name">Investment Minimum: {data.investmentminimum}</div>
                        <div className="buyer-name">Investment Maximum: {data.investmentmaximum}</div>

                        <div className="buyer-name">
                            Role: {data.role.dealer && data.role.franchise 
                                ? "Both Dealer & Franchise" 
                                : data.role.franchise 
                                    ? "Franchise" 
                                    : data.role.dealer 
                                        ? "Dealer" 
                                        : "No Dealer"}
                        </div>

                        <div className="buyer-phone">Phone: {data.numberhide ? "You need to pay" : data.phone}</div>
                    </div>
                ))}
            </div>
   </Fragment>
  )
}

export default Sellerpage