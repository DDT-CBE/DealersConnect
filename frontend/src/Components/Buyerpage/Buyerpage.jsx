import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "./buyerpage.css"; // Import your CSS file
import Nav2 from "../Nav2/Nav2";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "../Search/Search";

const url = process.env.REACT_APP_API_URL;

const Buyerpage = () => {
  const [buyerdata, setBuyerData] = useState([]);
  const [activeBuyerId, setActiveBuyerId] = useState(null); // State to track which buyer's "More" section is open
  const [searchparams] = useSearchParams();
  const [err, setErr] = useState(null); // To store error messages
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getbuyerdata = () => {
    axios
      .get(`${url}api/getbuyerdata?` + searchparams.toString())
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No user found"); // Set the message if no users are found
        } else {
          setErr(null); // Clear error if data is found
          setBuyerData(res.data);
          setLoading(false); // Set loading false once data is fetched
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message || "An error occurred");
      });
  };

  useEffect(() => {
    getbuyerdata();
  }, [searchparams]);

  const toggleBtnMore = (buyerId) => {
    // Toggle the activeBuyerId; if the same ID is clicked again, close it
    setActiveBuyerId(activeBuyerId === buyerId ? null : buyerId);
  };

  if (loading) {
    return <div className="loader"></div>; // Show loading indicator while data is being fetched
  }

  return (
    <Fragment>
      <Nav2 />

      <h1 className="buyer-title">Business Seeker</h1>
      <Search />

      {err ? (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          <h2>{err}</h2>
        </div>
      ) : (
        <div className="buyer-container">
          {buyerdata.map((data) => (
            <div className="buyer-card" key={data._id}>
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
                        if (data.role.BusinessBuyOuts)
                          roles.push("  Business Buy Outs");
                        if (data.role.InvestPartners)
                          roles.push("InvestPartners");
                        if (data.role.SharePartners)
                          roles.push("SharePartners");
                        if (data.role.WorkingPartners)
                          roles.push("WorkingPartners");
                        if (data.role.ShareBuyers) roles.push("Share Buyers");
                        if (data.role.SeedFunders) roles.push("Seed Funders ");
                        if (data.role.VentureCapitals)
                          roles.push("Venture Capitals");

                        return roles.length > 0
                          ? roles.join(", ")
                          : "No Roles Selected";
                      })()}
                    </td>
                  </tr>
                  <tr>
                    <th>Investment</th>
                    <td>{data.investmentrange.min}</td>
                  </tr>
                </tbody>
              </table>

              <button
                className={activeBuyerId === data._id ? "morehide" : "more"}
                onClick={() => navigate(`/buyer/${data._id}`)}
              >
                More
              </button>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Buyerpage;
