import axios from "axios";
import React, { Fragment, useState } from "react";
import "./form.css"; // Import the CSS file
import Nav2 from "../Nav2/Nav2";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const Form = () => {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [category, setCategory] = useState("");
  const [space, setSpace] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [investmentMin, setInvestmentMin] = useState("");
  const [investmentMax, setInvestmentMax] = useState("");
  const [businessType ,setBusinessType] = useState("");
  const [role, setRole] = useState({
    dealer: false,
    franchise: false,
    wholesaler: false,
    stcokist: false,
    distributor: false,
    agency: false,
    retailer: false,
    BusinessBuyOuts: false,
    InvestPartners: false,
    SharePartners: false,
    WorkingPartners: false,
    ShareBuyers: false,
    SeedFunders: false,
    VentureCapitals: false,
  });

  const [revenue, setRevenue] = useState("");
  const [duration, setDuration] = useState("");
  const [numberhide] = useState(true);
  const [approve] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  // Handler to capture form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit
    const formData = {
      name,
      phone,
      title,
      description,
      industry,
      category,
      space,
      state,
      district,
      investmentrange: {
        min: investmentMin,
        max: investmentMax,
      },
      role,
      revenue,
      duration,
      numberhide,
      businessType,
      approve,
    };

    axios
      .post(`${url}api/buyerregister`, formData)
      .then((res) => {
        console.log(res);
        setSubmit(!submit);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      })
      .finally(() => {
        setLoading(false); // Stop loading after request completes
        navigate("/buyerpage");
      });
  };

  return (
    <Fragment>
      <div className="form-container">
        <Nav2 />
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

<label >Business Provider Type</label>
<select 
  value={businessType} 
  onChange={(e) => setBusinessType(e.target.value)}
>
  <option value="">Select Business Type</option>
  <option value="Franchisor">Franchisor</option>
  <option value="Manufacturer">Manufacturer</option>
  <option value="Stockist">Stockist</option>
  <option value="Wholesaler">Wholesaler</option>
  <option value="Distributor">Distributor</option>
  <option value="Business Sell Outs">Business Sell Outs</option>
</select>


          <label>Industry</label>
          <select
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >

{ ["Manufacturer", "Stockist", "Wholesaler", "Distributor"].includes(businessType) ? (
     <>
     
  <option value="">Select Industry</option>
  <option value="Agriculture">Agriculture</option>
  <option value="Automobile">Automobile</option>
  <option value="Building and Construction">Building and Construction</option>
  <option value="Business Services">Business Services</option>
  <option value="Chemicals">Chemicals</option>
  <option value="Computer Hardware, Mobile & Accessories">Computer Hardware, Mobile & Accessories</option>
  <option value="Education">Education</option>
  <option value="Electronics & Electrical Supplies">Electronics & Electrical Supplies</option>
  <option value="Environment & Pollution">Environment & Pollution</option>
  <option value="Fashion & Apparel">Fashion & Apparel</option>
  <option value="Food & Beverages">Food & Beverages</option>
  <option value="Furniture">Furniture</option>
  <option value="Health & Beauty">Health & Beauty</option>
  <option value="Home Supplies">Home Supplies</option>
  <option value="Hotel supplies & Equipments">Hotel supplies & Equipments</option>
  <option value="Industry Supplies">Industry Supplies</option>
  <option value="Jewellery, Gemstones & Astrology">Jewellery, Gemstones & Astrology</option>
  <option value="Medical & Hospital">Medical & Hospital</option>
  <option value="Office & School">Office & School</option>
  <option value="Packaging, Paper & Plastic Products">Packaging, Paper & Plastic Products</option>
  <option value="Pharmaceuticals">Pharmaceuticals</option>
  <option value="Printing & Publishing">Printing & Publishing</option>
  <option value="Retail & E-Retail">Retail & E-Retail</option>
  <option value="Scientific & Laboratory">Scientific & Laboratory</option>
  <option value="Security & Protection">Security & Protection</option>
  <option value="Sports, Fitness & Entertainment">Sports, Fitness & Entertainment</option>
  <option value="Telecommunication">Telecommunication</option>
  <option value="Textile, Fabrics & Accessories">Textile, Fabrics & Accessories</option>
  <option value="Toys & Games">Toys & Games</option>


     </>
) :  ["Franchisor"].includes(businessType) ? (

  <>
  
 
  <option value="">Select Industry</option>
  <option value="Automotive">Automotive</option>
  <option value="BeautyWellness">Beauty & Wellness</option>
  <option value="BusinessServices">Business Services</option>
  <option value="ChildrenProducts">Children’s Products & Services</option>
  <option value="EducationTraining">Education & Training</option>
  <option value="FoodBeverage">Food & Beverage</option>
  <option value="HealthFitness">Health & Fitness</option>
  <option value="HomeMaintenance">Home Maintenance & Repair</option>
  <option value="PetCare">Pet Care</option>
  <option value="RealEstate">Real Estate</option>
  <option value="Retail">Retail</option>
  <option value="SportsFitness">Sports & Fitness</option>
  <option value="Technology">Technology</option>
  <option value="TravelHospitality">Travel & Hospitality</option>


  </>
) :

(
     <>
       <option>Select Industry</option>
       <option value="Education">Education</option>
       <option value="Electronics">Electronics</option>
     </>
)}


          
          </select>

          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            {industry === "Automotive" && (
  <>
    <option value="Car Dealerships">Car Dealerships</option>
    <option value="Car Rentals">Car Rentals</option>
    <option value="Car Wash and Detailing">Car Wash and Detailing</option>
    <option value="Oil and Lube Services">Oil and Lube Services</option>
    <option value="Repair and Maintenance">Repair and Maintenance</option>
  </>
)}

{industry === "BeautyWellness" && (
  <>
    <option value="Beauty Salons">Beauty Salons</option>
    <option value="Fitness Centers">Fitness Centers</option>
    <option value="Gyms">Gyms</option>
    <option value="Hair Restoration">Hair Restoration</option>
    <option value="Laser Hair Removal">Laser Hair Removal</option>
    <option value="Massage Therapy">Massage Therapy</option>
    <option value="Nail Salons">Nail Salons</option>
    <option value="Skin Care Clinics">Skin Care Clinics</option>
    <option value="Spas">Spas</option>
    <option value="Tattoo Removal">Tattoo Removal</option>
    <option value="Weight Loss Centers">Weight Loss Centers</option>
  </>
)}

{industry === "BusinessServices" && (
  <>
    <option value="Accounting and Tax Preparation">Accounting and Tax Preparation</option>
    <option value="Advertising and Marketing">Advertising and Marketing</option>
    <option value="Business Brokers">Business Brokers</option>
    <option value="Business Consulting">Business Consulting</option>
    <option value="Commercial Cleaning">Commercial Cleaning</option>
    <option value="Courier and Delivery Services">Courier and Delivery Services</option>
    <option value="Digital Marketing">Digital Marketing</option>
    <option value="Document Shredding">Document Shredding</option>
    <option value="Employee Staffing">Employee Staffing</option>
    <option value="Event Planning">Event Planning</option>
    <option value="Executive Search">Executive Search</option>
    <option value="Financial Services">Financial Services</option>
    <option value="Human Resources">Human Resources</option>
    <option value="Insurance Services">Insurance Services</option>
    <option value="IT Services">IT Services</option>
    <option value="Janitorial Services">Janitorial Services</option>
    <option value="Mail and Package Delivery">Mail and Package Delivery</option>
    <option value="Management Consulting">Management Consulting</option>
    <option value="Marketing Research">Marketing Research</option>
    <option value="Office Administrative Services">Office Administrative Services</option>
  </>
)}

{industry === "ChildrenProducts" && (
  <>
    <option value="After-School Programs">After-School Programs</option>
    <option value="Baby Products">Baby Products</option>
    <option value="Children's Apparel">Children's Apparel</option>
    <option value="Children's Education">Children's Education</option>
    <option value="Children's Entertainment">Children's Entertainment</option>
    <option value="Children's Furniture">Children's Furniture</option>
    <option value="Day Care Centers">Day Care Centers</option>
    <option value="Kids' Gyms">Kids' Gyms</option>
    <option value="Preschools">Preschools</option>
    <option value="Tutoring Services">Tutoring Services</option>
  </>
)}

{industry === "EducationTraining" && (
  <>
    <option value="Adult Education">Adult Education</option>
    <option value="Business Training">Business Training</option>
    <option value="Computer Training">Computer Training</option>
    <option value="Cooking Schools">Cooking Schools</option>
    <option value="Dance Studios">Dance Studios</option>
    <option value="Driving Schools">Driving Schools</option>
    <option value="English Language Schools">English Language Schools</option>
    <option value="Flight Schools">Flight Schools</option>
    <option value="Language Schools">Language Schools</option>
    <option value="Martial Arts Schools">Martial Arts Schools</option>
    <option value="Music Schools">Music Schools</option>
    <option value="Online Education">Online Education</option>
    <option value="Professional Training">Professional Training</option>
    <option value="Tutoring Services">Tutoring Services</option>
    <option value="Vocational Training">Vocational Training</option>
  </>
)}

{industry === "FoodBeverage" && (
  <>
    <option value="Bakeries">Bakeries</option>
    <option value="Bars and Nightclubs">Bars and Nightclubs</option>
    <option value="Cafes">Cafes</option>
    <option value="Catering Services">Catering Services</option>
    <option value="Coffee Shops">Coffee Shops</option>
    <option value="Convenience Stores">Convenience Stores</option>
    <option value="Fast Food Restaurants">Fast Food Restaurants</option>
    <option value="Food Delivery Services">Food Delivery Services</option>
    <option value="Food Trucks">Food Trucks</option>
    <option value="Ice Cream Shops">Ice Cream Shops</option>
    <option value="Juice Bars">Juice Bars</option>
    <option value="Pizza Restaurants">Pizza Restaurants</option>
    <option value="Restaurants">Restaurants</option>
    <option value="Sandwich Shops">Sandwich Shops</option>
    <option value="Smoothie Bars">Smoothie Bars</option>
    <option value="Specialty Food Stores">Specialty Food Stores</option>
    <option value="Tea Rooms">Tea Rooms</option>
  </>
)}

{industry === "HealthFitness" && (
  <>
    <option value="Chiropractic Clinics">Chiropractic Clinics</option>
    <option value="Dental Clinics">Dental Clinics</option>
    <option value="Fitness Centers">Fitness Centers</option>
    <option value="Gyms">Gyms</option>
    <option value="Health Food Stores">Health Food Stores</option>
    <option value="Home Health Care">Home Health Care</option>
    <option value="Medical Clinics">Medical Clinics</option>
    <option value="Medical Spas">Medical Spas</option>
    <option value="Occupational Therapy">Occupational Therapy</option>
    <option value="Orthotics and Prosthetics">Orthotics and Prosthetics</option>
    <option value="Personal Training">Personal Training</option>
    <option value="Pharmacies">Pharmacies</option>
    <option value="Physical Therapy">Physical Therapy</option>
    <option value="Senior Care">Senior Care</option>
    <option value="Speech Therapy">Speech Therapy</option>
    <option value="Wellness Centers">Wellness Centers</option>
    <option value="Yoga Studios">Yoga Studios</option>
  </>
)}

{industry === "HomeMaintenance" && (
  <>
    <option value="Air Conditioning Repair">Air Conditioning Repair</option>
    <option value="Appliance Repair">Appliance Repair</option>
    <option value="Carpet Cleaning">Carpet Cleaning</option>
    <option value="Construction Services">Construction Services</option>
    <option value="Electrical Services">Electrical Services</option>
    <option value="Flooring Services">Flooring Services</option>
    <option value="Handyman Services">Handyman Services</option>
    <option value="Heating Repair">Heating Repair</option>
    <option value="Home Inspection Services">Home Inspection Services</option>
    <option value="Home Security Systems">Home Security Systems</option>
    <option value="HVAC Services">HVAC Services</option>
    <option value="Landscaping Services">Landscaping Services</option>
    <option value="Lawn Care Services">Lawn Care Services</option>
    <option value="Locksmith Services">Locksmith Services</option>
    <option value="Mold Remediation">Mold Remediation</option>
    <option value="Painting Services">Painting Services</option>
    <option value="Pest Control Services">Pest Control Services</option>
    <option value="Plumbing Services">Plumbing Services</option>
    <option value="Pool Cleaning Services">Pool Cleaning Services</option>
    <option value="Roofing Services">Roofing Services</option>
  </>
)}

{industry === "PetCare" && (
  <>
    <option value="Animal Grooming">Animal Grooming</option>
    <option value="Animal Training">Animal Training</option>
    <option value="Boarding Kennels">Boarding Kennels</option>
    <option value="Dog Day Care">Dog Day Care</option>
    <option value="Dog Walking Services">Dog Walking Services</option>
    <option value="Pet Food Stores">Pet Food Stores</option>
    <option value="Pet Grooming Salons">Pet Grooming Salons</option>
    <option value="Pet Sitting Services">Pet Sitting Services</option>
    <option value="Pet Stores">Pet Stores</option>
    <option value="Veterinary Clinics">Veterinary Clinics</option>
  </>
)}

{industry === "RealEstate" && (
  <>
    <option value="Apartment Rentals">Apartment Rentals</option>
    <option value="Commercial Real Estate">Commercial Real Estate</option>
    <option value="Home Inspections">Home Inspections</option>
    <option value="Home Staging">Home Staging</option>
    <option value="Property Management">Property Management</option>
    <option value="Real Estate Agencies">Real Estate Agencies</option>
    <option value="Real Estate Investment">Real Estate Investment</option>
    <option value="Residential Real Estate">Residential Real Estate</option>
    <option value="Vacation Rentals">Vacation Rentals</option>
  </>
)}

{industry === "Retail" && (
  <>
    <option value="Art Galleries">Art Galleries</option>
    <option value="Baby Stores">Baby Stores</option>
    <option value="Bookstores">Bookstores</option>
    <option value="Clothing Stores">Clothing Stores</option>
    <option value="Convenience Stores">Convenience Stores</option>
    <option value="Department Stores">Department Stores</option>
    <option value="Discount Stores">Discount Stores</option>
    <option value="Dollar Stores">Dollar Stores</option>
    <option value="Electronics Stores">Electronics Stores</option>
    <option value="Furniture Stores">Furniture Stores</option>
    <option value="Gift Shops">Gift Shops</option>
    <option value="Grocery Stores">Grocery Stores</option>
    <option value="Hardware Stores">Hardware Stores</option>
    <option value="Home Decor Stores">Home Decor Stores</option>
    <option value="Jewelry Stores">Jewelry Stores</option>
  </>
)}

{industry === "SportsFitness" && (
  <>
    <option value="Athletic Wear">Athletic Wear</option>
    <option value="Bike Shops">Bike Shops</option>
    <option value="Fitness Centers">Fitness Centers</option>
    <option value="Golf Courses">Golf Courses</option>
    <option value="Gyms">Gyms</option>
    <option value="Martial Arts Schools">Martial Arts Schools</option>
    <option value="Outdoor Gear Stores">Outdoor Gear Stores</option>
    <option value="Running Shoes">Running Shoes</option>
    <option value="Skate Shops">Skate Shops</option>
    <option value="Sporting Goods Stores">Sporting Goods Stores</option>
    <option value="Sports Bars">Sports Bars</option>
    <option value="Surf Shops">Surf Shops</option>
    <option value="Tennis Courts">Tennis Courts</option>
    <option value="Yoga Studios">Yoga Studios</option>
  </>
)}

{industry === "Technology" && (
  <>
    <option value="Computer Hardware">Computer Hardware</option>
    <option value="Computer Networking">Computer Networking</option>
    <option value="Cyber Security">Cyber Security</option>
    <option value="Data Analytics">Data Analytics</option>
    <option value="Digital Marketing">Digital Marketing</option>
    <option value="E-commerce Solutions">E-commerce Solutions</option>
    <option value="IT Consulting">IT Consulting</option>
    <option value="Mobile App Development">Mobile App Development</option>
    <option value="Software Development">Software Development</option>
    <option value="Web Design">Web Design</option>
    <option value="Web Development">Web Development</option>
  </>
)}

{industry === "TravelHospitality" && (
  <>
    <option value="Airlines">Airlines</option>
    <option value="Bed and Breakfasts">Bed and Breakfasts</option>
    <option value="Car Rental Services">Car Rental Services</option>
    <option value="Cruise Lines">Cruise Lines</option>
    <option value="Hotels">Hotels</option>
    <option value="Motels">Motels</option>
    <option value="Online Travel Agencies">Online Travel Agencies</option>
    <option value="Resorts">Resorts</option>
    <option value="Tour Operators">Tour Operators</option>
    <option value="Travel Agencies">Travel Agencies</option>
    <option value="Vacation Rentals">Vacation Rentals</option>
  </>
)}

{/* for other dealer and distributors */}

  {industry === "Agriculture" && (
    <>
      <option value="Agrochemicals">Agrochemicals</option>
      <option value="Agricultural Equipment">Agricultural Equipment</option>
      <option value="Fertilizers">Fertilizers</option>
      <option value="Irrigation Systems">Irrigation Systems</option>
      <option value="Pesticides">Pesticides</option>
      <option value="Seeds">Seeds</option>
      <option value="Tractors and Farm Machinery">Tractors and Farm Machinery</option>
    </>
  )}
  {industry === "Automobile" && (
    <>
      <option value="Accessories">Accessories</option>
      <option value="Batteries">Batteries</option>
      <option value="Car Dealers">Car Dealers</option>
      <option value="Commercial Vehicles">Commercial Vehicles</option>
      <option value="Lubricants">Lubricants</option>
      <option value="Motorcycles">Motorcycles</option>
      <option value="Spare Parts">Spare Parts</option>
      <option value="Tyres">Tyres</option>
    </>
  )}

  {industry === "Building and Construction" && (
    <>
      <option value="Building Materials">Building Materials</option>
      <option value="Cement">Cement</option>
      <option value="Construction Equipment">Construction Equipment</option>
      <option value="Electrical Fittings">Electrical Fittings</option>
      <option value="Flooring">Flooring</option>
      <option value="Glass and Glazing">Glass and Glazing</option>
      <option value="Paints and Coatings">Paints and Coatings</option>
      <option value="Plumbing">Plumbing</option>
      <option value="Steel and Metal Products">Steel and Metal Products</option>
    </>
  )}
  {industry === "Chemicals" && (
    <>
      <option value="Adhesives">Adhesives</option>
      <option value="Industrial Chemicals">Industrial Chemicals</option>
      <option value="Paints and Coatings">Paints and Coatings</option>
      <option value="Petrochemicals">Petrochemicals</option>
      <option value="Specialty Chemicals">Specialty Chemicals</option>
    </>
  )}
  {industry === "Education" && (
    <>
      <option value="Colleges">Colleges</option>
      <option value="Ed-Tech">Ed-Tech</option>
      <option value="Online Courses">Online Courses</option>
      <option value="Schools">Schools</option>
      <option value="Universities">Universities</option>
      <option value="Vocational Training">Vocational Training</option>
    </>
  )}
  {industry === "Energy and Power" && (
    <>
      <option value="Electric Power">Electric Power</option>
      <option value="Oil and Gas">Oil and Gas</option>
      <option value="Renewable Energy">Renewable Energy</option>
      <option value="Solar Power">Solar Power</option>
      <option value="Wind Energy">Wind Energy</option>
    </>
  )}
  {industry === "Fashion and Apparel" && (
    <>
      <option value="Accessories">Accessories</option>
      <option value="Footwear">Footwear</option>
      <option value="Garments">Garments</option>
      <option value="Jewelry">Jewelry</option>
      <option value="Textiles">Textiles</option>
    </>
  )}
  {industry === "Food and Beverages" && (
    <>
      <option value="Bakeries">Bakeries</option>
      <option value="Beverages">Beverages</option>
      <option value="Confectionery">Confectionery</option>
      <option value="Dairy Products">Dairy Products</option>
      <option value="Frozen Foods">Frozen Foods</option>
      <option value="Organic Foods">Organic Foods</option>
      <option value="Packaged Foods">Packaged Foods</option>
    </>
  )}
  {industry === "Healthcare and Pharmaceuticals" && (
    <>
      <option value="Ayurveda">Ayurveda</option>
      <option value="Diagnostic Labs">Diagnostic Labs</option>
      <option value="Hospitals">Hospitals</option>
      <option value="Medical Devices">Medical Devices</option>
      <option value="Nutraceuticals">Nutraceuticals</option>
      <option value="Pharmaceuticals">Pharmaceuticals</option>
    </>
  )}
  {industry === "Information Technology" && (
    <>
      <option value="Artificial Intelligence">Artificial Intelligence</option>
      <option value="Cybersecurity">Cybersecurity</option>
      <option value="IT Services">IT Services</option>
      <option value="Software Development">Software Development</option>
      <option value="Web Development">Web Development</option>
    </>
  )}
  {industry === "Manufacturing" && (
    <>
      <option value="Automobile Manufacturing">Automobile Manufacturing</option>
      <option value="Chemical Manufacturing">Chemical Manufacturing</option>
      <option value="Food Processing">Food Processing</option>
      <option value="Metal and Steel">Metal and Steel</option>
      <option value="Textile Manufacturing">Textile Manufacturing</option>
    </>
  )}
  {industry === "Mining and Metals" && (
    <>
      <option value="Coal Mining">Coal Mining</option>
      <option value="Gold Mining">Gold Mining</option>
      <option value="Iron and Steel">Iron and Steel</option>
      <option value="Metal Extraction">Metal Extraction</option>
    </>
  )}
  {industry === "Real Estate" && (
    <>
      <option value="Commercial Properties">Commercial Properties</option>
      <option value="Residential Properties">Residential Properties</option>
      <option value="Property Management">Property Management</option>
    </>
  )}

  {industry === "Telecommunication" && (
    <>
      <option value="Broadband Services">Broadband Services</option>
      <option value="Satellite Communications">Satellite Communications</option>
      <option value="Cell Phones">Cell Phones</option>
      <option value="Data Cards">Data Cards</option>
      <option value="Internet Services">Internet Services</option>
      <option value="Mobile Accessories">Mobile Accessories</option>
      <option value="Telecommunication Equipment">Telecommunication Equipment</option>

    </>
  )}
  {industry === "Transport and Logistics" && (
    <>
      <option value="Air Transport">Air Transport</option>
      <option value="Rail Transport">Rail Transport</option>
      <option value="Road Transport">Road Transport</option>
      <option value="Shipping and Ports">Shipping and Ports</option>
      <option value="Warehousing">Warehousing</option>
    </>
  )}

{industry === "Business Services" && (
  <>
    <option value="Accounting and Auditing">Accounting and Auditing</option>
    <option value="Advertising and Marketing">Advertising and Marketing</option>
    <option value="Business Consulting">Business Consulting</option>
    <option value="Event Management">Event Management</option>
    <option value="Human Resources">Human Resources</option>
    <option value="IT Services">IT Services</option>
    <option value="Logistics and Supply Chain">Logistics and Supply Chain</option>
    <option value="Recruitment and Training">Recruitment and Training</option>
  </>
)}

{industry === "Computer Hardware, Mobile & Accessories" && (
  <>
    <option value="Computer Hardware">Computer Hardware</option>
    <option value="Gaming Consoles">Gaming Consoles</option>
    <option value="Mobile Accessories">Mobile Accessories</option>
    <option value="Mobile Phones">Mobile Phones</option>
    <option value="Networking Equipment">Networking Equipment</option>
    <option value="Printers and Scanners">Printers and Scanners</option>
    <option value="Software">Software</option>
    <option value="Tablets and Laptops">Tablets and Laptops</option>
  </>
)}

{industry === "Electronics & Electrical Supplies" && (
  <>
    <option value="Audio and Video Equipment">Audio and Video Equipment</option>
    <option value="Cables and Wires">Cables and Wires</option>
    <option value="Electrical Components">Electrical Components</option>
    <option value="Electronic Components">Electronic Components</option>
    <option value="Home Appliances">Home Appliances</option>
    <option value="Industrial Automation">Industrial Automation</option>
    <option value="Lighting">Lighting</option>
    <option value="Power Supplies">Power Supplies</option>
  </>
)}

{industry === "Environment & Pollution" && (
  <>
    <option value="Air Pollution Control">Air Pollution Control</option>
    <option value="Environmental Consulting">Environmental Consulting</option>
    <option value="Green Building Materials">Green Building Materials</option>
    <option value="Hazardous Waste Management">Hazardous Waste Management</option>
    <option value="Renewable Energy">Renewable Energy</option>
    <option value="Soil Remediation">Soil Remediation</option>
    <option value="Solid Waste Management">Solid Waste Management</option>
    <option value="Water Treatment">Water Treatment</option>
  </>
)}

{industry === "Fashion & Apparel" && (
  <>
    <option value="Accessories">Accessories</option>
    <option value="Bridal Wear">Bridal Wear</option>
    <option value="Casual Wear">Casual Wear</option>
    <option value="Children's Wear">Children's Wear</option>
    <option value="Ethnic Wear">Ethnic Wear</option>
    <option value="Footwear">Footwear</option>
    <option value="Formal Wear">Formal Wear</option>
    <option value="Luxury Wear">Luxury Wear</option>
  </>
)}

{industry === "Furniture" && (
  <>
    <option value="Bedroom Furniture">Bedroom Furniture</option>
    <option value="Dining Furniture">Dining Furniture</option>
    <option value="Garden Furniture">Garden Furniture</option>
    <option value="Home Decor">Home Decor</option>
    <option value="Kitchen Furniture">Kitchen Furniture</option>
    <option value="Living Room Furniture">Living Room Furniture</option>
    <option value="Office Furniture">Office Furniture</option>
    <option value="Outdoor Furniture">Outdoor Furniture</option>
  </>
)}

{industry === "Health & Beauty" && (
  <>
    <option value="Ayurvedic Products">Ayurvedic Products</option>
    <option value="Cosmetics">Cosmetics</option>
    <option value="Fitness Equipment">Fitness Equipment</option>
    <option value="Fragrances">Fragrances</option>
    <option value="Hair Care">Hair Care</option>
    <option value="Health Supplements">Health Supplements</option>
    <option value="Personal Care">Personal Care</option>
    <option value="Skincare">Skincare</option>
  </>
)}

{industry === "Home Supplies" && (
  <>
    <option value="Cleaning Supplies">Cleaning Supplies</option>
    <option value="Cookware">Cookware</option>
    <option value="Crockery">Crockery</option>
    <option value="Cutlery">Cutlery</option>
    <option value="Glassware">Glassware</option>
    <option value="Home Appliances">Home Appliances</option>
    <option value="Kitchen Utensils">Kitchen Utensils</option>
    <option value="Linen">Linen</option>
  </>
)}

{industry === "Hotel supplies & Equipments" && (
  <>
    <option value="Bedding and Towels">Bedding and Towels</option>
    <option value="Catering Equipment">Catering Equipment</option>
    <option value="Cleaning Supplies">Cleaning Supplies</option>
    <option value="Furniture">Furniture</option>
    <option value="Hotel Amenities">Hotel Amenities</option>
    <option value="Hotel Linen">Hotel Linen</option>
    <option value="Kitchen Equipment">Kitchen Equipment</option>
    <option value="Laundry Equipment">Laundry Equipment</option>
  </>
)}

{industry === "Industry Supplies" && (
  <>
    <option value="Abrasives">Abrasives</option>
    <option value="Adhesives">Adhesives</option>
    <option value="Bearings">Bearings</option>
    <option value="Cutting Tools">Cutting Tools</option>
    <option value="Electrical Supplies">Electrical Supplies</option>
    <option value="Fasteners">Fasteners</option>
    <option value="Hand Tools">Hand Tools</option>
    <option value="Lubricants">Lubricants</option>
  </>
)}

{industry === "Jewellery, Gemstones & Astrology" && (
  <>
    <option value="Astrology Services">Astrology Services</option>
    <option value="Diamond Jewellery">Diamond Jewellery</option>
    <option value="Gemstones">Gemstones</option>
    <option value="Gold Jewellery">Gold Jewellery</option>
    <option value="Jewellery Boxes">Jewellery Boxes</option>
    <option value="Precious Stones">Precious Stones</option>
    <option value="Silver Jewellery">Silver Jewellery</option>
    <option value="Watches">Watches</option>
  </>
)}

{industry === "Food & Beverages" && (
  <>
    <option value="Bakery Products">Bakery Products</option>
    <option value="Beverages">Beverages</option>
    <option value="Confectionery">Confectionery</option>
    <option value="Dairy Products">Dairy Products</option>
    <option value="Fruits and Vegetables">Fruits and Vegetables</option>
    <option value="Meat and Poultry">Meat and Poultry</option>
    <option value="Processed Foods">Processed Foods</option>
    <option value="Snacks and Namkeens">Snacks and Namkeens</option>
  </>
)}

{industry === "Business Services" && (
  <>
    <option value="Accounting and Auditing">Accounting and Auditing</option>
    <option value="Advertising and Marketing">Advertising and Marketing</option>
    <option value="Business Consulting">Business Consulting</option>
    <option value="Event Management">Event Management</option>
    <option value="Human Resources">Human Resources</option>
    <option value="IT Services">IT Services</option>
    <option value="Logistics and Supply Chain">Logistics and Supply Chain</option>
    <option value="Recruitment and Training">Recruitment and Training</option>
  </>
)}

{industry === "Computer Hardware, Mobile & Accessories" && (
  <>
    <option value="Computer Hardware">Computer Hardware</option>
    <option value="Gaming Consoles">Gaming Consoles</option>
    <option value="Mobile Accessories">Mobile Accessories</option>
    <option value="Mobile Phones">Mobile Phones</option>
    <option value="Networking Equipment">Networking Equipment</option>
    <option value="Printers and Scanners">Printers and Scanners</option>
    <option value="Software">Software</option>
    <option value="Tablets and Laptops">Tablets and Laptops</option>
  </>
)}

{industry === "Electronics & Electrical Supplies" && (
  <>
    <option value="Audio and Video Equipment">Audio and Video Equipment</option>
    <option value="Cables and Wires">Cables and Wires</option>
    <option value="Electrical Components">Electrical Components</option>
    <option value="Electronic Components">Electronic Components</option>
    <option value="Home Appliances">Home Appliances</option>
    <option value="Industrial Automation">Industrial Automation</option>
    <option value="Lighting">Lighting</option>
    <option value="Power Supplies">Power Supplies</option>
  </>
)}

{industry === "Environment & Pollution" && (
  <>
    <option value="Air Pollution Control">Air Pollution Control</option>
    <option value="Environmental Consulting">Environmental Consulting</option>
    <option value="Green Building Materials">Green Building Materials</option>
    <option value="Hazardous Waste Management">Hazardous Waste Management</option>
    <option value="Renewable Energy">Renewable Energy</option>
    <option value="Soil Remediation">Soil Remediation</option>
    <option value="Solid Waste Management">Solid Waste Management</option>
    <option value="Water Treatment">Water Treatment</option>
  </>
)}

{industry === "Fashion & Apparel" && (
  <>
    <option value="Accessories">Accessories</option>
    <option value="Bridal Wear">Bridal Wear</option>
    <option value="Casual Wear">Casual Wear</option>
    <option value="Children's Wear">Children's Wear</option>
    <option value="Ethnic Wear">Ethnic Wear</option>
    <option value="Footwear">Footwear</option>
    <option value="Formal Wear">Formal Wear</option>
    <option value="Luxury Wear">Luxury Wear</option>
  </>
)}

{industry === "Furniture" && (
  <>
    <option value="Bedroom Furniture">Bedroom Furniture</option>
    <option value="Dining Furniture">Dining Furniture</option>
    <option value="Garden Furniture">Garden Furniture</option>
    <option value="Home Decor">Home Decor</option>
    <option value="Kitchen Furniture">Kitchen Furniture</option>
    <option value="Living Room Furniture">Living Room Furniture</option>
    <option value="Office Furniture">Office Furniture</option>
    <option value="Outdoor Furniture">Outdoor Furniture</option>
  </>
)}

{industry === "Health & Beauty" && (
  <>
    <option value="Ayurvedic Products">Ayurvedic Products</option>
    <option value="Cosmetics">Cosmetics</option>
    <option value="Fitness Equipment">Fitness Equipment</option>
    <option value="Fragrances">Fragrances</option>
    <option value="Hair Care">Hair Care</option>
    <option value="Health Supplements">Health Supplements</option>
    <option value="Personal Care">Personal Care</option>
    <option value="Skincare">Skincare</option>
  </>
)}

{industry === "Hotel Supplies & Equipments" && (
  <>
    <option value="Bedding and Towels">Bedding and Towels</option>
    <option value="Catering Equipment">Catering Equipment</option>
    <option value="Cleaning Supplies">Cleaning Supplies</option>
    <option value="Furniture">Furniture</option>
    <option value="Hotel Amenities">Hotel Amenities</option>
    <option value="Hotel Linen">Hotel Linen</option>
    <option value="Kitchen Equipment">Kitchen Equipment</option>
    <option value="Laundry Equipment">Laundry Equipment</option>
  </>
)}


{industry === "Business Services" && (
  <>
    <option value="Accounting and Auditing">Accounting and Auditing</option>
    <option value="Advertising and Marketing">Advertising and Marketing</option>
    <option value="Business Consulting">Business Consulting</option>
    <option value="Event Management">Event Management</option>
    <option value="Human Resources">Human Resources</option>
    <option value="IT Services">IT Services</option>
    <option value="Logistics and Supply Chain">Logistics and Supply Chain</option>
    <option value="Recruitment and Training">Recruitment and Training</option>
  </>
)}

{industry === "Computer Hardware, Mobile & Accessories" && (
  <>
    <option value="Computer Hardware">Computer Hardware</option>
    <option value="Gaming Consoles">Gaming Consoles</option>
    <option value="Mobile Accessories">Mobile Accessories</option>
    <option value="Mobile Phones">Mobile Phones</option>
    <option value="Networking Equipment">Networking Equipment</option>
    <option value="Printers and Scanners">Printers and Scanners</option>
    <option value="Software">Software</option>
    <option value="Tablets and Laptops">Tablets and Laptops</option>
  </>
)}

{industry === "Electronics & Electrical Supplies" && (
  <>
    <option value="Audio and Video Equipment">Audio and Video Equipment</option>
    <option value="Cables and Wires">Cables and Wires</option>
    <option value="Electrical Components">Electrical Components</option>
    <option value="Electronic Components">Electronic Components</option>
    <option value="Home Appliances">Home Appliances</option>
    <option value="Industrial Automation">Industrial Automation</option>
    <option value="Lighting">Lighting</option>
    <option value="Power Supplies">Power Supplies</option>
  </>
)}

{industry === "Environment & Pollution" && (
  <>
    <option value="Air Pollution Control">Air Pollution Control</option>
    <option value="Environmental Consulting">Environmental Consulting</option>
    <option value="Green Building Materials">Green Building Materials</option>
    <option value="Hazardous Waste Management">Hazardous Waste Management</option>
    <option value="Renewable Energy">Renewable Energy</option>
    <option value="Soil Remediation">Soil Remediation</option>
    <option value="Solid Waste Management">Solid Waste Management</option>
    <option value="Water Treatment">Water Treatment</option>
  </>
)}

{industry === "Fashion & Apparel" && (
  <>
    <option value="Accessories">Accessories</option>
    <option value="Bridal Wear">Bridal Wear</option>
    <option value="Casual Wear">Casual Wear</option>
    <option value="Children's Wear">Children's Wear</option>
    <option value="Ethnic Wear">Ethnic Wear</option>
    <option value="Footwear">Footwear</option>
    <option value="Formal Wear">Formal Wear</option>
    <option value="Luxury Wear">Luxury Wear</option>
  </>
)}

{industry === "Hotel Supplies & Equipments" && (
  <>
    <option value="Bedding and Towels">Bedding and Towels</option>
    <option value="Catering Equipment">Catering Equipment</option>
    <option value="Cleaning Supplies">Cleaning Supplies</option>
    <option value="Furniture">Furniture</option>
    <option value="Hotel Amenities">Hotel Amenities</option>
    <option value="Hotel Linen">Hotel Linen</option>
    <option value="Kitchen Equipment">Kitchen Equipment</option>
    <option value="Laundry Equipment">Laundry Equipment</option>
  </>
)}

{industry === "Medical & Hospital" && (
  <>
    <option value="Dental Equipment">Dental Equipment</option>
    <option value="Diagnostic Equipment">Diagnostic Equipment</option>
    <option value="Hospital Furniture">Hospital Furniture</option>
    <option value="Medical Consumables">Medical Consumables</option>
    <option value="Medical Instruments">Medical Instruments</option>
    <option value="Orthopedic Equipment">Orthopedic Equipment</option>
    <option value="Patient Monitoring Systems">Patient Monitoring Systems</option>
    <option value="Surgical Equipment">Surgical Equipment</option>
  </>
)}

{industry === "Pharmaceuticals" && (
  <>
    <option value="Active Pharmaceutical Ingredients (APIs)">Active Pharmaceutical Ingredients (APIs)</option>
    <option value="Ayurvedic Medicines">Ayurvedic Medicines</option>
    <option value="Contract Manufacturing">Contract Manufacturing</option>
    <option value="Generic Medicines">Generic Medicines</option>
    <option value="Herbal Medicines">Herbal Medicines</option>
    <option value="Homeopathic Medicines">Homeopathic Medicines</option>
    <option value="Nutraceuticals">Nutraceuticals</option>
    <option value="Prescription Medicines">Prescription Medicines</option>
  </>
)}

{industry === "Security & Protection" && (
  <>
    <option value="Access Control Systems">Access Control Systems</option>
    <option value="Alarm Systems">Alarm Systems</option>
    <option value="Biometric Systems">Biometric Systems</option>
    <option value="CCTV Cameras">CCTV Cameras</option>
    <option value="Fire Safety Equipment">Fire Safety Equipment</option>
    <option value="Home Security Systems">Home Security Systems</option>
    <option value="Intrusion Detection Systems">Intrusion Detection Systems</option>
    <option value="Surveillance Systems">Surveillance Systems</option>
  </>
)}

{industry === "Toys & Games" && (
  <>
    <option value="Action Figures">Action Figures</option>
    <option value="Board Games">Board Games</option>
    <option value="Dolls and Accessories">Dolls and Accessories</option>
    <option value="Educational Toys">Educational Toys</option>
    <option value="Electronic Toys">Electronic Toys</option>
    <option value="Games and Puzzles">Games and Puzzles</option>
    <option value="Outdoor Toys">Outdoor Toys</option>
    <option value="Soft Toys">Soft Toys</option>
  </>
)}
{industry === "Office & School" && (
  <>
    <option value="Art Supplies">Art Supplies</option>
    <option value="Educational Materials">Educational Materials</option>
    <option value="Ergonomic Furniture">Ergonomic Furniture</option>
    <option value="Office Equipment">Office Equipment</option>
    <option value="Office Furniture">Office Furniture</option>
    <option value="Paper Products">Paper Products</option>
    <option value="School Furniture">School Furniture</option>
    <option value="Stationery">Stationery</option>
  </>
)}

{industry === "Packaging, Paper & Plastic Products" && (
  <>
    <option value="Bottles and Containers">Bottles and Containers</option>
    <option value="Corrugated Boxes">Corrugated Boxes</option>
    <option value="Flexible Packaging">Flexible Packaging</option>
    <option value="Glass Packaging">Glass Packaging</option>
    <option value="Labeling and Coding">Labeling and Coding</option>
    <option value="Paper Bags">Paper Bags</option>
    <option value="Plastic Packaging">Plastic Packaging</option>
    <option value="Rigid Packaging">Rigid Packaging</option>
  </>
)}

{industry === "Printing & Publishing" && (
  <>
    <option value="Book Printing">Book Printing</option>
    <option value="Brochure Printing">Brochure Printing</option>
    <option value="Business Cards">Business Cards</option>
    <option value="Digital Printing">Digital Printing</option>
    <option value="Flex Printing">Flex Printing</option>
    <option value="Label Printing">Label Printing</option>
    <option value="Magazine Printing">Magazine Printing</option>
    <option value="Newspaper Printing">Newspaper Printing</option>
  </>
)}

{industry === "Retail & E-Retail" && (
  <>
    <option value="E-commerce Platforms">E-commerce Platforms</option>
    <option value="Fashion Retail">Fashion Retail</option>
    <option value="Food Retail">Food Retail</option>
    <option value="Home Decor Retail">Home Decor Retail</option>
    <option value="Online Marketplaces">Online Marketplaces</option>
    <option value="Retail Software">Retail Software</option>
    <option value="Supermarkets">Supermarkets</option>
    <option value="Wholesale Markets">Wholesale Markets</option>
  </>
)}

{industry === "Scientific & Laboratory" && (
  <>
    <option value="Analytical Instruments">Analytical Instruments</option>
    <option value="Biotechnology Equipment">Biotechnology Equipment</option>
    <option value="Chemicals and Reagents">Chemicals and Reagents</option>
    <option value="Laboratory Furniture">Laboratory Furniture</option>
    <option value="Laboratory Instruments">Laboratory Instruments</option>
    <option value="Medical Laboratory Equipment">Medical Laboratory Equipment</option>
    <option value="Microscopes">Microscopes</option>
    <option value="Scientific Software">Scientific Software</option>
  </>
)}

{industry === "Sports, Fitness & Entertainment" && (
  <>
    <option value="Fitness Equipment">Fitness Equipment</option>
    <option value="Game Tables">Game Tables</option>
    <option value="Gym Equipment">Gym Equipment</option>
    <option value="Musical Instruments">Musical Instruments</option>
    <option value="Outdoor Games">Outdoor Games</option>
    <option value="Playground Equipment">Playground Equipment</option>
    <option value="Sports Equipment">Sports Equipment</option>
    <option value="Yoga and Meditation Equipment">Yoga and Meditation Equipment</option>
  </>
)}

{industry === "Textile, Fabrics & Accessories" && (
  <>
    <option value="Apparel Fabrics">Apparel Fabrics</option>
    <option value="Cotton Fabrics">Cotton Fabrics</option>
    <option value="Embroidery Services">Embroidery Services</option>
    <option value="Fabric Dyeing">Fabric Dyeing</option>
    <option value="Fabric Printing">Fabric Printing</option>
    <option value="Fashion Accessories">Fashion Accessories</option>
    <option value="Knitted Fabrics">Knitted Fabrics</option>
    <option value="Woven Fabrics">Woven Fabrics</option>
  </>
)}





          </select>

          <label className="sellerform-label">Space</label>
          <input
            className="sellerform-input"
            type="text"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
          />

          <label className="sellerform-label">State</label>
          <select
            className="sellerform-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option disabled value="">Select State</option>
            <option value="Andhrapradesh">Andhra Pradesh</option>
            <option value="Arunachalpradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachalpradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya_pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamilnadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttarpradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Westbengal">West Bengal</option>
          </select>

          <label className="sellerform-label">District</label>
          <select
            className="sellerform-input"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option>Select District</option>

            {state === "Andhrapradesh" && (
              <>
                <option value="Anantapur">Anantapur</option>
                <option value="Chittoor">Chittoor</option>
                <option value="East Godavari">East Godavari</option>
                <option value="Guntur">Guntur</option>
                <option value="Krishna">Krishna</option>
                <option value="Kurnool">Kurnool</option>
                <option value="Prakasam">Prakasam</option>
                <option value="Sri Potti Sriramulu Nellore">
                  Sri Potti Sriramulu Nellore
                </option>
                <option value="Srikakulam">Srikakulam</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="Vizianagaram">Vizianagaram</option>
                <option value="West Godavari">West Godavari</option>
                <option value="YSR Kadapa">YSR Kadapa</option>
              </>
            )}

            {state === "Arunachalpradesh" && (
              <>
                <option value="Anjaw">Anjaw</option>
                <option value="Changlang">Changlang</option>
                <option value="Dibang Valley">Dibang Valley</option>
                <option value="East Kameng">East Kameng</option>
                <option value="East Siang">East Siang</option>
                <option value="Kamle">Kamle</option>
                <option value="Kra Daadi">Kra Daadi</option>
                <option value="Kurung Kumey">Kurung Kumey</option>
                <option value="Lepa Rada">Lepa Rada</option>
                <option value="Lohit">Lohit</option>
                <option value="Longding">Longding</option>
                <option value="Lower Dibang Valley">Lower Dibang Valley</option>
                <option value="Lower Siang">Lower Siang</option>
                <option value="Lower Subansiri">Lower Subansiri</option>
                <option value="Namsai">Namsai</option>
                <option value="Pakke Kessang">Pakke Kessang</option>
                <option value="Papum Pare">Papum Pare</option>
                <option value="Shi Yomi">Shi Yomi</option>
                <option value="Siang">Siang</option>
                <option value="Tawang">Tawang</option>
                <option value="Tirap">Tirap</option>
                <option value="Upper Siang">Upper Siang</option>
                <option value="Upper Subansiri">Upper Subansiri</option>
                <option value="West Kameng">West Kameng</option>
                <option value="West Siang">West Siang</option>
              </>
            )}

            {state === "Assam" && (
              <>
                <option value="Baksa">Baksa</option>
                <option value="Barpeta">Barpeta</option>
                <option value="Biswanath">Biswanath</option>
                <option value="Bongaigaon">Bongaigaon</option>
                <option value="Cachar">Cachar</option>
                <option value="Charaideo">Charaideo</option>
                <option value="Chirang">Chirang</option>
                <option value="Darrang">Darrang</option>
                <option value="Dhemaji">Dhemaji</option>
                <option value="Dhubri">Dhubri</option>
                <option value="Dibrugarh">Dibrugarh</option>
                <option value="Goalpara">Goalpara</option>
                <option value="Golaghat">Golaghat</option>
                <option value="Hailakandi">Hailakandi</option>
                <option value="Hojai">Hojai</option>
                <option value="Jorhat">Jorhat</option>
                <option value="Kamrup">Kamrup</option>
                <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
                <option value="Karbi Anglong">Karbi Anglong</option>
                <option value="Karimganj">Karimganj</option>
                <option value="Kokrajhar">Kokrajhar</option>
                <option value="Lakhimpur">Lakhimpur</option>
                <option value="Majuli">Majuli</option>
                <option value="Morigaon">Morigaon</option>
                <option value="Nagaon">Nagaon</option>
                <option value="Nalbari">Nalbari</option>
                <option value="Sivasagar">Sivasagar</option>
                <option value="Sonitpur">Sonitpur</option>
                <option value="South Salmara-Mankachar">
                  South Salmara-Mankachar
                </option>
                <option value="Tinsukia">Tinsukia</option>
                <option value="Udalguri">Udalguri</option>
                <option value="West Karbi Anglong">West Karbi Anglong</option>
              </>
            )}

            {state === "Bihar" && (
              <>
                <option value="Araria">Araria</option>
                <option value="Arwal">Arwal</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Banka">Banka</option>
                <option value="Begusarai">Begusarai</option>
                <option value="Bhagalpur">Bhagalpur</option>
                <option value="Bhojpur">Bhojpur</option>
                <option value="Buxar">Buxar</option>
                <option value="Darbhanga">Darbhanga</option>
                <option value="East Champaran">East Champaran</option>
                <option value="Gaya">Gaya</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Jamui">Jamui</option>
                <option value="Jehanabad">Jehanabad</option>
                <option value="Kaimur">Kaimur</option>
                <option value="Katihar">Katihar</option>
                <option value="Khagaria">Khagaria</option>
                <option value="Kishanganj">Kishanganj</option>
                <option value="Lakhisarai">Lakhisarai</option>
                <option value="Madhepura">Madhepura</option>
                <option value="Madhubani">Madhubani</option>
                <option value="Munger">Munger</option>
                <option value="Muzaffarpur">Muzaffarpur</option>
                <option value="Nalanda">Nalanda</option>
                <option value="Nawada">Nawada</option>
                <option value="Patna">Patna</option>
                <option value="Purnia">Purnia</option>
                <option value="Rohtas">Rohtas</option>
                <option value="Saharsa">Saharsa</option>
                <option value="Samastipur">Samastipur</option>
                <option value="Saran">Saran</option>
                <option value="Sheikhpura">Sheikhpura</option>
                <option value="Sheohar">Sheohar</option>
                <option value="Sitamarhi">Sitamarhi</option>
                <option value="Siwan">Siwan</option>
                <option value="Supaul">Supaul</option>
                <option value="Vaishali">Vaishali</option>
                <option value="West Champaran">West Champaran</option>
              </>
            )}

            {state === "Chhattisgarh" && (
              <>
                <option value="Balod">Balod</option>
                <option value="Baloda Bazar">Baloda Bazar</option>
                <option value="Balrampur">Balrampur</option>
                <option value="Bastar">Bastar</option>
                <option value="Bemetara">Bemetara</option>
                <option value="Bijapur">Bijapur</option>
                <option value="Bilaspur">Bilaspur</option>
                <option value="Dantewada">Dantewada</option>
                <option value="Dhamtari">Dhamtari</option>
                <option value="Durg">Durg</option>
                <option value="Gariaband">Gariaband</option>
                <option value="Gaurela-Pendra-Marwahi">
                  Gaurela-Pendra-Marwahi
                </option>
                <option value="Janjgir-Champa">Janjgir-Champa</option>
                <option value="Jashpur">Jashpur</option>
                <option value="Kabirdham">Kabirdham</option>
                <option value="Kanker">Kanker</option>
                <option value="Kondagaon">Kondagaon</option>
                <option value="Korba">Korba</option>
                <option value="Koriya">Koriya</option>
                <option value="Mahasamund">Mahasamund</option>
                <option value="Mungeli">Mungeli</option>
                <option value="Narayanpur">Narayanpur</option>
                <option value="Raigarh">Raigarh</option>
                <option value="Raipur">Raipur</option>
                <option value="Rajnandgaon">Rajnandgaon</option>
                <option value="Sukma">Sukma</option>
                <option value="Surajpur">Surajpur</option>
                <option value="Surguja">Surguja</option>
              </>
            )}

            {state === "Goa" && (
              <>
                <option value="North Goa">North Goa</option>
                <option value="South Goa">South Goa</option>
              </>
            )}

            {state === "Gujarat" && (
              <>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Amreli">Amreli</option>
                <option value="Anand">Anand</option>
                <option value="Aravalli">Aravalli</option>
                <option value="Banaskantha">Banaskantha</option>
                <option value="Bharuch">Bharuch</option>
                <option value="Bhavnagar">Bhavnagar</option>
                <option value="Botad">Botad</option>
                <option value="Chhota Udaipur">Chhota Udaipur</option>
                <option value="Dahod">Dahod</option>
                <option value="Dang">Dang</option>
                <option value="Devbhoomi Dwarka">Devbhoomi Dwarka</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Gir Somnath">Gir Somnath</option>
                <option value="Jamnagar">Jamnagar</option>
                <option value="Junagadh">Junagadh</option>
                <option value="Kheda">Kheda</option>
                <option value="Kutch">Kutch</option>
                <option value="Mahisagar">Mahisagar</option>
                <option value="Mehsana">Mehsana</option>
                <option value="Morbi">Morbi</option>
                <option value="Narmada">Narmada</option>
                <option value="Navsari">Navsari</option>
                <option value="Panchmahal">Panchmahal</option>
                <option value="Patan">Patan</option>
                <option value="Porbandar">Porbandar</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Sabarkantha">Sabarkantha</option>
                <option value="Surat">Surat</option>
                <option value="Surendranagar">Surendranagar</option>
                <option value="Tapi">Tapi</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Valsad">Valsad</option>
              </>
            )}

            {state === "Haryana" && (
              <>
                <option value="Ambala">Ambala</option>
                <option value="Bhiwani">Bhiwani</option>
                <option value="Charkhi Dadri">Charkhi Dadri</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Fatehabad">Fatehabad</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Hisar">Hisar</option>
                <option value="Jhajjar">Jhajjar</option>
                <option value="Jind">Jind</option>
                <option value="Kaithal">Kaithal</option>
                <option value="Karnal">Karnal</option>
                <option value="Kurukshetra">Kurukshetra</option>
                <option value="Mahendragarh">Mahendragarh</option>
                <option value="Nuh">Nuh</option>
                <option value="Palwal">Palwal</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Panipat">Panipat</option>
                <option value="Rewari">Rewari</option>
                <option value="Rohtak">Rohtak</option>
                <option value="Sirsa">Sirsa</option>
                <option value="Sonipat">Sonipat</option>
                <option value="Yamunanagar">Yamunanagar</option>
              </>
            )}

            {state === "Himachalpradesh" && (
              <>
                <option value="Bilaspur">Bilaspur</option>
                <option value="Chamba">Chamba</option>
                <option value="Hamirpur">Hamirpur</option>
                <option value="Kangra">Kangra</option>
                <option value="Kinnaur">Kinnaur</option>
                <option value="Kullu">Kullu</option>
                <option value="Lahaul and Spiti">Lahaul and Spiti</option>
                <option value="Mandi">Mandi</option>
                <option value="Shimla">Shimla</option>
                <option value="Sirmaur">Sirmaur</option>
                <option value="Solan">Solan</option>
                <option value="Una">Una</option>
              </>
            )}

            {state === "Jharkhand" && (
              <>
                <option value="Bokaro">Bokaro</option>
                <option value="Chatra">Chatra</option>
                <option value="Deoghar">Deoghar</option>
                <option value="Dhanbad">Dhanbad</option>
                <option value="Dumka">Dumka</option>
                <option value="East Singhbhum">East Singhbhum</option>
                <option value="Garhwa">Garhwa</option>
                <option value="Giridih">Giridih</option>
                <option value="Godda">Godda</option>
                <option value="Gumla">Gumla</option>
                <option value="Hazaribagh">Hazaribagh</option>
                <option value="Jamtara">Jamtara</option>
                <option value="Khunti">Khunti</option>
                <option value="Koderma">Koderma</option>
                <option value="Latehar">Latehar</option>
                <option value="Lohardaga">Lohardaga</option>
                <option value="Pakur">Pakur</option>
                <option value="Palamu">Palamu</option>
                <option value="Ramgarh">Ramgarh</option>
                <option value="Ranchi">Ranchi</option>
                <option value="Sahebganj">Sahebganj</option>
                <option value="Seraikela Kharsawan">Seraikela Kharsawan</option>
                <option value="Simdega">Simdega</option>
                <option value="West Singhbhum">West Singhbhum</option>
              </>
            )}

            {state === "Karnataka" && (
              <>
                <option value="Bagalkot">Bagalkot</option>
                <option value="Ballari">Ballari</option>
                <option value="Belagavi">Belagavi</option>
                <option value="Bengaluru Rural">Bengaluru Rural</option>
                <option value="Bengaluru Urban">Bengaluru Urban</option>
                <option value="Bidar">Bidar</option>
                <option value="Chamarajanagar">Chamarajanagar</option>
                <option value="Chikkaballapur">Chikkaballapur</option>
                <option value="Chikkamagaluru">Chikkamagaluru</option>
                <option value="Chitradurga">Chitradurga</option>
                <option value="Dakshina Kannada">Dakshina Kannada</option>
                <option value="Davanagere">Davanagere</option>
                <option value="Dharwad">Dharwad</option>
                <option value="Gadag">Gadag</option>
                <option value="Hassan">Hassan</option>
                <option value="Haveri">Haveri</option>
                <option value="Kalaburagi">Kalaburagi</option>
                <option value="Kodagu">Kodagu</option>
                <option value="Kolar">Kolar</option>
                <option value="Koppal">Koppal</option>
                <option value="Mandya">Mandya</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Raichur">Raichur</option>
                <option value="Ramanagara">Ramanagara</option>
                <option value="Shivamogga">Shivamogga</option>
                <option value="Tumakuru">Tumakuru</option>
                <option value="Udupi">Udupi</option>
                <option value="Uttara Kannada">Uttara Kannada</option>
                <option value="Vijayapura">Vijayapura</option>
                <option value="Yadgir">Yadgir</option>
              </>
            )}

            {state === "Kerala" && (
              <>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
              </>
            )}

            {state === "Madhya_pradesh" && (
              <>
                <option value="Agar Malwa">Agar Malwa</option>
                <option value="Alirajpur">Alirajpur</option>
                <option value="Anuppur">Anuppur</option>
                <option value="Ashoknagar">Ashoknagar</option>
                <option value="Balaghat">Balaghat</option>
                <option value="Barwani">Barwani</option>
                <option value="Betul">Betul</option>
                <option value="Bhind">Bhind</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Burhanpur">Burhanpur</option>
                <option value="Chhatarpur">Chhatarpur</option>
                <option value="Chhindwara">Chhindwara</option>
                <option value="Damoh">Damoh</option>
                <option value="Datia">Datia</option>
                <option value="Dewas">Dewas</option>
                <option value="Dhar">Dhar</option>
                <option value="Dindori">Dindori</option>
                <option value="Guna">Guna</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Harda">Harda</option>
                <option value="Hoshangabad">Hoshangabad</option>
                <option value="Indore">Indore</option>
                <option value="Jabalpur">Jabalpur</option>
                <option value="Jhabua">Jhabua</option>
                <option value="Katni">Katni</option>
                <option value="Khandwa">Khandwa</option>
                <option value="Khargone">Khargone</option>
                <option value="Mandla">Mandla</option>
                <option value="Mandsaur">Mandsaur</option>
                <option value="Morena">Morena</option>
                <option value="Narsinghpur">Narsinghpur</option>
                <option value="Neemuch">Neemuch</option>
                <option value="Panna">Panna</option>
                <option value="Raisen">Raisen</option>
                <option value="Rajgarh">Rajgarh</option>
                <option value="Ratlam">Ratlam</option>
                <option value="Rewa">Rewa</option>
                <option value="Sagar">Sagar</option>
                <option value="Satna">Satna</option>
                <option value="Sehore">Sehore</option>
                <option value="Seoni">Seoni</option>
                <option value="Shahdol">Shahdol</option>
                <option value="Shajapur">Shajapur</option>
                <option value="Sheopur">Sheopur</option>
                <option value="Shivpuri">Shivpuri</option>
                <option value="Sidhi">Sidhi</option>
                <option value="Singrauli">Singrauli</option>
                <option value="Tikamgarh">Tikamgarh</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Umaria">Umaria</option>
                <option value="Vidisha">Vidisha</option>
              </>
            )}

            {state === "Maharashtra" && (
              <>
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="Akola">Akola</option>
                <option value="Amravati">Amravati</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Beed">Beed</option>
                <option value="Bhandara">Bhandara</option>
                <option value="Buldhana">Buldhana</option>
                <option value="Chandrapur">Chandrapur</option>
                <option value="Dhule">Dhule</option>
                <option value="Gadchiroli">Gadchiroli</option>
                <option value="Gondia">Gondia</option>
                <option value="Hingoli">Hingoli</option>
                <option value="Jalgaon">Jalgaon</option>
                <option value="Jalna">Jalna</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Latur">Latur</option>
                <option value="Mumbai City">Mumbai City</option>
                <option value="Mumbai Suburban">Mumbai Suburban</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nanded">Nanded</option>
                <option value="Nandurbar">Nandurbar</option>
                <option value="Nashik">Nashik</option>
                <option value="Osmanabad">Osmanabad</option>
                <option value="Palghar">Palghar</option>
                <option value="Parbhani">Parbhani</option>
                <option value="Pune">Pune</option>
                <option value="Raigad">Raigad</option>
                <option value="Ratnagiri">Ratnagiri</option>
                <option value="Sangli">Sangli</option>
                <option value="Satara">Satara</option>
                <option value="Sindhudurg">Sindhudurg</option>
                <option value="Solapur">Solapur</option>
                <option value="Thane">Thane</option>
                <option value="Wardha">Wardha</option>
                <option value="Washim">Washim</option>
                <option value="Yavatmal">Yavatmal</option>
              </>
            )}

            {state === "Manipur" && (
              <>
                <option value="Bishnupur">Bishnupur</option>
                <option value="Chandel">Chandel</option>
                <option value="Churachandpur">Churachandpur</option>
                <option value="Imphal East">Imphal East</option>
                <option value="Imphal West">Imphal West</option>
                <option value="Jiribam">Jiribam</option>
                <option value="Kakching">Kakching</option>
                <option value="Kamjong">Kamjong</option>
                <option value="Kangpokpi">Kangpokpi</option>
                <option value="Noney">Noney</option>
                <option value="Pherzawl">Pherzawl</option>
                <option value="Senapati">Senapati</option>
                <option value="Tamenglong">Tamenglong</option>
                <option value="Tengnoupal">Tengnoupal</option>
                <option value="Thoubal">Thoubal</option>
                <option value="Ukhrul">Ukhrul</option>
              </>
            )}

            {state === "Meghalaya" && (
              <>
                <option value="East Garo Hills">East Garo Hills</option>
                <option value="East Jaintia Hills">East Jaintia Hills</option>
                <option value="East Khasi Hills">East Khasi Hills</option>
                <option value="North Garo Hills">North Garo Hills</option>
                <option value="Ri Bhoi">Ri Bhoi</option>
                <option value="South Garo Hills">South Garo Hills</option>
                <option value="South West Garo Hills">
                  South West Garo Hills
                </option>
                <option value="South West Khasi Hills">
                  South West Khasi Hills
                </option>
                <option value="West Garo Hills">West Garo Hills</option>
                <option value="West Jaintia Hills">West Jaintia Hills</option>
                <option value="West Khasi Hills">West Khasi Hills</option>
              </>
            )}

            {state === "Mizoram" && (
              <>
                <option value="Aizawl">Aizawl</option>
                <option value="Champhai">Champhai</option>
                <option value="Kolasib">Kolasib</option>
                <option value="Lawngtlai">Lawngtlai</option>
                <option value="Lunglei">Lunglei</option>
                <option value="Mamit">Mamit</option>
                <option value="Saiha">Saiha</option>
                <option value="Serchhip">Serchhip</option>
              </>
            )}

            {state === "Nagaland" && (
              <>
                <option value="Dimapur">Dimapur</option>
                <option value="Kiphire">Kiphire</option>
                <option value="Kohima">Kohima</option>
                <option value="Longleng">Longleng</option>
                <option value="Mokokchung">Mokokchung</option>
                <option value="Mon">Mon</option>
                <option value="Peren">Peren</option>
                <option value="Phek">Phek</option>
                <option value="Tuensang">Tuensang</option>
                <option value="Wokha">Wokha</option>
                <option value="Zunheboto">Zunheboto</option>
              </>
            )}

            {state === "Odisha" && (
              <>
                <option value="Angul">Angul</option>
                <option value="Balangir">Balangir</option>
                <option value="Balasore">Balasore</option>
                <option value="Bargarh">Bargarh</option>
                <option value="Bhadrak">Bhadrak</option>
                <option value="Boudh">Boudh</option>
                <option value="Cuttack">Cuttack</option>
                <option value="Deogarh">Deogarh</option>
                <option value="Dhenkanal">Dhenkanal</option>
                <option value="Gajapati">Gajapati</option>
                <option value="Ganjam">Ganjam</option>
                <option value="Jagatsinghpur">Jagatsinghpur</option>
                <option value="Jajpur">Jajpur</option>
                <option value="Jharsuguda">Jharsuguda</option>
                <option value="Kalahandi">Kalahandi</option>
                <option value="Kandhamal">Kandhamal</option>
                <option value="Kendrapara">Kendrapara</option>
                <option value="Kendujhar">Kendujhar</option>
                <option value="Khordha">Khordha</option>
                <option value="Koraput">Koraput</option>
                <option value="Malkangiri">Malkangiri</option>
                <option value="Mayurbhanj">Mayurbhanj</option>
                <option value="Nabarangpur">Nabarangpur</option>
                <option value="Nayagarh">Nayagarh</option>
                <option value="Nuapada">Nuapada</option>
                <option value="Puri">Puri</option>
                <option value="Rayagada">Rayagada</option>
                <option value="Sambalpur">Sambalpur</option>
                <option value="Subarnapur">Subarnapur</option>
                <option value="Sundargarh">Sundargarh</option>
              </>
            )}

            {state === "Punjab" && (
              <>
                <option value="Amritsar">Amritsar</option>
                <option value="Barnala">Barnala</option>
                <option value="Bathinda">Bathinda</option>
                <option value="Faridkot">Faridkot</option>
                <option value="Fatehgarh Sahib">Fatehgarh Sahib</option>
                <option value="Fazilka">Fazilka</option>
                <option value="Ferozepur">Ferozepur</option>
                <option value="Gurdaspur">Gurdaspur</option>
                <option value="Hoshiarpur">Hoshiarpur</option>
                <option value="Jalandhar">Jalandhar</option>
                <option value="Kapurthala">Kapurthala</option>
                <option value="Ludhiana">Ludhiana</option>
                <option value="Mansa">Mansa</option>
                <option value="Moga">Moga</option>
                <option value="Pathankot">Pathankot</option>
                <option value="Patiala">Patiala</option>
                <option value="Rupnagar">Rupnagar</option>
                <option value="Sangrur">Sangrur</option>
                <option value="SAS Nagar">SAS Nagar</option>
                <option value="Shaheed Bhagat Singh Nagar">
                  Shaheed Bhagat Singh Nagar
                </option>
                <option value="Sri Muktsar Sahib">Sri Muktsar Sahib</option>
                <option value="Tarn Taran">Tarn Taran</option>
              </>
            )}

            {state === "Rajasthan" && (
              <>
                <option value="Ajmer">Ajmer</option>
                <option value="Alwar">Alwar</option>
                <option value="Banswara">Banswara</option>
                <option value="Baran">Baran</option>
                <option value="Barmer">Barmer</option>
                <option value="Bharatpur">Bharatpur</option>
                <option value="Bhilwara">Bhilwara</option>
                <option value="Bikaner">Bikaner</option>
                <option value="Bundi">Bundi</option>
                <option value="Chittorgarh">Chittorgarh</option>
                <option value="Churu">Churu</option>
                <option value="Dausa">Dausa</option>
                <option value="Dholpur">Dholpur</option>
                <option value="Dungarpur">Dungarpur</option>
                <option value="Hanumangarh">Hanumangarh</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Jaisalmer">Jaisalmer</option>
                <option value="Jalore">Jalore</option>
                <option value="Jhalawar">Jhalawar</option>
                <option value="Jhunjhunu">Jhunjhunu</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Karauli">Karauli</option>
                <option value="Kota">Kota</option>
                <option value="Nagaur">Nagaur</option>
                <option value="Pali">Pali</option>
                <option value="Pratapgarh">Pratapgarh</option>
                <option value="Rajsamand">Rajsamand</option>
                <option value="Sawai Madhopur">Sawai Madhopur</option>
                <option value="Sikar">Sikar</option>
                <option value="Sirohi">Sirohi</option>
                <option value="Sri Ganganagar">Sri Ganganagar</option>
                <option value="Tonk">Tonk</option>
                <option value="Udaipur">Udaipur</option>
              </>
            )}

            {state === "Sikkim" && (
              <>
                <option value="East Sikkim">East Sikkim</option>
                <option value="North Sikkim">North Sikkim</option>
                <option value="South Sikkim">South Sikkim</option>
                <option value="West Sikkim">West Sikkim</option>
              </>
            )}

            {state === "Tamilnadu" && (
              <>
                <option value="Ariyalur">Ariyalur</option>
                <option value="Chengalpattu">Chengalpattu</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Cuddalore">Cuddalore</option>
                <option value="Dharmapuri">Dharmapuri</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Erode">Erode</option>
                <option value="Kallakurichi">Kallakurichi</option>
                <option value="Kanchipuram">Kanchipuram</option>
                <option value="Kanyakumari">Kanyakumari</option>
                <option value="Karur">Karur</option>
                <option value="Krishnagiri">Krishnagiri</option>
                <option value="Madurai">Madurai</option>
                <option value="Nagapattinam">Nagapattinam</option>
                <option value="Namakkal">Namakkal</option>
                <option value="Nilgiris">Nilgiris</option>
                <option value="Perambalur">Perambalur</option>
                <option value="Pudukkottai">Pudukkottai</option>
                <option value="Ramanathapuram">Ramanathapuram</option>
                <option value="Ranipet">Ranipet</option>
                <option value="Salem">Salem</option>
                <option value="Sivaganga">Sivaganga</option>
                <option value="Tenkasi">Tenkasi</option>
                <option value="Thanjavur">Thanjavur</option>
                <option value="Theni">Theni</option>
                <option value="Thoothukudi">Thoothukudi</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Tirupathur">Tirupathur</option>
                <option value="Tiruppur">Tiruppur</option>
                <option value="Tiruvallur">Tiruvallur</option>
                <option value="Tiruvannamalai">Tiruvannamalai</option>
                <option value="Tiruvarur">Tiruvarur</option>
                <option value="Vellore">Vellore</option>
                <option value="Viluppuram">Viluppuram</option>
                <option value="Virudhunagar">Virudhunagar</option>
              </>
            )}

            {state === "Telangana" && (
              <>
                <option value="Adilabad">Adilabad</option>
                <option value="Bhadradri Kothagudem">
                  Bhadradri Kothagudem
                </option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Jagtial">Jagtial</option>
                <option value="Jangaon">Jangaon</option>
                <option value="Jayashankar Bhupalpally">
                  Jayashankar Bhupalpally
                </option>
                <option value="Jogulamba Gadwal">Jogulamba Gadwal</option>
                <option value="Kamareddy">Kamareddy</option>
                <option value="Karimnagar">Karimnagar</option>
                <option value="Khammam">Khammam</option>
                <option value="Komaram Bheem Asifabad">
                  Komaram Bheem Asifabad
                </option>
                <option value="Mahabubabad">Mahabubabad</option>
                <option value="Mahabubnagar">Mahabubnagar</option>
                <option value="Mancherial">Mancherial</option>
                <option value="Medak">Medak</option>
                <option value="Medchal Malkajgiri">Medchal Malkajgiri</option>
                <option value="Mulugu">Mulugu</option>
                <option value="Nagarkurnool">Nagarkurnool</option>
                <option value="Nalgonda">Nalgonda</option>
                <option value="Narayanpet">Narayanpet</option>
                <option value="Nirmal">Nirmal</option>
                <option value="Nizamabad">Nizamabad</option>
                <option value="Peddapalli">Peddapalli</option>
                <option value="Rajanna Sircilla">Rajanna Sircilla</option>
                <option value="Rangareddy">Rangareddy</option>
                <option value="Sangareddy">Sangareddy</option>
                <option value="Siddipet">Siddipet</option>
                <option value="Suryapet">Suryapet</option>
                <option value="Vikarabad">Vikarabad</option>
                <option value="Wanaparthy">Wanaparthy</option>
                <option value="Warangal Rural">Warangal Rural</option>
                <option value="Warangal Urban">Warangal Urban</option>
                <option value="Yadadri Bhuvanagiri">Yadadri Bhuvanagiri</option>
              </>
            )}

            {state === "Tripura" && (
              <>
                <option value="Dhalai">Dhalai</option>
                <option value="Gomati">Gomati</option>
                <option value="Khowai">Khowai</option>
                <option value="North Tripura">North Tripura</option>
                <option value="Sepahijala">Sepahijala</option>
                <option value="South Tripura">South Tripura</option>
                <option value="Unakoti">Unakoti</option>
                <option value="West Tripura">West Tripura</option>
              </>
            )}

            {state === "Uttarpradesh" && (
              <>
                <option value="Agra">Agra</option>
                <option value="Aligarh">Aligarh</option>
                <option value="Ambedkar Nagar">Ambedkar Nagar</option>
                <option value="Amethi">Amethi</option>
                <option value="Amroha">Amroha</option>
                <option value="Auraiya">Auraiya</option>
                <option value="Ayodhya">Ayodhya</option>
                <option value="Azamgarh">Azamgarh</option>
                <option value="Badaun">Badaun</option>
                <option value="Baghpat">Baghpat</option>
                <option value="Bahraich">Bahraich</option>
                <option value="Ballia">Ballia</option>
                <option value="Balrampur">Balrampur</option>
                <option value="Banda">Banda</option>
                <option value="Barabanki">Barabanki</option>
                <option value="Bareilly">Bareilly</option>
                <option value="Basti">Basti</option>
                <option value="Bhadohi">Bhadohi</option>
                <option value="Bijnor">Bijnor</option>
                <option value="Bulandshahr">Bulandshahr</option>
                <option value="Chandauli">Chandauli</option>
                <option value="Chitrakoot">Chitrakoot</option>
                <option value="Deoria">Deoria</option>
                <option value="Etah">Etah</option>
                <option value="Etawah">Etawah</option>
                <option value="Farrukhabad">Farrukhabad</option>
                <option value="Fatehpur">Fatehpur</option>
                <option value="Firozabad">Firozabad</option>
                <option value="Gautam Buddha Nagar">Gautam Buddha Nagar</option>
              </>
            )}

            {state === "Uttarakhand" && (
              <>
                <option value="Almora">Almora</option>
                <option value="Bageshwar">Bageshwar</option>
                <option value="Chamoli">Chamoli</option>
                <option value="Champawat">Champawat</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Haridwar">Haridwar</option>
                <option value="Nainital">Nainital</option>
                <option value="Pauri Garhwal">Pauri Garhwal</option>
                <option value="Pithoragarh">Pithoragarh</option>
                <option value="Rudraprayag">Rudraprayag</option>
                <option value="Tehri Garhwal">Tehri Garhwal</option>
                <option value="Udham Singh Nagar">Udham Singh Nagar</option>
                <option value="Uttarkashi">Uttarkashi</option>
              </>
            )}
            {state === "Westbengal" && (
              <>
                <option value="Alipurduar">Alipurduar</option>
                <option value="Bankura">Bankura</option>
                <option value="Birbhum">Birbhum</option>
                <option value="Burdwan">Burdwan</option>
                <option value="Cooch Behar">Cooch Behar</option>
                <option value="Dakshin Dinajpur">Dakshin Dinajpur</option>
                <option value="Darjeeling">Darjeeling</option>
                <option value="Hooghly">Hooghly</option>
                <option value="Howrah">Howrah</option>
                <option value="Jalpaiguri">Jalpaiguri</option>
                <option value="Jhargram">Jhargram</option>
                <option value="Kalimpong">Kalimpong</option>
                <option value="Koch Bihar">Koch Bihar</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Malda">Malda</option>
                <option value="Murshidabad">Murshidabad</option>
                <option value="Nadia">Nadia</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="Purba Bardhaman">Purba Bardhaman</option>
                <option value="Purulia">Purulia</option>
                <option value="South 24 Parganas">South 24 Parganas</option>
                <option value="West Bardhaman">West Bardhaman</option>
              </>
            )}
          </select>

          <div className="checkbox-group">
            <label>Role:</label>
            <div className="checkbox-set">
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
              <label>Dealer</label>
            </div>

            <div className="checkbox-set">
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
              <label>Franchise</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.wholesaler}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    wholesaler: e.target.checked,
                  }))
                }
              />
              <label>Wholesaler</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.stockist}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    stockist: e.target.checked,
                  }))
                }
              />
              <label>Stockist</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.distributor}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    distributor: e.target.checked,
                  }))
                }
              />
              <label>Distributor</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.agency}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    agency: e.target.checked,
                  }))
                }
              />
              <label>Agency</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.retailer}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    retailer: e.target.checked,
                  }))
                }
              />
              <label>Retailer</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.BusinessBuyOuts}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    BusinessBuyOuts: e.target.checked,
                  }))
                }
              />
              <label>Business Buy Outs</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.InvestPartners}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    InvestPartners: e.target.checked,
                  }))
                }
              />
              <label>Invest Partners</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.SharePartners}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    SharePartners: e.target.checked,
                  }))
                }
              />
              <label>Share Partners</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.WorkingPartners}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    WorkingPartners: e.target.checked,
                  }))
                }
              />
              <label>Working Partners</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.ShareBuyers}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    ShareBuyers: e.target.checked,
                  }))
                }
              />
              <label>Share Buyers</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.SeedFunders}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    SeedFunders: e.target.checked,
                  }))
                }
              />
              <label>Seed Funders</label>
            </div>

            <div className="checkbox-set">
              <input
                type="checkbox"
                checked={role.VentureCapitals}
                onChange={(e) =>
                  setRole((prevRole) => ({
                    ...prevRole,
                    VentureCapitals: e.target.checked,
                  }))
                }
              />
              <label>Venture Capitals </label>
            </div>
          </div>

          <label>Revenue</label>
          <input
            type="text"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />

          <label>Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <label>Investment Range</label>
          <div className="investment-range">
            Min Value{" "}
            <input
              type="text"
              value={investmentMin}
              onChange={(e) => setInvestmentMin(e.target.value)}
            />{" "}
            - Max Value{" "}
            <input
              type="text"
              value={investmentMax}
              onChange={(e) => setInvestmentMax(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading || submit}>
            {loading ? "Submitting..." : submit ? "Form Submitted" : "Submit"}
          </button>
          <div className="centered-text">
            {submit ? "Thank you for filling out the form!" : err}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
