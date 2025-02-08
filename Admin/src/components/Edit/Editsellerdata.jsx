import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Edit from "./Editseller";
import Search from "./Search";
import { useSearchParams } from "react-router-dom";
import { Nav } from "../Nav";
import { PhoneIncoming } from "lucide-react";
import { Loader } from "lucide-react";

const APIURL = process.env.REACT_APP_API_URL;

const Editsellerdata = () => {
  const [buyerdata, setBuyerData] = useState([]);
  const [searchparams] = useSearchParams();
  const [err, setErr] = useState(null); // To store error messages
  const [loading, setLoading] = useState(true);

  // Fetch buyer data
  const getSellerdata = () => {
    axios
      .get(`${APIURL}api/getsellerdata?` + searchparams)
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No user found"); // Set the message if no users are found
        } else {
          console.log(res.data);
          setBuyerData(res.data);
          setLoading(false)
        }
      })
      .catch((err) => setErr(err.response.data.message || "An error occurred"));
  };

  // Delete buyer data
  const deleteHandler = (id) => {
    axios
      .delete(`${APIURL}api/removesellerregister/${id}`)
      .then((result) => {
        console.log(result);
        // Remove buyer from state after deletion
        setBuyerData((prevData) =>
          prevData.filter((buyer) => buyer._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  // Only fetch data once on component mount
  useEffect(() => {
    getSellerdata();
  }, [searchparams]); // Empty dependency array ensures it runs only once

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen w-screen">
        <Loader className="w-14 h-14 animate-spin" color="#000000" />
      </div>
    ); // Show loading indicator while data is being fetched
  }

  return (
    <Fragment>
      <Nav />

      <div className="buyer-container">
        {/* {buyerdata.map((data, index) => (
          <div className="buyer-card" key={index}>
            <div className="buyer-id">ID: {data._id}</div>
            <div className="buyer-name">Name: {data.name}</div>
            <div className="buyer-phone">
              Phone: {data.numberhide ? "You need to pay" : data.phone}
            </div>
            <Edit data={data} />
            <button onClick={() => deleteHandler(data._id)}>Delete</button>
          </div>
        ))} */}

        {buyerdata.map((data, index) => (
          <a
            href="#"
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
          >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div key={index} className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {data.name}
                </h3>
              </div>

              <div className="hidden sm:block sm:shrink-0">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  className="size-16 rounded-lg object-cover shadow-xs"
                />
              </div>
            </div>

            <dl className="mt-6 flex gap-4 sm:gap-6">
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">
                  <PhoneIncoming color="#000000" />
                </dt>
                {/* <dd className="text-xs text-gray-500">
                    <IdCard color="#000000" />
                  </dd> */}
              </div>

              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">
                  {data.numberhide ? "You need to pay" : data.phone}
                </dt>
                {/* <dd className="text-xs text-gray-500">{data._id}</dd> */}
              </div>
            </dl>

            <dl className="mt-6 flex gap-4 sm:gap-6">
              <Edit data={data} />

              <button
                onClick={() => deleteHandler(data._id)}
                className="px-4 py-2 border rounded text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300 hover:bg-gray-100"
              >
                Delete
              </button>
            </dl>
          </a>
        ))}
      </div>
    </Fragment>
  );
};

export default Editsellerdata;
