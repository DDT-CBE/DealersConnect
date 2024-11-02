import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const apiurl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useParams();

  const isBuyerLogin = location.pathname.includes("login/buyer");
  const isFranchiseLogin = location.pathname.includes("/login/franchise");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure a valid role type is selected
    if (!type) {
      toast.error("Please select a role type.");
      return;
    }

    const userData = {
      email,
      password,
      role, // role comes from useParams
      type, // type comes from the dropdown
    };

    axios
      .post(`${apiurl}login`, userData)
      .then((result) => {
        // Login success
        console.log(result.data);
        if (result.status === 201) {
          toast.success("Login successful!");
          localStorage.setItem("token", result.data.token); // Store the token only
          // Navigate based on the role after successful login
          navigate(
            type === "Business Provider"
              ? "/sellerpage"
              : type === "Business Seeker"
              ? "/buyerpage"
              : "/franchisepage"
          );

          // Reset input fields after successful login
          setEmail("");
          setPassword("");
          setType("");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        // Handle errors
        toast.error("Your email and password is incorrect");
        console.error("Login error:", err);
      });
  };

  return (
    <Fragment>
      <div className="signup-container">
        <form className="signup-box" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="type">Role Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option disabled value="">Select Role type</option>
              <option value="Company 2">Company 2</option>
              <option value="District Franchise">District Franchise</option>
              <option value="Dealer">Dealer</option>
              <option value="Sub Dealer">Sub Dealer</option>
              <option value="Business Provider">Business Provider</option>
              <option value="Business Seeker">Business Seeker</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          <button className="submit-button" type="submit">
            Login
          </button>

          <h3 className="txt">
          
          
            <Link to={"/signup"}>  Don't have an account?  Click to Signup</Link>   
            
          </h3>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
