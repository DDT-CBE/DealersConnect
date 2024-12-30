import React, { Fragment, useState } from "react";
import axios from "axios";
import "./signup.css"; // Import the CSS file
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
const apiurl = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [id, setId] = useState("");
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login

  const navigate = useNavigate();
  // const location = useLocation();

  // const isBuyerPage = location.pathname.includes("buyerpage");
  // const isFranchiseSignUp = location.pathname.includes("/signup/franchise");
  // const isBuyerLogin = location.pathname.includes("login/buyer");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      phone,
      email,
      password,
      type,
      id,
    };

    axios
      .post(`${apiurl}auth/signup`, userData)
      .then((result) => {
        // Signup success
        toast.success("Signup successful! Please log in.");
        console.log(result.data);

        // Optionally, navigate to the login page after signup
        navigate("/login");

        // Reset input fields
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        // Handle errors - display an error message
        if (isSignup && err.response?.status === 400) {
          // Email already exists
          toast.error(err.response.data.message);
          console.error(err);
        }
      });
  };

  return (
    <Fragment>
      <div className="signup-container">
        <h1 className="signup-heading">
          {isSignup ? `Create a  Account` : "Login"}
        </h1>

        <form className="signup-box" onSubmit={handleSubmit}>
          {/* Show Name and Phone fields only if the user is signing up */}
          {isSignup && (
            <>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required={isSignup}
                />
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
                <label htmlFor="type">Role Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Select Role type
                  </option>

                  <option value="Company 2">Company 2</option>
                  <option value="District Franchise">District Franchise</option>
                  <option value="Dealer">Dealer</option>
                  <option value="Sub Dealer">Sub Dealer</option>
                  <option value="Business Provider">Business Provider</option>
                  <option value="Business Seeker">Business Seeker</option>
                </select>
              </div>
            </>
          )}
          {type === "District Franchise" && (
            <div className="input-group">
              <label>Company 2's ID</label>
              <input
                name="Company 2 id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text" // Change to 'tel' for better validation
                required={isSignup}
              />
            </div>
          )}

          {type === "Dealer" && (
            <div className="input-group">
              <label>District Franchise's ID</label>
              <input
                name="District Franchise's Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text" // Change to 'tel' for better validation
                required={isSignup}
              />
            </div>
          )}

          {type === "Sub Dealer" && (
            <div className="input-group">
              <label>Dealers 's ID</label>
              <input
                name="District Franchise's Id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text" // Change to 'tel' for better validation
                required={isSignup}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel" // Change to 'tel' for better validation
              required={isSignup}
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
            Sign Up
          </button>

          {/* Toggle between signup and login */}
          <h3 className="txt">
            <Link to={"/login"}>Already have an account? Click to Login</Link>
          </h3>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
