import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Findyourmatch from "./Components/FindyourMatch/Findyourmatch";
import About from "./Components/About/About";
import Enquiry from "./Components/Enquiry/Enquiry";
import Contact from "./Components/Contact/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buyerpage from "./Components/Buyerpage/Buyerpage";
import Sellerpage from "./Components/Sellerpage/Sellerpage";
import From from "./Components/Form/Form";
import Sellerform from "./Components/Form/Sellerform";
import "react-toastify/dist/ReactToastify.css";
import Franchisepage from "./Components/FranchisePage/Franchisepage";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import BuyerPageView from "./Components/Buyerpage/BuyerPageView";
import SellerPageView from "./Components/Sellerpage/SellerPageView";
import SuperDealer from "./Components/Hierarchy/SuperDealer";
import Dealer from "./Components/Hierarchy/Dealer";
import SubDealer from "./Components/Hierarchy/SubDealer";
import Pricing from "./Components/Pricing";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Nav />
              <Home />
              <Findyourmatch />
              <About />
              <Enquiry />
              <Contact />
            </Fragment>
          }
        ></Route>
        <Route path="/:page" element={<Findyourmatch />} />
        <Route path="/buyer/:id" element={<BuyerPageView />} />
        <Route path="/seller/:id" element={<SellerPageView />} />
        <Route path="/buyerpage" element={<Buyerpage />}></Route>
        <Route path="/sellerpage" element={<Sellerpage />}></Route>
        <Route path="/franchisepage" element={<Franchisepage />}></Route>
        <Route path="/form/buyer" element={<From />}></Route>
        <Route path="/form/seller" element={<Sellerform />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<SuperDealer />}></Route>
        <Route path="/dealers/:id" element={<Dealer />} />
        <Route path="/subdealers/:id" element={<SubDealer />} />
        <Route path="/pricing" element={<Pricing />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
