import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Nav2 from '../Nav2/Nav2';
import Search from '../Search/Search';
import { useSearchParams } from 'react-router-dom';


const url = process.env.REACT_APP_API_URL;

const Sellerpage = () => {
    const [sellerdata, setSellerData] = useState([]);
    const [activeSellerId, setActiveSellerId] = useState(null); // Track which seller's "More" section is open
    const [loading, setLoading] = useState(true);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages 

    const getsellerdata = () => {
        axios.get(`${url}getsellerdata?`+searchparams.toString())
            .then(res => {
                if (res.data.length === 0) {
                    setErr("No user found"); // Set the message if no users are found
                  } else {
                    setErr(null); // Clear error if data is found
                    setSellerData(res.data);
                    setLoading(false); // Set loading false once data is fetched
                    console.log(res.data);
                  }
            })
            .catch(err =>  { 
                console.log(err);
                setErr(err.response.data.message || "An error occurred")
              } ); 
                     
    }

    useEffect(() => {
        getsellerdata();
    }, [searchparams]);

    const toggleBtnMore = (id) => {
        setActiveSellerId(activeSellerId === id ? null : id);
    }

    if (loading) {
        return <div className='loader'></div>; // Show loading indicator while data is being fetched
      }
  

    return (
        <Fragment>
            <Nav2 />

            

            <h1 className="buyer-title">Business Provider</h1>

                <Search />

        {err ? (
                <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
                <h2>{err}</h2>
                </div>
        ):(
            <div className="buyer-container">
            {sellerdata.map((data, index) => (
                <div className="buyer-card" key={index}>
                    <table className="details-tables">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <td>{data.title}</td>
                        </tr>
                       
                        <tr>
                            <th>Industry</th>
                            <td>{data.industry}</td>
                        </tr>

                        <tr>
                            <th>Category</th>
                            <td>{data.category}</td>
                        </tr>
                       
                        <tr>
                        <th>Role Looking for</th>
                              <td>
                                {(() => {
                                  const roles = [];

                                  if (data.role.dealer) roles.push("Dealer");
                                  if (data.role.franchise) roles.push("Franchise");
                                  if (data.role.wholesaler) roles.push("Wholesaler");
                                  if (data.role.stockist) roles.push("Stockist");
                                  if (data.role.distributor) roles.push("Distributor");
                                  if (data.role.agency) roles.push("Agency");
                                  if (data.role.retailer) roles.push("Retailer");
                                  if (data.role.BusinessSellOuts) roles.push(" Business Sell Outs");
                                  if (data.role.InvestPartners) roles.push("Invest Partners");
                                  if (data.role.SharePartners) roles.push("Share Partners");
                                  if (data.role.WorkingPartners) roles.push("Working Partners");
                                  if (data.role.ShareSellers) roles.push("Share Sellers");
                                  if (data.role.SeedFunders ) roles.push("Seed Funders");
                                  if (data.role.VentureCapitals) roles.push("Venture Capitals");

                                  return roles.length > 0 ? roles.join(", ") : "No Roles Selected";
                                })()}
                              </td>
                        </tr>

                                <tr>
                                    <th>Investment</th>
                                    <td>{data.investmentminimum}</td>
                                </tr>
                                

                        
                    </tbody>
                </table>

                <button className={activeSellerId === data._id ? "morehide" : 'more'} onClick={() => toggleBtnMore(data._id)}>
                     More
                </button>

                {/* Conditionally show more details if this seller's ID matches the activeSellerId */}
                {activeSellerId === data._id && (
                   
                        <table className="details-table">
                            <tbody>
                                <tr>
                                    <th>Description</th>
                                    <td>{data.description}</td>
                                </tr>

                                <tr>
                                    <th>Investment Minimum</th>
                                    <td>{data.investmentminimum}</td>
                                </tr>

                                <tr>
                                    <th>Investment Maximum</th>
                                    <td>{data.investmentmaximum}</td>
                                </tr>
                                <tr>
                                    <th>Company Name</th>
                                    <td>{data.companyname}</td>
                                </tr>
                               
                                <tr>
                                    <th>Brand Name</th>
                                    <td>{data.brandname}</td>
                                </tr>
                               
                                <tr>
                                    <th>Product/Service</th>
                                    <td>{data.product}</td>
                                </tr>
                                <tr>
                                    <th>Revenue</th>
                                    <td>{data.revenue}</td>
                                </tr>
                                <tr>
                                    <th>Space Required</th>
                                    <td>{data.space}</td>
                                </tr>
                                <tr>
                                    <th>State</th>
                                    <td>{data.state}</td>
                                </tr>
                                <tr>
                                    <th>District</th>
                                    <td>{data.district}</td>
                                </tr>
                                <tr>
                                    <th>Royality</th>
                                    <td>{data.royality}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{data.address}</td>
                                </tr>
                               
                               
                              
                            </tbody>
                        </table>
                   
                )}
            </div>
        ))}
    </div>
      )}

           
        </Fragment>
    )
}

export default Sellerpage;
