import React from "react";
import { FaTshirt, FaMitten, FaSocks } from 'react-icons/fa';
import { GiTrousers } from 'react-icons/gi';
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BoyChild from "./SoldCloths/BoyChild";
import GirlChild from "./SoldCloths/GirlChild";
import Men from "./SoldCloths/Men";
import Women from "./SoldCloths/Women";
import axios from "axios";
const UserDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  
  const handleOpenPopup = (src) => {
    setCurrentImage(src);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentImage("");
  };
  const location = useLocation();
  const contact = location.state?.contact; // Get the passed contact data

  if (!contact) {
    return <div>No contact data found.</div>;
  }

  const userData = {
    address: 'Delhi 345',
    businessName: contact.name,
    mobileNo: '1234567890',
    joiningDate: '01-01-2020',
    totalSold: 3900,
    totalMargin: '5',
    totalItemsSold: 500,
    image: 'https://picsum.photos/200',
    QrImage: 'https://picsum.photos/300'
  };

  const [Olddata, setOlddata] = useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
      const data = new FormData()
      data.append("phone_number" , contact.phone_number) 
      try {
        const response = await axios.post('https://zivaworld.online/microservices/fetch_user_payment.php',data,
          {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if(response.status == 200){
          console.log('success response', response.data);
          setOlddata(response.data.data)
        }
      } catch (error) {
        console.log('error response', error);
      }
    }

    fetchData();

  },[])

  const currentItem = [
    {
      date: '2025-03-21',
      status: 'Paid',
      amount: '5000Rs',
      details: [
        { item_name: 'tshirt', quantity: 6, total: 1000 },
        { item_name: 'pants', quantity: 6, total: 1000 },
        { item_name: 'shirt', quantity: 6, total: 1000 },
        { item_name: 'trousers', quantity: 6, total: 1000 },
        { item_name: 'skirt', quantity: 6, total: 1000 },
      ]
    },
    {
      date: '2025-02-15',
      status: 'Unpaid',
      amount: '3000Rs',
      details: [
        { item_name: 'jacket', quantity: 2, total: 1500 },
        { item_name: 'gloves', quantity: 5, total: 500 },
        { item_name: 'scarf', quantity: 4, total: 1000 },
      ]
    },
    {
      date: '2025-01-10',
      status: 'Paid',
      amount: '4500Rs',
      details: [
        { item_name: 'jeans', quantity: 3, total: 1800 },
        { item_name: 'hoodie', quantity: 2, total: 1700 },
        { item_name: 'cap', quantity: 4, total: 1000 },
      ]
    },
    {
      date: '2025-04-05',
      status: 'Pending',
      amount: '2500Rs',
      details: [
        { item_name: 'shorts', quantity: 5, total: 1250 },
        { item_name: 'socks', quantity: 10, total: 1250 },
      ]
    },
    {
      date: '2025-03-01',
      status: 'Paid',
      amount: '6000Rs',
      details: [
        { item_name: 'blazer', quantity: 2, total: 3000 },
        { item_name: 'tie', quantity: 5, total: 1000 },
        { item_name: 'belt', quantity: 4, total: 2000 },
      ]
    }
  ];
  
  


  // const Olddata = [
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  //   { date: '12/11/25', amount: 500 },
  // ];

  const clothesData = [
    {  name: 'girl child', sold: 100  },
    {  name: 'boy child', sold: 150  },
    {  name: 'men', sold: 80  },
    { name: 'women', sold: 60  }
  ];

    const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Array.isArray(Olddata)
  ? Olddata.slice(startIndex, startIndex + itemsPerPage)
  : [];


  // Pagination handler
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < Math.ceil(Olddata?.length / itemsPerPage)) {

      setCurrentPage(currentPage + 1);
    }
  }

  const [indexing, setIndexing]=useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

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

  const onSubmit = async (data) => {
    const sendingData = new FormData()
      sendingData.append("phone_no" , contact.phone_number) 
      sendingData.append("date" , data.date) 
      sendingData.append("amount" , data.amount) 
      sendingData.append("ss" , data.image[0]) 
      try {
        const response = await axios.post('https://zivaworld.online/microservices/add_user_payment.php',sendingData,
          {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if(response.status == 200){
          console.log('success response', response.data);
        }
      } catch (error) {
        console.log('error response', error);
      }



    console.log("Image:", data.image[0]);
    console.log("Amount:", data.amount);
    console.log("Date:", data.date || getTodayDate());
    setShowModal(false);
    reset();
    window.location.reload()
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      reset();
    }
  };

  const handleClickOutside2 = (event) => {
    if (modalRef2.current && !modalRef2.current.contains(event.target)) {
      setShowModal2(false);
      
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

  useEffect(() => {
    if (showModal2) {
      document.addEventListener("mousedown", handleClickOutside2);
    } else {
      document.removeEventListener("mousedown", handleClickOutside2);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, [showModal2]);
  











const UserDetails = () => {
  // Existing imports and state...

  const [salesCurrentPage, setSalesCurrentPage] = useState(1);
  const salesStartIndex = (salesCurrentPage - 1) * itemsPerPage;
  const currentSalesItems = currentItem.slice(salesStartIndex, salesStartIndex + itemsPerPage);
  const handleSalesPageChange = (direction) => {
    const totalSalesPages = Math.ceil(currentItem.length / itemsPerPage);
    if (direction === "prev" && salesCurrentPage > 1) {
      setSalesCurrentPage(salesCurrentPage - 1);
    } else if (direction === "next" && salesCurrentPage < totalSalesPages) {
      setSalesCurrentPage(salesCurrentPage + 1);
    }
  };

  const [showSalesModal, setShowSalesModal] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Existing JSX */}
      
      <SalesTable items={currentSalesItems} />
      <div className="flex justify-between items-center mt-4 px-2">
        <button
          onClick={() => handleSalesPageChange("prev")}
          disabled={salesCurrentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-black font-semibold">Page {salesCurrentPage}</span>
        <div>
          <button
            onClick={() => handleSalesPageChange("next")}
            disabled={salesStartIndex + itemsPerPage >= currentItem.length}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
          <button
            className="px-4 py-2 ml-5 hidden md:inline-block bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setShowSalesModal(true)}
          >
            Add To Table
          </button>
        </div>
      </div>

      {showSalesModal && (
        <div className="fixed inset-0 flex items-center justify-center px-3 bg-black/50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-md w-full md:w-[80%] lg:w-1/2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSalesModal(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Add New Sale Entry
            </h2>
            <p>Form to add a new sale will go here.</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md"
                onClick={() => setShowSalesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing modals and components */}
    </div>
  );
};










  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex justify-between flex-col 2xl:h-[20em] 2xl:flex-row row-span-3 py-2 gap-2 px-2 items-center bg-gray-100 rounded-xl">
        <img
          src={contact.front_image}
          alt="User Photo"
          className="w-full md:min-w-[20em] xl:w-1/2 xl:min-w-[17em] h-full object-cover rounded-xl"
        />
         <img
          src={userData.QrImage}
          alt="User Photo"
          className="w-full md:min-w-[20em] xl:w-1/2 h-full xl:min-w-[17em] object-cover rounded-xl"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl flex flex-col justify-between">
        <div className="flex justify-between"><span><strong>Address:</strong></span><span>{userData.address}</span></div>
        <div className="flex justify-between"><span><strong>Business name:</strong></span><span>{contact.business_name}</span></div>
        <div className="flex justify-between"><span><strong>Mobile no:</strong></span><span>{contact.phone_number}</span></div>
        <div className="flex justify-between"><span><strong>Joining date:</strong></span><span>{contact.joining_date.split(" ")[0]}
</span></div>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl">
        <h2 className="font-bold mb-2">Most Sold Clothes</h2>
        {clothesData.map((item, index, comp) => (
  <p key={index} onClick={() => { setShowModal2(true); setIndexing(index); }}
  className="flex justify-between mb-2 cursor-pointer">
    <div className="flex items-center"><span>{item.name}</span></div>
    <span>{item.sold}</span>
    
  </p>
))}

      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl flex flex-col justify-between">
        <div className="flex justify-between"><span><strong>Total Sold:</strong></span><span>{userData.totalSold}</span></div>
        <div className="flex justify-between"><span><strong>Total Margin Remaining:</strong></span><span>{userData.totalMargin}</span></div>
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
              <td className="px-4 py-2 border">{item.date.split(" ")[0]}</td>
              <td className="px-4 py-2 border">{item.amount}</td>
              <td className="px-4 py-2 border">
              <button
                  onClick={() => handleOpenPopup(item.screenshot_src)}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Screen Shot
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>


       {/* Popup */}
       {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <div className="flex justify-end">
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            <img
              src={currentImage}
              alt="Screenshot"
              className="max-w-full max-h-[80vh] mx-auto"
            />
          </div>
        </div>
      )}
      

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
          disabled={startIndex + itemsPerPage >= Olddata?.length}
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

        {/* <button
        className="px-4 py-2 md:hidden col-span-3 md:col-span-1 self-center w-full bg-gray-200 rounded-md md:w-fit disabled:bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        Add To Table
      </button> */}
      </div>
    </div>

   
   {/* <div className="w-full flex flex-col"> <table className="w-full rounded-2xl border-2 border-gray-300">
  <thead>
    <tr className="bg-gray-100 w-full">
      <th className="px-4 py-2 border text-left">Date</th>
      <th className="px-4 py-2 border text-left">Status</th>
      <th className="px-4 py-2 border text-left">Amount</th>
    </tr>
  </thead>
  <tbody>
    {currentItem.map((item, index) => (
      <tr key={index} className="border w-full">
        <td className="px-4 py-2 border">{item.date}</td>
        <td className="px-4 py-2 border">{item.status}</td>
        <td className="px-4 py-2 border">{item.amount}</td>
      </tr>
    ))}
  </tbody>
</table>
<div className="flex justify-between items-center mt-4 px-2">
  <button
    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-not-allowed"
    disabled
  >
    Previous
  </button>
  <span className="text-black font-semibold">1 / 3</span>
  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    Next
  </button>
</div>
</div> */}

<SalesTable items={currentItem} />



    {showModal2 && (
        <div className="fixed inset-0 flex items-center justify-center px-3 bg-black/50 z-50">
          <div ref={modalRef2} className="relative bg-white p-6 rounded-lg shadow-md  w-full md:w-[80%] lg:w-1/2">
            {/* Cross Button to Close Modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal2(false);
                reset();
              }}
            >
              ✖
            </button>
            {indexing===0 && <GirlChild />}
            {indexing===1 && <BoyChild />}
            {indexing===2 && <Men/>}
            {indexing===3 && <Women/>}
            </div>
            </div>
    )}
    

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


const CollapsibleTableRow = ({ data, index, expandedIndex, onExpand }) => {
  const isExpanded = index === expandedIndex;

  return (
    <>
      <tr
         className={`cursor-pointer border-b hover:bg-gray-100 ${
          isExpanded ? 'bg-gray-200' : 'bg-white'
        }`}
        onClick={() => onExpand(index)}
      >
        <td className="py-2 px-4">{data.date}</td>
        <td className="py-2 px-4">{data.status}</td>
        <td className="py-2 px-4">{data.amount}</td>
     
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={4} className="p-4">
            <div>
              <h3 className="font-semibold mb-2">Item Details:</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-1 px-2">Item Name</th>
                    <th className="py-1 px-2">Quantity</th>
                    <th className="py-1 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.details.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-1 px-2">{item.item_name}</td>
                      <td className="py-1 px-2">{item.quantity}</td>
                      <td className="py-1 px-2">{item.total}Rs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const SalesTable = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="overflow-x-auto mt-8 min-w-full flex flex-col w-[100%] col-span-2 ">
      <h2 className="text-xl font-bold mb-4">Sales Summary</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Amount</th>
           
          </tr>
        </thead>
        <tbody>
          {items.map((entry, index) => (
            <CollapsibleTableRow
              key={index}
              data={entry}
              index={index}
              expandedIndex={expandedIndex}
              onExpand={handleExpand}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
