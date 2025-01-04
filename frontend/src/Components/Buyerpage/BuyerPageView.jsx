import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav2 from "../Nav2/Nav2"

const BuyerPageView = () => {
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchBuyerData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/buyer/${id}`
        );
        setBuyerData(response.data); // Store the fetched data in the state
        console.log(response.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch buyer data");
        setLoading(false);
      }
    };

    fetchBuyerData();
  }, [id]); // Re-run the effect when `id` changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-20">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-20">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  // Safely check if role exists in buyerData before rendering
  const roles = buyerData?.role
    ? Object.keys(buyerData.role).filter((key) => buyerData.role[key])
    : [];

  return (
    <Fragment>
<Nav2 />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Business Seeker Details</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {buyerData.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>ID:</strong> {buyerData._id}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Title:</strong> {buyerData.title}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Industry:</strong> {buyerData.industry}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Category:</strong> {buyerData.category}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Investment Range:</strong>{" "}
                {buyerData.investmentrange.min} -{" "}
                {buyerData.investmentrange.max}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Description:</strong> {buyerData.description}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Roles:</strong>
                {roles.length > 0 ? roles.join(", ") : "No Roles Selected"}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Additional Information
            </h3>
            <p className="text-lg font-medium text-gray-700">
              <strong>Space Available:</strong> {buyerData.space}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>State:</strong> {buyerData.state}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>District:</strong> {buyerData.district}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Revenue:</strong> {buyerData.revenue}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Start Duration:</strong> {buyerData.duration}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BuyerPageView;
