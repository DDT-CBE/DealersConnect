import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dealer = () => {
  const { id } = useParams();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        setLoading(true);
        console.log(id);

        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/dealers/${id}`);
        console.log(response.data);

        setDealers(response.data);
      } catch (err) {
        setError('Failed to fetch dealers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading dealers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dealers</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {dealers.length > 0 ? (
          <ul className="space-y-4">
            {dealers.map((dealer) => (
              <li
                key={dealer._id}
                onClick={() => navigate(`/subdealers/${dealer._id}`)}
                className="p-4 bg-gray-50 hover:bg-blue-100 rounded-lg cursor-pointer flex justify-between items-center shadow transition-all duration-300"
              >
                <span className="text-lg font-medium text-gray-700">{dealer.name}</span>
                <span className="text-blue-500 font-semibold text-sm">View Subdealers</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No dealers available.</p>
        )}
      </div>
    </div>
  );
};

export default Dealer;
