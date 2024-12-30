import React, { Fragment } from "react";
import "./find.css";
import { Link, useLocation } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";

const Findyourmatch = () => {
  const location = useLocation();

  // Conditional rendering based on the current route
  const getButtons = () => {
    switch (location.pathname) {
      case "/franchise":
        return [
          { label: "Franchise", link: "/buyerpage" },
          { label: "Franchisee", link: "/sellerpage" },
        ];
      case "/distributor":
        return [
          { label: "Distributor", link: "/distributor" },
          { label: "Retailer", link: "/retailer" },
          { label: "Agency", link: "/agency" },
          { label: "Stockist", link: "/stockist" },
          { label: "Wholesaler", link: "/wholesaler" },
        ];
      case "/buysell":
        return [
          { label: "Business Buy", link: "/buyerpage" },
          { label: "Business Sell", link: "/sellerpage" },
        ];
      case "/partners":
        return [
          { label: "Partners", link: "/buyerpage" },
          { label: "Affiliate", link: "/sellerpage" },
        ];
      case "/fundraising":
        return [
          { label: "Fundraising", link: "/buyerpage" },
          { label: "Investors", link: "/sellerpage" },
        ];
      default:
        return [
          { label: "Franchise", link: "/franchise" },
          { label: "Distributor", link: "/distributor" },
          { label: "Business Buy/Sell Outs", link: "/buysell" },
          { label: "Partners", link: "/partners" },
          { label: "Fund Raising", link: "/fundraising" },
        ];
    }
  };

  const buttons = getButtons();

  return (
    <Fragment>
      {location.pathname === "/franchise" ||
      location.pathname === "/distributor" ||
      location.pathname === "/buysell" ||
      location.pathname === "/partners" ||
      location.pathname === "/fundraising" ? (
        <Nav2 />
      ) : (
        ""
      )}

      <center>
        <h1 className="heading">Find Your Best Business Matchmaking !</h1>
      </center>
      <div className="findcontainer">
        <h1 className="title">For Registration & Search</h1>
        <div className="findbox">
          {buttons.map((button, index) => (
            <Link
              key={index}
              to={button.link}
              style={{ textDecoration: "none" }}
            >
              <div className="findbtn">{button.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Findyourmatch;
