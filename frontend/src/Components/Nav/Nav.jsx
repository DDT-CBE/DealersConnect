import React, { Fragment, useState } from "react";
import "./nav.css";
import hamburger from "../Assets/icons8-hamburger-menu-100.png";
import { Link as ScrollLink } from "react-scroll";
import { Link as PathLink } from "react-router-dom";
import { useEffect } from "react";
import {  Dropdown, Space } from 'antd';

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const menutoggle = () => {
    setMenu(!menu);
  };
  // Handle logout
  const logoutHandler = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLogged(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, []); // Empty dependency array ensures it runs only once



  
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
       Software Development
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Digital Marketing
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Registration
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
       Trademarks
      </a>
    ),
  },
];

  return (
    <Fragment>
      <nav className="navcontainer">
        <img
          className="hamburger"
          src={hamburger}
          alt=""
          onClick={menutoggle}
        />
        <h1>Dealers Connect</h1>
        <ul className={menu ? "reset" : "navcontent"}>
          <li>
            <ScrollLink
              to="homecontainer"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="findcontainer"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              activeClass="txtcolor"
            >
              FindYourNeeds
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="aboutcontainer"
              spy={true}
              smooth={true}
              offset={-40}
              duration={500}
              activeClass="txtcolor"
            >
              About Us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="enquiry-container"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              activeClass="txtcolor"
            >
              Enquiry
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Contact
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Association
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Job
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Freelancers
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              StartUps
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Loans
            </ScrollLink>
          </li>

          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Space>Services</Space>
          </Dropdown>

          <li>
            <ScrollLink
              to="contact-container"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              activeClass="txtcolor"
            >
              Advertiesment
            </ScrollLink>
          </li>

          <li>
            {isLogged ? (
              <button
                style={{
                  backgroundColor: "darkblue",
                  padding: "5px",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            ) : (
              <PathLink
                to={"/login"}
                style={{ textDecoration: "none", fontWeight: "500" }}
              >
                {" "}
                Login{" "}
              </PathLink>
            )}
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Nav;
