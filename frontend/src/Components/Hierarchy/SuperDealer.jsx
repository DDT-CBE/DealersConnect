import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuperDealer = () => {
  const [superDealers, setSuperDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuperDealers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/superdealers`);
        setSuperDealers(response.data);
        console.log(response.data); // Debugging: log fetched data
      } catch (err) {
        console.error(err);
        setError('Failed to fetch super dealers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperDealers();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading super dealers...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Super Dealers</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {superDealers.length > 0 ? (
            superDealers.map((superDealer) => (
              <li
                key={superDealer._id}
                onClick={() => navigate(`/dealers/${superDealer._id}`)}
                className="p-4 bg-gray-50 hover:bg-blue-100 rounded-lg cursor-pointer flex justify-between items-center shadow transition-all duration-300"
              >
                <span className="text-lg font-medium text-gray-700">{superDealer.name}</span>
                <span className="text-blue-500 font-semibold text-sm">View Dealers</span>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No super dealers found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SuperDealer;
