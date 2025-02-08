import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import "./buyercontrol.css";
import { Loader } from "lucide-react";
import UserCard from "../UserCard";
import { Nav } from "../Nav";
const APIURL = process.env.REACT_APP_API_URL;

const Buyercontrol = () => {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBuyerId, setActiveBuyerId] = useState(null); // State to track which buyer's "More" section is open
  const [openModal, setOpenModal] = useState(null);



  // Fetch user data
  const handleFetch = () => {
    axios
      .get(`${APIURL}api/getbuyerrequest`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        setLoading(false); // Set loading false once data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Handle approval of user data
  const approveHandler = (id, currentApproveStatus) => {
    // Toggle the approve status
    const newApproveStatus = !currentApproveStatus;

    // Update the user approval status in the backend
    axios
      .put(`${APIURL}api/approvebuyer/${id}`, { approve: newApproveStatus })
      .then((res) => {
        console.log(res.data);

        // Update the state to reflect the change
        const updatedUsers = userdata.map((user) =>
          user._id === id ? { ...user, approve: newApproveStatus } : user
        );
        setUserData(updatedUsers);
      })
      .catch((err) => console.log(err));
  };

  const toggleBtnMore = (buyerId) => {
    // Toggle the activeBuyerId; if the same ID is clicked again, close it
    setActiveBuyerId(activeBuyerId === buyerId ? null : buyerId);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen w-screen">
        <Loader className="w-14 h-14 animate-spin" color="#000000" />
      </div>
    ); // Show loading indicator while data is being fetched
  }

  // Filter to show only users with approve: false
  const filteredUsers = userdata.filter((user) => user.approve === false);
  return (
    <Fragment>

<Nav />

      {filteredUsers.length === 0 ? (

        <section class="bg-white dark:bg-gray-900 ">
          <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div class="flex flex-col items-center max-w-sm mx-auto text-center">
              <p class="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </p>
              <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                Page not found
              </h1>
              <p class="mt-4 text-gray-500 dark:text-gray-400">
                All approvals have been granted. No approvals pending.
              </p>

              <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-black transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800  hover:bg-gray-100 dark:text-gray-200 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span className="text-black">
                    {" "}
                    <a href="/"> Go back </a>
                  </span>
                </button>

                <button class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  <a href="/"> Take me home</a>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <UserCard data={filteredUsers} approveHandler={approveHandler} />
      )}
    </Fragment>
  );
};

export default Buyercontrol;
