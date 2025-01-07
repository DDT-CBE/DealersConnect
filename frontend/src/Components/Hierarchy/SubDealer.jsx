import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SubDealer = () => {
  const { id } = useParams();
  const [subDealers, setSubDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubDealers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/subdealers/${id}`);
        setSubDealers(response.data);
        console.log(response.data); // Debugging: log fetched data
      } catch (err) {
        setError('Failed to fetch sub-dealers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubDealers();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading sub-dealers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sub Dealers</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {subDealers.length > 0 ? (
          <ul className="space-y-4">
            {subDealers.map((subDealer) => (
              <li
                key={subDealer._id}
                className="p-4 bg-gray-50 hover:bg-green-100 rounded-lg flex items-center justify-between shadow transition-all duration-300"
              >
                <span className="text-lg font-medium text-gray-700">{subDealer.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No sub-dealers found.</p>
        )}
      </div>
    </div>
  );
};

export default SubDealer;
