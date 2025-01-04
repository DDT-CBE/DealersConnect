import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2";

const SellerPageView = () => {
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/seller/${id}`
        );
        setSellerData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch seller data");
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-10">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-10">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  const roles = sellerData?.role
    ? Object.keys(sellerData.role).filter((key) => sellerData.role[key])
    : [];

  return (
    <Fragment>
      <Nav2 />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
        <h1 className="text-3xl font-bold text-red-500 mb-6">{sellerData.companyname} Details</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {sellerData.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Industry:</strong> {sellerData.industry}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Category:</strong> {sellerData.category}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Roles:</strong>
                {roles.length > 0 ? roles.join(", ") : "No Roles Selected"}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Investment Range:</strong>{" "}
                {sellerData.investmentminimum} - {sellerData.investmentmaximum}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Description:</strong> {sellerData.description}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Additional Information
            </h3>
            <p className="text-lg font-medium text-gray-700">
              <strong>Company Name:</strong> {sellerData.companyname}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Brand Name:</strong> {sellerData.brandname}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Product/Service:</strong> {sellerData.product}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Revenue:</strong> {sellerData.revenue}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Space Required:</strong> {sellerData.space}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>State:</strong> {sellerData.state}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>District:</strong> {sellerData.district}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Royality:</strong> {sellerData.royality}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Address:</strong> {sellerData.address}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SellerPageView;
