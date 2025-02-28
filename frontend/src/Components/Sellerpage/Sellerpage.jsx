import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav2 from "../Nav2/Nav2";
import Search from "../Search/Search";
import { useSearchParams, useNavigate , Link } from "react-router-dom";
import SellerCard from "../SellerCard";


const url = process.env.REACT_APP_API_URL;

const Sellerpage = () => {
  const [sellerdata, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchparams] = useSearchParams();
  const [err, setErr] = useState(null); // To store error messages
    const [isLogged, setIsLogged] = useState(false);
  
      // Fetch user data
  const getUserData = () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      setIsLogged(false);
      setLoading(false); // Stop loading when no token is found
    } else {
      setIsLogged(true);

      axios
        .get(`${url}auth/data`, {
          headers: {
            Authorization: `${token}`, // Add the token to the Authorization header
          },
        })
        .then((res) => {
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

  

  const getsellerdata = () => {
    axios
      .get(`${url}api/getsellerdata?` + searchparams.toString())
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No user found"); // Set the message if no users are found
        } else {
          setErr(null); // Clear error if data is found
          setSellerData(res.data);
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
    getsellerdata();
    getUserData();
  }, [searchparams]);

 

  if (loading) {
    return <div className="loader"></div>; // Show loading indicator while data is being fetched
  }

  return (
    <Fragment>
      <Nav2 />

    

    

      <Search />
      {/* <h1 className="buyer-title">Business Provider</h1> */}
      {err ? (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          <h2>{err}</h2>
        </div>
      ) : (
        <SellerCard sellers={sellerdata} />
      )}
    </Fragment>
  );
};

export default Sellerpage;
