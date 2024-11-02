import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const {role } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    try {
      axios.post("http://localhost:8000/login", { email, password })
        .then(result => {
          console.log(result);
          if (result.data === "Allow") {
            navigate(`/${role}page`); // Navigate to the home page on successful login
          } 
        })
        .catch(err => {
          setError("Login failed. Please try again.");
          console.error(err);
        });
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="body-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">{role === "buyer" ? "Buyer" : "Seller"} Login</h1>

          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}

          <label className="login-label" htmlFor="email">Email</label>
          <input
            className="login-input"
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="password">Password</label>
          <input
            className="login-input"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">Login</button>

          <h3>Don't have an account? Register below</h3>
          <Link to={`/signup/${role}`}>
            <button className="login-button" type="button">Register</button>
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
