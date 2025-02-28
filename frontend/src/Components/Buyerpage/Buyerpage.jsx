import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "./buyerpage.css"; // Import your CSS file
import Nav2 from "../Nav2/Nav2";
import { useSearchParams, Link } from "react-router-dom";
import Search from "../Search/Search";
import UserCard from "../UserCard";

const url = process.env.REACT_APP_API_URL;

const Buyerpage = () => {
  const [buyerdata, setBuyerData] = useState([]);

  const [searchparams] = useSearchParams();
  const [err, setErr] = useState(null); // To store error messages
  const [loading, setLoading] = useState(true);
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
    getUserData();
  }, [searchparams]);

  if (loading) {
    return <div className="loader"></div>; // Show loading indicator while data is being fetched
  }

  return (
    <Fragment>
      <Nav2 />

      {/* <div className="relative w-full p-4">
          <button
            className="absolute top-20 right-4 sm:right-6 md:right-10 lg:right-14 
                bg-yellow-400 text-blue-900 font-semibold py-2 px-4 
                rounded-lg shadow-md 
                hover:bg-yellow-500 hover:shadow-lg transition-all duration-300"
          >
            <Link
              to={isLogged ? "/form/buyer" : "/login"}
              style={{ color: "#03045e", textDecoration: "none" }}
            >
              Register
            </Link>
          </button>
        </div> */}

      <Search />
      {/* <h1 className="text-xl sm:text-sm md:text-4xl lg:text-5xl font-bold text-center text-gray-800 relative uppercase tracking-wide">
        Business Seeker
        <span className="block w-24 h-1 bg-yellow-500 mx-auto mt-2 rounded"></span>
      </h1> */}

      {err ? (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          <h2>{err}</h2>
        </div>
      ) : (
        <UserCard data={buyerdata} />
      )}
    </Fragment>
  );
};

export default Buyerpage;
