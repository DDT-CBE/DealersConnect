import React, { Fragment, useState } from 'react';
import axios from "axios";
import './signup.css';  // Import the CSS file
import { Link, useNavigate, useParams } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const navigate = useNavigate();
  const {role} = useParams();


  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name, phone, email, password , role
    };

    axios.post("http://localhost:8000/signup", userData )
      .then(result => {
        console.log(result);
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
        navigate(`/login/${role}`) } )
        
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <div className="signup-container">
        <h1 className="signup-heading">Create an {role === "buyer" ? "Buyer" :"Seller"} Account </h1>
        <form className="signup-box" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              required
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
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          
          <button className="submit-button" type="submit">Sign Up</button>
          <h3 className='txt'>Already have account ? Login</h3>
          <Link to={`/login/${role}`} ><button className="submit-button" type="button">Login</button></Link>
        </form>
        

      </div>
    </Fragment>
  );
};

export default Signup;
