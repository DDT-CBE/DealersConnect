import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import "./buyerpage.css"; // Import your CSS file

const Buyerpage = () => {
    const [buyerdata, setBuyerData] = useState([]);
    const [activeBuyerId, setActiveBuyerId] = useState(null); // State to track which buyer's "More" section is open

    const getbuyerdata = () => {
        axios.get("http://localhost:8000/getbuyerdata")
            .then(res => {
                console.log(res.data);
                setBuyerData(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getbuyerdata();
    }, []);

    const toggleBtnMore = (buyerId) => {
        // Toggle the activeBuyerId; if the same ID is clicked again, close it
        setActiveBuyerId(activeBuyerId === buyerId ? null : buyerId);
    };

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
                                <a className="nav-link" href="/form/buyer">Form</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login/buyer">Login</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <h1 className="buyer-title">Buyers</h1>
            <div className="buyer-container">
                {buyerdata.map((data) => (
                    <div className="buyer-card" key={data._id}>
                        <div className="buyer-id">ID: {data._id}</div>
                        <div className="buyer-name">Name: {data.name}</div>
                        <div className="buyer-name">Title: {data.title}</div>
                        <button className='more' onClick={() => toggleBtnMore(data._id)}>
                            {activeBuyerId === data._id ? 'Less' : 'More'}
                        </button>

                        {/* Conditionally show more details if this buyer's ID matches the activeBuyerId */}
                        {activeBuyerId === data._id && (
                            <div className="more-details">
                                <div className="buyer-name">Description: {data.description}</div>
                                <div className="buyer-name">Industry: {data.industry}</div>
                                <div className="buyer-name">Category: {data.category}</div>
                                <div className="buyer-name">Investment Minimum: {data.investmentrange.min}</div>
                                <div className="buyer-name">Investment Maximum: {data.investmentrange.max}</div>

                                <div className="buyer-name">
                                    Role: {data.role.dealer && data.role.franchise 
                                        ? "Both Dealer & Franchise" 
                                        : data.role.franchise 
                                            ? "Franchise" 
                                            : data.role.dealer 
                                                ? "Dealer" 
                                                : "No Dealer"}
                                </div>

                                <div className="buyer-phone">
                                    Phone: {data.numberhide ? "You need to pay" : data.phone}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Fragment>
    );
}

export default Buyerpage;
