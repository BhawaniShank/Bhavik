import React from "react";
import { FaTshirt, FaMitten, FaSocks } from 'react-icons/fa';
import { GiTrousers } from 'react-icons/gi';
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

const UserDetails = () => {
  const userData = {
    address: 'Delhi 345',
    businessName: 'Lorem Textiles',
    mobileNo: '1234567890',
    joiningDate: '01-01-2020',
    totalSold: 3900,
    totalMargin: '5%',
    totalItemsSold: 500,
    image: 'https://picsum.photos/200',
    QrImage: 'https://picsum.photos/300'
  };

  const Olddata = [
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    { date: '12/11/25', amount: 500 },
    
  ];

  const clothesData = [
    { icon: <GiTrousers className="mr-2" />, name: 'Pant', sold: 100 },
    { icon: <FaTshirt className="mr-2" />, name: 'Shirt', sold: 150 },
    { icon: <FaMitten className="mr-2" />, name: 'Saree', sold: 80 },
    { icon: <FaSocks className="mr-2" />, name: 'Shocks', sold: 60 }
  ];

    const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Olddata.slice(startIndex, startIndex + itemsPerPage);

  // Pagination handler
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && startIndex + itemsPerPage < Olddata.length) {
      setCurrentPage(currentPage + 1);
    }
  }


  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Get today's date in 'YYYY-MM-DD' format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const onSubmit = (data) => {
    console.log("Image:", data.image[0]);
    console.log("Amount:", data.amount);
    console.log("Date:", data.date || getTodayDate());
    setShowModal(false);
    reset();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      reset();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex justify-between flex-col 2xl:flex-row row-span-3 py-2 gap-2 lg:px-20 items-center bg-gray-100 rounded-xl">
        <img
          src={userData.image}
          alt="User Photo"
          className="w-full 2xl:w-1/2 h-full object-cover rounded-xl"
        />
         <img
          src={userData.QrImage}
          alt="User Photo"
          className="w-full 2xl:w-1/2 h-full object-cover rounded-xl"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl flex flex-col justify-between">
        <div className="flex justify-between"><span><strong>Address:</strong></span><span>{userData.address}</span></div>
        <div className="flex justify-between"><span><strong>Business name:</strong></span><span>{userData.businessName}</span></div>
        <div className="flex justify-between"><span><strong>Mobile no:</strong></span><span>{userData.mobileNo}</span></div>
        <div className="flex justify-between"><span><strong>Joining date:</strong></span><span>{userData.joiningDate}</span></div>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl">
        <h2 className="font-bold mb-2">Most Sold Clothes</h2>
        {clothesData.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div className="flex items-center">{item.icon}<span>{item.name}</span></div>
            <span>{item.sold}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl flex flex-col justify-between">
        <div className="flex justify-between"><span><strong>Total Sold:</strong></span><span>{userData.totalSold}</span></div>
        <div className="flex justify-between"><span><strong>Total Margin:</strong></span><span>{userData.totalMargin}</span></div>
        <div className="flex justify-between"><span><strong>Total items sold:</strong></span><span>{userData.totalItemsSold}</span></div>
      </div>


      <div className="overflow-x-auto md:col-span-2 xl:p-4">
      <table className="min-w-full rounded-2xl border-2 border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border text-left">Date</th>
            <th className="px-4 py-2 border text-left">Amount</th>
            <th className="px-4 py-2 border text-left">Screenshot</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="border">
              <td className="px-4 py-2 border">{item.date}</td>
              <td className="px-4 py-2 border">{item.amount}</td>
              <td className="px-4 py-2 border">
                <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200">
                  Screen Shot
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-3 w-full  mx-auto justify-center p-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 w-full md:w-fit rounded-md disabled:bg-gray-100"
        >
          Previous
        </button>
        <span className="px-4 py-2 justify-self-center">Page {currentPage}</span>
        <div className="justify-self-end">
        <button
          onClick={() => handlePageChange("next")}
          disabled={startIndex + itemsPerPage >= Olddata.length}
          className="px-4 py-2  bg-gray-200 rounded-md w-full md:w-fit disabled:bg-gray-100"
        >
          Next
        </button>
        <button
        className="px-4 py-2 ml-5 hidden md:inline-block col-span-3 md:col-span-1 self-center w-full bg-gray-200 rounded-md md:w-fit disabled:bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        Add To Table
      </button>

        </div>

        <button
        className="px-4 py-2 md:hidden col-span-3 md:col-span-1 self-center w-full bg-gray-200 rounded-md md:w-fit disabled:bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        Add To Table
      </button>
      </div>
    </div>


    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center px-3 bg-black/50 z-50">
          <div ref={modalRef} className="relative bg-white p-6 rounded-lg shadow-md  w-full md:w-[80%] lg:w-1/2">
            {/* Cross Button to Close Modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                reset();
              }}
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
              Upload Image, Amount & Date
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image Input */}
              <div className="mb-4">
                <div className="flex flex-col md:flex-row justify-between">
                <label className="block mb-1">Upload Image:</label>
                <input
                  type="file"
                  className="bg-gray-200 p-2 rounded-2xl cursor-pointer"
                  accept=".jpg,.jpeg,.png"
                  {...register("image", {
                    required: "Image is required",
                    validate: {
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/jpg", "image/png"].includes(
                          files[0]?.type
                        ) || "Only JPG, JPEG, and PNG formats are allowed",
                    },
                  })}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block mb-1">Amount:</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  placeholder="Enter amount"
                  {...register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are allowed",
                    },
                    min: {
                      value: 1,
                      message: "Amount must be at least 1",
                    },
                  })}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Date Input */}
              <div className="mb-4">
                <label className="block mb-1">Date:</label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  max={getTodayDate()}
                  {...register("date", {
                    validate: (value) =>
                      !value || value <= getTodayDate() ||
                      "Date cannot be in the future",
                  })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-md"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
