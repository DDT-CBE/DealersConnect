import axios from 'axios';
import React, { Fragment, useState } from 'react';
import './form.css';  // Import the CSS file

const Form = () => {
  // State variables to store form input values
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [category, setCategory] = useState('');
  const [investmentMin, setInvestmentMin] = useState('');
  const [investmentMax, setInvestmentMax] = useState('');
  const [role, setRole] = useState({
    dealer: false,
    franchise: false,
  });
  const [numberhide, setNumberHide] = useState(true);
  const [approve, setApprove] = useState(false);


  const [submit ,setSubmit] = useState(false);
  const [err , setErr] = useState('')

  // Handler to capture form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      title,
      description,
      industry,
      category,
      investmentrange :{
       min: investmentMin,
       max: investmentMax
      },
      role,
      numberhide,
      approve
    };
    console.log('Collected Data:', formData);
    axios.post("http://localhost:8000/formregister", formData)
      .then(res => {console.log(res)
        setSubmit(!submit)
      })
      .catch(err => {console.log(err)
        setErr(err)
      });
  };

  return (
    <Fragment>
      <div className="form-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Register Information</h2>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Industry</label>
          <select
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="Education">Education</option>
            <option value="Electronics">Electronics</option>
          </select>

          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="School">School</option>
            <option value="College">College</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Laptops">Laptops</option>
          </select>

          <div className="checkbox-group">
            <label>Role:</label>
            <label>Dealer</label>
            <input
              type="checkbox"
              checked={role.dealer}
              onChange={(e) =>
                setRole((prevRole) => ({
                  ...prevRole,
                  dealer: e.target.checked,
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
                  franchise: e.target.checked,
                }))
              }
            />
          </div>

          <label>Investment Range</label>
          <div className="investment-range">
            Min Value{' '}
            <input
              type="text"
              value={investmentMin}
              onChange={(e) => setInvestmentMin(e.target.value)}
            />{' '}
            - Max Value{' '}
            <input
              type="text"
              value={investmentMax}
              onChange={(e) => setInvestmentMax(e.target.value)}
            />
          </div>

          <button type="submit">{submit ? "Form Submited" : "Submit"}</button>
          <div className="centered-text">{submit ? "Thank you for filling out the form!" : err}</div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
