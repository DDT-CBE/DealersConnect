import { useState } from "react";

const UserCard = ({ data, approveHandler }) => {
  const [openModal, setOpenModal] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((user) => (
        <a
          href="#"
          className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
        >
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {user.name}
            </h3>
          </div>
          <dl className="mt-6 flex gap-4 sm:gap-6">
            <dt className="text-sm font-medium text-gray-600">
              <p className="text-sm text-gray-600">{user.category}</p>
            </dt>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">
                <p className="text-sm text-gray-500">{user.industry}</p>
              </dt>
            </div>
          </dl>
         

          <dl className="mt-6 flex gap-4 sm:gap-6">
            <button
              onClick={() => setOpenModal(user._id)}
              className="px-4 py-2 border rounded text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300 hover:bg-gray-100"
            >
              View More
            </button>

            <button
              onClick={() => approveHandler(user._id, user.approve)}
              className="px-4 py-2 border rounded text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6  dark:text-gray-300 hover:bg-gray-100"
            >
              Approve
            </button>
          </dl>

          {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{user.title}</h2>
            <p className="text-gray-600">{user.description}</p>
            <hr className="my-3" />

            {/* Grid Layout for Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Industry</label>
                <p className="text-gray-600">{user.industry}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Category</label>
                <p className="text-gray-600">{user.category}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">State</label>
                <p className="text-gray-600">{user.state}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">District</label>
                <p className="text-gray-600">{user.district}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Space Required</label>
                <p className="text-gray-600">{user.space} sq.ft</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Revenue</label>
                <p className="text-gray-600">₹{user.revenue} / month</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Investment Range</label>
                <p className="text-gray-600">₹{user.investmentrange.min} - ₹{user.investmentrange.max}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Duration</label>
                <p className="text-gray-600">{user.duration}</p>
              </div>
            </div>

            {/* Roles Section */}
            <h3 className="mt-4 font-semibold text-gray-700">Roles</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.keys(user.role).map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input type="checkbox" checked={user.role[role]} readOnly />
                  <span>{role.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>

            {/* Phone Number Section */}
            {user.numberhide ? (
              <p className="mt-4 text-gray-600 italic">Phone Number Hidden</p>
            ) : (
              <p className="mt-4 text-gray-700 font-semibold">Phone: {user.phone.$numberLong}</p>
            )}

            {/* Close Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

        </a>
      ))}
    </div>
  );
};

export default UserCard;
