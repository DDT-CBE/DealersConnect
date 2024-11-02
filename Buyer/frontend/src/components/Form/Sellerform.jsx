import axios from 'axios';
import React, { useState } from 'react';
import './sellerform.css'; // Import the CSS file

const Sellerform = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyname, setCompanyName] = useState('');
  const [brandname, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [services, setServices] = useState('');
  const [role, setRole] = useState({
    dealer: false,
    franchise: false
  });
  const [investmentminimum, setInvestmentMinimum] = useState('');
  const [investmentmaximum, setInvestmentMaximum] = useState('');
  const [space, setSpace] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [numberhide, setNumberhide] = useState(true);
  const [approve, setApprove] = useState(false);

  const sellerdata = {
    name,
    phone,
    email,
    title,
    description,
    companyname,
    brandname,
    industry,
    category,
    product,
    services,
    role,
    investmentminimum,
    investmentmaximum,
    space,
    state,
    district,
    numberhide,
    approve
  };

  const submithandler = (e) => {
    e.preventDefault(); // Prevent form reload
    axios.post('http://localhost:8000/sellerregister', sellerdata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sellerform-container">
      <form className="sellerform-form" onSubmit={submithandler}>
        <label className="sellerform-label">Name</label>
        <input className="sellerform-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="sellerform-label">Phone</label>
        <input className="sellerform-input" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label className="sellerform-label">Email</label>
        <input className="sellerform-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="sellerform-label">Title</label>
        <input className="sellerform-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="sellerform-label">Description</label>
        <input className="sellerform-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label className="sellerform-label">Company Name</label>
        <input className="sellerform-input" type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)} />

        <label className="sellerform-label">Brand Name</label>
        <input className="sellerform-input" type="text" value={brandname} onChange={(e) => setBrandName(e.target.value)} />

        <label className="sellerform-label">Industry</label>
        <select className="sellerform-input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="electronics">Electronics</option>
          <option value="car">Car</option>
          <option value="marketing">Marketing</option>
          <option value="clothing">Clothing</option>
        </select>

        <label className="sellerform-label">Category</label>
        <select className="sellerform-input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="mobiles">Mobiles</option>
          <option value="degitalmarketing">Digital Marketing</option>
          <option value="tshirts">T-shirts</option>
          <option value="carservice">Car Service</option>
        </select>

        <label className="sellerform-label">Product</label>
        <input className="sellerform-input" type="text" value={product} onChange={(e) => setProduct(e.target.value)} />

        <label className="sellerform-label">Services</label>
        <input className="sellerform-input" type="text" value={services} onChange={(e) => setServices(e.target.value)} />

        <label className="sellerform-label">Role Looking for</label>
        <div className="sellerform-role">
          <label>Dealer</label>
          <input
            type="checkbox"
            checked={role.dealer}
            onChange={(e) =>
              setRole((prevRole) => ({
                ...prevRole,
                dealer: e.target.checked
              }))
            }
          />
          <label>Franchise</label>
          <input
            type="checkbox"
            checked={role.franchise}
            onChange={(e) =>
              setRole((prevRole) => ({
                ...prevRole,
                franchise: e.target.checked
              }))
            }
          />
        </div>

        <label className="sellerform-label">Investment Minimum</label>
        <input className="sellerform-input" type="number" value={investmentminimum} onChange={(e) => setInvestmentMinimum(e.target.value)} />

        <label className="sellerform-label">Investment Maximum</label>
        <input className="sellerform-input" type="number" value={investmentmaximum} onChange={(e) => setInvestmentMaximum(e.target.value)} />

        <label className="sellerform-label">Space</label>
        <input className="sellerform-input" type="text" value={space} onChange={(e) => setSpace(e.target.value)} />

        <label className="sellerform-label">State</label>
        <select className="sellerform-input" value={state} onChange={(e) => setState(e.target.value)}>
          <option value="tamilnadu">Tamil Nadu</option>
          <option value="ap">AP</option>
          <option value="telungana">Telangana</option>
          <option value="karnataka">Karnataka</option>
        </select>

        <label className="sellerform-label">District</label>
        <select className="sellerform-input" value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="coimbatore">Coimbatore</option>
          <option value="chennai">Chennai</option>
          <option value="kanniyakumari">Kanyakumari</option>
          <option value="erode">Erode</option>
        </select>

        <button className="sellerform-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sellerform;
