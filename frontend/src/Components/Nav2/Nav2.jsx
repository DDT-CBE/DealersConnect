import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import hamburger from "../Assets/icons8-hamburger-menu-100.png";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

const DB_URL = process.env.REACT_APP_API_URL;

const Nav2 = () => {
  const [menu, setMenu] = useState(false);
  const [authUser, setAuthUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [isLogged, setIsLogged] = useState(false);

  // Use the location hook to get the current route
  const location = useLocation();

  const menutoggle = () => {
    setMenu(!menu);
  };

  // Determine whether the current page is buyer or seller based on the URL path
  const isBuyerPage = location.pathname.includes("buyerpage");
  const isSellerPage = location.pathname.includes("sellerpage");
  // const isFranchisePage = location.pathname.includes("franchise");
  const isBuyerFormPage = location.pathname.includes("form/buyer");
  const isSellerFormPage = location.pathname.includes("form/seller"); // Fixed typo
  const isDashboard = location.pathname.includes("/dashboard"); // Fixed typo

  // Fetch user data
  const getUserData = () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      setIsLogged(false);
      setLoading(false); // Stop loading when no token is found
    } else {
      setIsLogged(true);

      axios
        .get(`${DB_URL}auth/data`, {
          headers: {
            Authorization: `${token}`, // Add the token to the Authorization header
          },
        })
        .then((res) => {
          setAuthUser(res.data);
          setLoading(false); // Data fetched, stop loading
          console.log("User data:", res.data);
        })
        .catch((err) => {
          console.log("Error fetching user data: " + err.message);
          setLoading(false); // Stop loading even on error
          if (err.response && err.response.status === 401) {
            // If token is invalid or expired, handle accordingly
            localStorage.removeItem("token"); // Clear invalid token
          }
        });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loader while user data is being fetched
  }

  const handleLinkClick = () => {
    setMenu(false); // Close the menu when a link is clicked
  };



  return (
    <Fragment>
      <nav className="navcontainer">
        <img
          className="hamburger"
          src={hamburger}
          alt="menu"
          onClick={menutoggle}
        />
        <h1>Dealers Connect</h1>

        {!isDashboard && (
          <ul className={menu ? "reset" : "navcontent"}>
            {isLogged && <li>Welcome {authUser?.name}</li>}

            <li>
              <Link
                to={"/"}
                style={{ color: "#03045e", textDecoration: "none" }}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                style={{ color: "#03045e", textDecoration: "none" }}
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
            </li>

            {/* Conditionally render the form link based on the page */}
            {isLogged && (
              <li>
                {isBuyerPage || isBuyerFormPage ? (
                  <Link
                    to={"/form/buyer"}
                    style={{ color: "#03045e", textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    Register
                  </Link>
                ) : isSellerPage || isSellerFormPage ? (
                  <Link
                    to={"/form/seller"}
                    style={{ color: "#03045e", textDecoration: "none" }}
                    onClick={handleLinkClick}
                  >
                    Register
                  </Link>
                ) : null}
              </li>
            )}
          </ul>
        )}

       
        
      </nav>
    </Fragment>
  );
};

export default Nav2;
