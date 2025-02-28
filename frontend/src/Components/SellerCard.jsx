import { useState } from "react";

const SellerCard = ({ sellers }) => {
  const [openModal, setOpenModal] = useState(null);

  const toggleModal = (id) => {
    setOpenModal(openModal === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sellers.map((data, index) => (
        <a key={index}
        href="#"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{data.companyname}</h3>
            <dl className="mt-6 flex gap-4 sm:gap-6">
            <dt className="text-sm font-medium text-gray-600">
              <p className="text-sm text-gray-600">{data.title}</p>
            </dt>

           
              <dt className="text-sm font-medium text-gray-600">
              <p className="text-sm text-gray-500">{data.description}</p>
              </dt>
           
          </dl>
            
        
          </div>

          <dl className="mt-6 flex gap-4 sm:gap-6">
            <button
              onClick={() => setOpenModal(data._id)}
              className="px-4 py-2 border rounded text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6   hover:bg-gray-100"
            >
              View More
            </button>

           
          </dl>

          {openModal === data._id && (
            <div className="mt-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {data.title}
                </h2>
                <p className="text-gray-600 mb-4">{data.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Company Name
                    </label>
                    <p className="text-gray-600">{data.companyname}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Brand Name
                    </label>
                    <p className="text-gray-600">{data.brandname}</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Industry
                    </label>
                    <p className="text-gray-600">{data.industry}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Category
                    </label>
                    <p className="text-gray-600">{data.category}</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Type
                    </label>
                    <p className="text-gray-600">{data.seekerType}</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Investment Range
                    </label>
                    <p className="text-gray-600">
                      ₹{data.investmentminimum} - ₹{data.investmentmaximum}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Revenue
                    </label>
                    <p className="text-gray-600">₹{data.revenue}</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Space Required
                    </label>
                    <p className="text-gray-600">{data.space} sq.ft</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Royality
                    </label>
                    <p className="text-gray-600">{data.royality}</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      State
                    </label>
                    <p className="text-gray-600">{data.state || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      District
                    </label>
                    <p className="text-gray-600">{data.district || "N/A"}</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Number Hidden
                    </label>
                    <p className="text-gray-600">
                      {data.numberhide ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <h3 className="mt-4 font-semibold text-gray-700">Roles</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.keys(data.role).map((role) => (
                    <label key={role} className="flex items-center space-x-2">
                      <input type="checkbox" checked={data.role[role]} readOnly />
                      <span>{role.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>

                <button
                  className="mt-4 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-200 w-full"
                  onClick={() => setOpenModal(null)}
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

export default SellerCard;
