import React from "react";
 
import { FaTshirt, FaMitten, FaSocks } from "react-icons/fa";
import { GiTrousers } from "react-icons/gi";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BoyChild from "./SoldCloths/BoyChild";
import GirlChild from "./SoldCloths/GirlChild";
import Men from "./SoldCloths/Men";
import Women from "./SoldCloths/Women";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { Trash } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentItem, setCurrentItem] = useState([]);
  const [showDelete1, setShowDelete1] = useState(false);
  const [deleteIndex1, setDeleteIndex1] = useState(null);
  const [userData, setUserData] = useState({
    address: "",
    businessName: "",
    mobileNo: "",
    joiningDate: "",
    totalSold: 0,
    totalMargin: 0,
    totalItemsSold: 0,
    image: "",
    QrImage: "",
  });

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

  
  useEffect(() => {
    const fetchData = async () => {
      const data = new FormData();
      data.append("phone_number", contact.phone_number);
  
      try {
        const response = await axios.post(
          "https://zivaworld.online/microservices/fetch_user.php",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 200) {
          const res = response.data.data[0];
  
          setUserData({
            address: res.address || "",
            businessName: res.business_name || "",
            mobileNo: res.phone_number || "",
            joiningDate: res.joining_date || "",
            totalSold: res.totalSold || 0,
            totalMargin: res.totalMargin || 0,
            totalItemsSold: res.totalItemsSold || 0,
            image: res.front_image || "https://picsum.photos/200",
            QrImage: res.qr_image,
          });
  
          console.log("Fetched useffffffr data:", res);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const [Olddata, setOlddata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = new FormData();
      data.append("phone_number", contact.phone_number);
      try {
        const response = await axios.post(
          "https://zivaworld.online/microservices/fetch_user_payment.php",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        if (response.status == 200) {
          console.log("success response", response.data);
          setOlddata(response.data.data);
        }
      } catch (error) {
        console.log("error response", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("phone_number", contact.phone_number); // or your state/prop value

        const response = await axios.post(
          "https://zivaworld.online/microservices/fetch_user_purchases.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          console.log("success response", response.data);
          setCurrentItem(response.data);
          // Do something with response.data
        }
      } catch (error) {
        console.log("error response", error);
      }
    };

    fetchData();
  }, []);

  // const currentItem = [
  //   {
  //     date: '2025-03-21',
  //     status: 'Paid',
  //     amount: '5000Rs',
  //     details: [
  //       { item_name: 'tshirt', quantity: 6, total: 1000 },
  //       { item_name: 'pants', quantity: 6, total: 1000 },
  //       { item_name: 'shirt', quantity: 6, total: 1000 },
  //       { item_name: 'trousers', quantity: 6, total: 1000 },
  //       { item_name: 'skirt', quantity: 6, total: 1000 },
  //     ]
  //   },
  //   {
  //     date: '2025-02-15',
  //     status: 'Unpaid',
  //     amount: '3000Rs',
  //     details: [
  //       { item_name: 'jacket', quantity: 2, total: 1500 },
  //       { item_name: 'gloves', quantity: 5, total: 500 },
  //       { item_name: 'scarf', quantity: 4, total: 1000 },
  //     ]
  //   },
  //   {
  //     date: '2025-01-10',
  //     status: 'Paid',
  //     amount: '4500Rs',
  //     details: [
  //       { item_name: 'jeans', quantity: 3, total: 1800 },
  //       { item_name: 'hoodie', quantity: 2, total: 1700 },
  //       { item_name: 'cap', quantity: 4, total: 1000 },
  //     ]
  //   },
  //   {
  //     date: '2025-04-05',
  //     status: 'Pending',
  //     amount: '2500Rs',
  //     details: [
  //       { item_name: 'shorts', quantity: 5, total: 1250 },
  //       { item_name: 'socks', quantity: 10, total: 1250 },
  //     ]
  //   },
  //   {
  //     date: '2025-03-01',
  //     status: 'Paid',
  //     amount: '6000Rs',
  //     details: [
  //       { item_name: 'blazer', quantity: 2, total: 3000 },
  //       { item_name: 'tie', quantity: 5, total: 1000 },
  //       { item_name: 'belt', quantity: 4, total: 2000 },
  //     ]
  //   }
  // ];

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
    { name: "girl child", sold: 100 },
    { name: "boy child", sold: 150 },
    { name: "men", sold: 80 },
    { name: "women", sold: 60 },
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
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(Olddata?.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [indexing, setIndexing] = useState(0);
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
    const sendingData = new FormData();
    sendingData.append("phone_no", contact.phone_number);
    sendingData.append("date", data.date);
    sendingData.append("amount", data.amount);
    sendingData.append("ss", data.image[0]);
    try {
      const response = await axios.post(
        "https://zivaworld.online/microservices/add_user_payment.php",
        sendingData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 200) {
        console.log("success response", response.data);
      }
    } catch (error) {
      console.log("error response", error);
    }

    console.log("Image:", data.image[0]);
    console.log("Amount:", data.amount);
    console.log("Date:", data.date || getTodayDate());
    setShowModal(false);
    reset();
    window.location.reload();
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
  
    const [isQrOpen, setQrOpen] = useState(false);
    const [isFrontOpen, setFrontOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);


  const deleterow1 = async (index, id) => {
    setShowDelete1(!showDelete1);
    setDeleteIndex1(index);
    setDeleteId(id);
  };

  const confirmDelete1 = async () => {
    setShowDelete1(!showDelete1);
        const data = new FormData();
    data.append("payment_id", deleteId);

    try {
      const response = await axios.post(
        "https://zivaworld.online/microservices/delete_user_payment.php",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 200) {
        console.log("success response", response.data);
      }
    } catch (error) {
      console.log("error response", error);
    }
    window.location.reload();
  };


  const [showDeletedPayments, setShowDeletedPayments] = useState(false);

  const DeletedPaymentsModal = () => {
    const [deletedPaymentsPage, setDeletedPaymentsPage] = useState(1);
    const [showRestoreDialog, setShowRestoreDialog] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showScreenshot, setShowScreenshot] = useState(false);
    const [currentScreenshot, setCurrentScreenshot] = useState(null);

    // Dummy data for deleted payments
    const dummyDeletedPayments = [
      {
        id: 1,
        date: '2024-03-15',
        amount: '2500',
        screenshot_src: 'https://picsum.photos/200/300',
      },
      {
        id: 2,
        date: '2024-03-10',
        amount: '3500',
        screenshot_src: 'https://picsum.photos/200/300',
      },
      {
        id: 3,
        date: '2024-03-05',
        amount: '4200',
        screenshot_src: 'https://picsum.photos/200/300',
      },
      {
        id: 4,
        date: '2024-03-01',
        amount: '1800',
        screenshot_src: 'https://picsum.photos/200/300',
      }
    ];

    const itemsPerPage = 4;
    const startIndex = (deletedPaymentsPage - 1) * itemsPerPage;
    const currentItems = dummyDeletedPayments.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (direction) => {
      if (direction === "prev" && deletedPaymentsPage > 1) {
        setDeletedPaymentsPage(deletedPaymentsPage - 1);
      } else if (
        direction === "next" &&
        deletedPaymentsPage < Math.ceil(dummyDeletedPayments.length / itemsPerPage)
      ) {
        setDeletedPaymentsPage(deletedPaymentsPage + 1);
      }
    };

    const handleRestore = async (payment) => {
      setSelectedPayment(payment);
      setShowRestoreDialog(true);
    };

    const confirmRestore = async () => {
      // Here you would implement the restore API call
      console.log('Restoring payment:', selectedPayment.id);
      setShowRestoreDialog(false);
      setSelectedPayment(null);
    };

    const handleScreenshotClick = (src) => {
      setCurrentScreenshot(src);
      setShowScreenshot(true);
    };

    return (
      <div className="overflow-y-auto min-h-[25em] mt-8 min-w-full flex flex-col w-[100%] md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Deleted Payment History</h2>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Screenshot</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{payment.date}</td>
                <td className="py-2 px-4">{payment.amount}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleScreenshotClick(payment.screenshot_src)}
                    className="px-4 py-2 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    View Screenshot
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleRestore(payment)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 w-full mx-auto p-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={deletedPaymentsPage === 1}
            className="px-4 py-2 bg-gray-200 w-full md:w-fit rounded-md disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
          >
            <span className="w-full">Previous</span>
          </button>
          <span className="px-4 py-2 justify-self-center">
            Page {deletedPaymentsPage}
          </span>
          <div className="justify-self-end md:col-span-2">
            <button
              onClick={() => handlePageChange("next")}
              disabled={startIndex + itemsPerPage >= dummyDeletedPayments.length}
              className="px-4 py-2 bg-gray-200 rounded-md w-full md:w-fit disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
            >
              <span className="w-full">Next</span>
            </button>
          </div>
        </div>

        {/* Restore Confirmation Dialog */}
        {showRestoreDialog && (
          <div 
            onClick={() => {
              setShowRestoreDialog(false);
              setSelectedPayment(null);
            }} 
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-[110]"
          >
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="bg-white p-4 rounded shadow-md"
            >
              <p>Are you sure you want to restore this payment?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowRestoreDialog(false);
                    setSelectedPayment(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRestore}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Screenshot Modal */}
        {showScreenshot && (
          <div 
            onClick={() => {
              setShowScreenshot(false);
              setCurrentScreenshot(null);
            }} 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[110]"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowScreenshot(false);
                setCurrentScreenshot(null);
              }}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <img
              src={currentScreenshot}
              alt="Payment Screenshot"
              className="max-w-full max-h-[80vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1 md:p-4">
      <div className="flex justify-between flex-col 2xl:h-[20em] 2xl:flex-row md:row-span-3 py-2 gap-2 px-2 items-center bg-gray-100 rounded-xl">
        <img
          src={contact.front_image}
          onClick={() => setFrontOpen(true)}
          alt="User Photo"
          className="w-full  md:min-w-[20em] max-h-[20em] xl:w-1/2 xl:min-w-[17em] h-full object-cover rounded-xl"
        />
        {isFrontOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setFrontOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFrontOpen(false);
              }}
              className="absolute top-4 right-4 text-white text-5xl font-bold z-50"
            >
              &times;
            </button>
            <img
              src={contact.front_image}
              alt="Fullscreen Image"
              className="max-w-full max-h-[80%] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <img
          src={userData.QrImage}
           onClick={() => setQrOpen(true)}
          alt="User Photo"
          className="w-full md:min-w-[20em] max-h-[20em] xl:w-1/2 h-full xl:min-w-[17em] object-cover rounded-xl"
        />
        {isQrOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setQrOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQrOpen(false);
              }}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <img
              src={userData.QrImage}
              alt="Fullscreen Image"
              className="max-w-full max-h-[80%] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl flex flex-col justify-between">
        <div className="flex justify-between">
          <span>
            <strong>Address:</strong>
          </span>
          <span>{userData.address}</span>
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Business name:</strong>
          </span>
          <span>{contact.business_name}</span>
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Mobile no:</strong>
          </span>
          <span>{contact.phone_number}</span>
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Joining date:</strong>
          </span>
          <span>{contact.joining_date.split(" ")[0]}</span>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl">
        <h2 className="font-bold mb-2">Most Sold Clothes</h2>
        {clothesData.map((item, index, comp) => (
          <div
            key={index}
            onClick={() => {
              setShowModal2(true);
              setIndexing(index);
            }}
            className="flex justify-between mb-2 cursor-pointer"
          >
            <div className="flex items-center">
              <span>{item.name}</span>
            </div>
            <span>{item.sold}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-xl text-lg md:text-2xl flex flex-col justify-between">
        <div className="flex justify-between">
          <span>
            <strong>Total Margin Earned:</strong>
          </span>
          <span>{userData.totalMarginEarned}</span>
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Total Margin Remaining:</strong>
          </span>
          <span>{userData.totalMargin}</span>
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Total items sold:</strong>
          </span>
          <span>{userData.totalItemsSold}</span>
        </div>
      </div>
      <div className="overflow-x-auto md:col-span-2 xl:p-4">
 <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
        <table className="min-w-full rounded-2xl border-2 border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 lg:text-xl border text-left">Date</th>
              <th className="px-4 py-2 lg:text-xl border text-left">Amount</th>
              <th className="px-4 py-2 lg:text-xl border text-left">Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className="border">
                  <td className="px-4 py-2 border">
                    {item.date?.split(" ")[0]}
                  </td>
                  <td className="px-4 py-2 border">{item.amount}</td>
                  <td className="px-4 py-2 border">
                    <span className="flex justify-between items-center">
                      <button
                        onClick={() => handleOpenPopup(item.screenshot_src)}
                        className="px-4 py-2 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200"
                      >
                        Screen Shot
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleterow1(index, item.id);
                        }}
                        className="cursor-pointer hidden md:block rounded-sm p-2"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        <Trash />
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showDelete1 && (
          <div onClick={() => {
            setShowDelete1(false);
            setDeleteIndex1(null);
          }} className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div onClick={(e) => {e.stopPropagation()}} className="bg-white p-4 rounded shadow-md">
              <p>Are you sure you want to delete this item?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowDelete1(false);
                    setDeleteIndex1(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete1}
                  
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
    <ToastContainer />

                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

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
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 w-full mx-auto justify-center p-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 w-full md:w-fit rounded-md disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
          >
            <span className="w-full lg:text-xl">Previous</span>
            
          </button>
          <span className="px-4 lg:text-xl py-2 justify-self-center">
            Page {currentPage}
          </span>
          <div className="justify-self-end md:col-span-2 flex flex-col md:flex-row gap-2">
           

            <button
              onClick={() => handlePageChange("next")}
              disabled={startIndex + itemsPerPage >= Olddata?.length}
              className="px-4 py-2 bg-gray-200 rounded-md w-full md:w-fit disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
            >
              <span className="w-full lg:text-xl">Next</span>
              
            </button>

            <button
              onClick={() => setShowDeletedPayments(true)}
              className="px-4 py-2 hidden md:block bg-gray-200 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
            >
              <span className="hidden md:inline lg:text-xl">Deleted Payments</span>
              
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 hidden md:block bg-gray-200 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
            >
              <span className="hidden md:inline">Add To Table</span>
              <span className="md:hidden">+ Add</span>
            </button>
          </div>
          <button
              onClick={() => setShowDeletedPayments(true)}
              className="px-4 py-2 bg-gray-200 md:hidden col-span-1 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
            >
              
              <span className="md:hidden">Deleted</span>
            </button>
          <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-gray-200 md:hidden col-span-2 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
            >
              <span className="hidden md:inline">Add To Table</span>
              <span className="md:hidden">+ Add</span>
            </button>
        </div>
      </div>

      <SalesTable items={currentItem} />

      {showModal2 && (
        <div className="fixed inset-0 flex items-center justify-center px-3 bg-black/50 z-50">
          <div
            ref={modalRef2}
            className="relative bg-white p-6 rounded-lg shadow-md  w-full md:w-[80%] lg:w-1/2"
          >
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
            {indexing === 0 && <GirlChild />}
            {indexing === 1 && <BoyChild />}
            {indexing === 2 && <Men />}
            {indexing === 3 && <Women />}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center px-3 bg-black/50 z-50">
          <div
            ref={modalRef}
            className="relative bg-white p-6 rounded-lg shadow-md  w-full md:w-[80%] lg:w-1/2"
          >
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
                            files[0]?.type,
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
                      !value ||
                      value <= getTodayDate() ||
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
                  className="px-4 py-2 rounded-md"
                  style={{backgroundColor:"#e5e7eb", border:"none",color:"black"}}                  
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md"
                  style={{backgroundColor:"#2b7fff", border:"none",color:"white"}}
                  
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeletedPayments && (
        <div
          onClick={() => {
            setShowDeletedPayments(false);
          }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white relative rounded-lg overflow-y-auto max-h-[30em] md:max-h-[45em] shadow-lg w-full h-full max-w-[69em] p-4"
          >
            <button
              onClick={() => setShowDeletedPayments(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              ✖
            </button>
            <DeletedPaymentsModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

const CollapsibleTableRow = ({ data, index, expandedIndex, onExpand }) => {
  const isExpanded = index === expandedIndex;

  const [showDelete2, setShowDelete2] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteIndex, setDeleteIndex] = useState(null);

  const deleterow2 =(index)=>{
   setShowDelete2(!showDelete2)
   setDeleteIndex(index)
   setDeleteId(data.id)
  }

  const confirmDelete2 =(id) =>{
    setShowDelete2(!showDelete2)

    const data = new FormData();
    data.append("purchase_id", deleteId);
    try {
      const response = axios.post(
        "https://zivaworld.online/microservices/delete_user_purchase.php",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 200) {
        console.log("success response", response.data);
      }
    } catch (error) {
      console.log("error response", error);
    }
  
  }

  


  return (
    <>
      <tr
        className={`cursor-pointer border-b hover:bg-gray-100 ${
          isExpanded ? "bg-gray-200" : "bg-white"
        }`}
        onClick={() => onExpand(index)}
      >
              <td className="py-2 px-4">{data.date?.split(" ")[0]}</td>
        <td className="py-2 px-4">
          {data.status === 1 ? "Paid" : "Not Paid"}
        </td>

        <td className="py-2 px-4">{data.bill_number}</td>

        <td className="py-2 px-4 flex w-full items-center justify-between">
          {data.amount}
          <button
            onClick={(e , index) => {
            
              deleterow2(index, data.id);
              e.stopPropagation();
              
            }}
            className="cursor-pointer hidden md:block  rounded-sm p-2"
            style={{ backgroundColor: "red", color: "white" }}
          >
            <Trash />
          </button>
        </td>

       

        {showDelete2 && (
  <div  o onClick={() => {
    setShowDelete2(false);
    setDeleteIndex(null);
  }} className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div onClick={(e)=>{e.stopPropagation()}} className="bg-white p-4 rounded shadow-md">
      <p>Are you sure you want to delete this item?</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => {
            setShowDelete2(false);
            setDeleteIndex(null);
          }}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete2}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
        
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
                    <th className="py-1 px-2">Margin</th>
                    <th className="py-1 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data.user_purchase_details) &&
                  data.user_purchase_details.length > 0 ? (
                    data.user_purchase_details.map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-1 px-2">{item.item_name}</td>
                        <td className="py-1 px-2">{item.item_quantity}</td>
                        <td className="py-1 px-2">{item.margin} Rs</td>
                        <td className="py-1 px-2">{item.item_total} Rs</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-2 px-4 text-center text-gray-500"
                      >
                        No item details available.
                      </td>
                    </tr>
                  )}
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
  const [salesCurrentPage, setSalesCurrentPage] = useState(1);
  const salesItemsPerPage = 4;
  const salesStartIndex = (salesCurrentPage - 1) * salesItemsPerPage;
  const salesCurrentItems = items.slice(
    salesStartIndex,
    salesStartIndex + salesItemsPerPage,
  );
  const [showModal3, setShowModal3] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [showDeleted2, setShowDeleted2] = useState(false);

  const location = useLocation();
  const contact = location.state?.contact;

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSalesPageChange = (direction) => {
    if (direction === "prev" && salesCurrentPage > 1) {
      setSalesCurrentPage(salesCurrentPage - 1);
    } else if (
      direction === "next" &&
      salesCurrentPage < Math.ceil(items.length / salesItemsPerPage)
    ) {
      setSalesCurrentPage(salesCurrentPage + 1);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addSubItem = () => {
    setSubItems([...subItems, { name: "", quantity: "", total: "" }]);
  };

  const removeSubItem = (index) => {
    setSubItems(subItems.filter((_, i) => i !== index));
  };

  const handleSubItemChange = (index, field, value) => {
    const newSubItems = [...subItems];
    newSubItems[index][field] = value;
    setSubItems(newSubItems);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append primitive form fields
    formData.append("phone_number", contact.phone_number);

    // Append other form fields from data
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log("data", data);

    // Append subItems array as JSON string
    formData.append("subItems", JSON.stringify(subItems));

    try {
      const response = await axios.post(
        "https://zivaworld.online/microservices/add_user_purchase.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        console.log("success response", response.data);
      }
    } catch (error) {
      console.log("error response", error);
    }

    console.log("Form Data:", formData);
    setShowModal3(false);
    setSubItems([]); // Clear sub-items after submission
    reset(); // Reset form fields
  };

const DeletedSales = () => {
    console.log("hell is waiting")
    setShowDeleted2(!showDeleted2);
  }


  return (
    <>
      <div className="overflow-y-auto min-h-[25em] mt-8 min-w-full flex flex-col w-[100%] md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Sales Summary</h2>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Bill</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(salesCurrentItems) && salesCurrentItems.length > 0 ? (
              salesCurrentItems.map((entry, index) => (
                <CollapsibleTableRow
                  key={index}
                  data={entry}
                  index={index}
                  expandedIndex={expandedIndex}
                  onExpand={handleExpand}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 w-full mx-auto p-4">
          <button
            onClick={() => handleSalesPageChange("prev")}
            disabled={salesCurrentPage === 1}
            className="px-4 py-2 bg-gray-200 w-full md:w-fit rounded-md disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
          >
            <span className="w-full">Previous</span>
          </button>
          <span className="px-4 py-2 justify-self-center">
            Page {salesCurrentPage}
          </span>
          <div className="justify-self-end md:col-span-2 flex flex-col md:flex-row gap-2">
            <button
              onClick={() => handleSalesPageChange("next")}
              disabled={salesStartIndex + salesItemsPerPage >= items.length}
              className="px-4 py-2 bg-gray-200 rounded-md w-full md:w-fit disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
            >
              <span className="w-full">Next</span>
            </button>
            
             <button
                // onClick={() => setShowModal(true)}
                onClick={DeletedSales}
                className="px-4 py-2 hidden md:block bg-gray-200 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
              >
                <span className="hidden md:inline lg:text-xl">Deleted Table</span>
                
              </button>
            <button
              onClick={() => setShowModal3(true)}
              className="px-4 py-2 hidden md:block bg-gray-200 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
            >
              <span className="hidden md:inline">Add to table</span>
              <span className="md:hidden">+ Add</span>
            </button>
             
          </div>
           <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-gray-200 md:hidden col-span-1 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
              >
                
                <span className="md:hidden">Deleted</span>
              </button>
          <button
              onClick={() => setShowModal3(true)}
              className="px-4 py-2 bg-gray-200 md:hidden col-span-2 md:col-span-3 rounded-md w-full md:w-fit hover:bg-gray-300 transition-colors"
            >
              <span className="hidden md:inline">Add to table</span>
              <span className="md:hidden">+ Add</span>
            </button>
        </div>
      </div>

      {showDeleted2 && (
        <div
          onClick={() => {
            setShowDeleted2(false);
          }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white relative rounded-lg overflow-y-auto max-h-[30em] md:max-h-[45em] shadow-lg w-full h-full max-w-[69em]"
          >
            <button
              onClick={() => setShowDeleted2(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              ✖
            </button>
            <DeletedSalesTable />
          </div>
        </div>
      )}

      {showModal3 && (
        <div
          onClick={() => {
            setShowModal3(false);
            setSubItems([]); // Clear sub-items when modal is closed
            reset(); // Reset form fields
          }}
          className="fixed  inset-0   bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white relative  rounded-lg overflow-y-auto max-h-[30em] md:max-h-[45em] shadow-lg w-full h-full  max-w-[69em]"
          >
            <div className="bg-white z-20 sticky h-20 top-0 left-0 flex w-full">
              <h3 className="text-lg p-4 font-bold mb-4">Add New Sale</h3>
            </div>
            <form
              className="flex px-5  flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4 gap-5 w-full max-w-7xl">
                <div className="border p-2 w-full rounded-sm">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      {...register("date", { required: "Date is required" })}
                      className="w-full p-2 border rounded"
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className="w-full p-2 border rounded"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="Completed">Completed</option>
                      <option value="Not Completed">Not Completed</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  <div className="z-20">
                    <label className="block text-sm font-medium mb-1">
                      Bill Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter bill number"
                      {...register("bill_no", {
                        required: "Bill number is required",
                      })}
                      className="w-full p-2 border rounded"
                    />
                    {errors.bill_no && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bill_no.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 100.00"
                      {...register("amount", {
                        required: "Amount is required",
                        valueAsNumber: true,
                      })}
                      className="w-full p-2 border rounded no-spinner"
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Dynamic Sub-Item Inputs */}
                {subItems.map((item, index) => (
                  <div key={index} className="border p-2 w-full rounded">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium mb-1">
                        Item {index + 1}
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSubItem(index)}
                        className="text-red-500 cursor-pointer text-sm"
                      >
                        <ImCross />
                      </button>
                    </div>

                    <label className="block text-sm font-medium mb-1">
  Item Name
</label>
<select
  required
  value={item.name}
  onChange={(e) =>
    handleSubItemChange(index, "name", e.target.value)
  }
  className="w-full p-2 border rounded mb-2"
>
  <option value="">Select Item</option>
  {[
    "Kurta Pajama",
    "Silk Saree",
    "Nehru Jacket",
    "Lehenga Choli",
    "Sherwani Set",
    "Salwar Suit",
    "Dhoti Kurta",
    "Cotton Kurti",
    "Ethnic Wear",
    "Pathani Suit",
    "Anarkali Dress",
    "Kurta Set",
    "Gown Dress",
    "Banarasi Saree",
    "Chanderi Suit",
    "Linen Kurta",
    "Denim Kurti",
    "Zari Saree",
    "Pattu Pavadai",
    "Angrakha Kurta",
  ].map((name, i) => (
    <option key={i} value={name}>
      {name}
    </option>
  ))}
</select>


                    <label className="block text-sm font-medium mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      required
                      value={item.quantity}
                      onChange={(e) =>
                        handleSubItemChange(index, "quantity", e.target.value)
                      }
                      className="w-full p-2 border rounded mb-2 no-spinner"
                    />

                    <label className="block text-sm font-medium mb-1">
                      Total
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={item.total}
                      onChange={(e) =>
                        handleSubItemChange(index, "total", e.target.value)
                      }
                      className="w-full p-2 border rounded no-spinner"
                    />

                    <div className="z-20">

                    <label className="block text-sm font-medium mb-1">
                     Margin
                    </label>
                    <input
                      type="text"
                      placeholder="Enter margin"
                      onChange={(e) =>
                        handleSubItemChange(index, "margin", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                    {errors.margin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bill_no.margin}
                      </p>
                    )}
                  </div>
                  </div>
                ))}
              </div>
              <div className="space-x-3 sticky bg-white pt-10 bottom-0 h-full  flex justify-center md:justify-end w-full">
                <button
                  type="button"
                  onClick={addSubItem}
                  className="mb-4 px-4 py-2 h-fit b  rounded"
                  style={{backgroundColor:"#00c950", border:"none",color:"white"}}
                >
                  + Add Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal3(false);
                    setSubItems([]); // Clear sub-items
                    reset(); // Reset form
                  }}
                  className="px-4 py-2 h-fit bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 h-fit  text-white rounded-md"
                  style={{backgroundColor:"#2b7fff", border:"none",color:"white"}}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const DeletedSalesTable = () => {
  // Dummy data for deleted sales
  const dummyDeletedSales = [
    {
      id: 1,
      date: '2024-03-15',
      status: 0,
      bill_number: 'DEL-001',
      amount: '2500',
      user_purchase_details: [
        { item_name: 'Kurta Pajama', item_quantity: 2, margin: '200', item_total: '1800' },
        { item_name: 'Silk Saree', item_quantity: 1, margin: '300', item_total: '700' }
      ]
    },
    {
      id: 2,
      date: '2024-03-10',
      status: 1,
      bill_number: 'DEL-002',
      amount: '3500',
      user_purchase_details: [
        { item_name: 'Sherwani Set', item_quantity: 1, margin: '500', item_total: '2500' },
        { item_name: 'Salwar Suit', item_quantity: 2, margin: '250', item_total: '1000' }
      ]
    },
    {
      id: 3,
      date: '2024-03-05',
      status: 0,
      bill_number: 'DEL-003',
      amount: '4200',
      user_purchase_details: [
        { item_name: 'Lehenga Choli', item_quantity: 1, margin: '600', item_total: '3200' },
        { item_name: 'Anarkali Dress', item_quantity: 2, margin: '200', item_total: '1000' }
      ]
    }
  ];

  const [deletedExpandedIndex, setDeletedExpandedIndex] = useState(null);
  const [deletedCurrentPage, setDeletedCurrentPage] = useState(1);
  const deletedItemsPerPage = 4;
  const deletedStartIndex = (deletedCurrentPage - 1) * deletedItemsPerPage;
  const deletedCurrentItems = dummyDeletedSales.slice(
    deletedStartIndex,
    deletedStartIndex + deletedItemsPerPage
  );

  const handleDeletedExpand = (index) => {
    setDeletedExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeletedPageChange = (direction) => {
    if (direction === "prev" && deletedCurrentPage > 1) {
      setDeletedCurrentPage(deletedCurrentPage - 1);
    } else if (
      direction === "next" &&
      deletedCurrentPage < Math.ceil(dummyDeletedSales.length / deletedItemsPerPage)
    ) {
      setDeletedCurrentPage(deletedCurrentPage + 1);
    }
  };

  return (
    <div className="overflow-y-auto min-h-[25em] mt-8 min-w-full flex flex-col w-[100%] md:col-span-2">
      <h2 className="text-xl font-bold mb-4">Deleted Sales History</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Bill</th>
            <th className="py-2 px-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {deletedCurrentItems.map((entry, index) => (
            <DeletedSalesRow
              key={entry.id}
              data={entry}
              index={index}
              expandedIndex={deletedExpandedIndex}
              onExpand={handleDeletedExpand}
            />
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 w-full mx-auto p-4">
        <button
          onClick={() => handleDeletedPageChange("prev")}
          disabled={deletedCurrentPage === 1}
          className="px-4 py-2 bg-gray-200 w-full md:w-fit rounded-md disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
        >
          <span className="w-full">Previous</span>
        </button>
        <span className="px-4 py-2 justify-self-center">
          Page {deletedCurrentPage}
        </span>
        <div className="justify-self-end md:col-span-2">
          <button
            onClick={() => handleDeletedPageChange("next")}
            disabled={deletedStartIndex + deletedItemsPerPage >= dummyDeletedSales.length}
            className="px-4 py-2 bg-gray-200 rounded-md w-full md:w-fit disabled:bg-gray-100 hover:bg-gray-300 transition-colors"
          >
            <span className="w-full">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DeletedSalesRow = ({ data, index, expandedIndex, onExpand }) => {
  const isExpanded = index === expandedIndex;
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const handleRestore = async () => {
    // Here you would implement the restore API call
    console.log('Restoring item:', data.id);
    setShowRestoreDialog(false);
  };

  return (
    <>
      <tr
        className={`cursor-pointer border-b hover:bg-gray-100 ${
          isExpanded ? "bg-gray-200" : "bg-white"
        }`}
        onClick={() => onExpand(index)}
      >
        <td className="py-2 px-4">{data.date}</td>
        <td className="py-2 px-4">
          {data.status === 1 ? "Paid" : "Not Paid"}
        </td>
        <td className="py-2 px-4">{data.bill_number}</td>
        <td className="py-2 px-4 flex w-full items-center justify-between">
          {data.amount}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowRestoreDialog(true);
            }}
            className="cursor-pointer hidden md:block rounded-sm p-2"
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Restore
          </button>
        </td>
      </tr>

      {showRestoreDialog && (
        <div 
          onClick={() => setShowRestoreDialog(false)} 
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white p-4 rounded shadow-md"
          >
            <p>Are you sure you want to restore this item?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowRestoreDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRestore}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={4} className="p-4">
            <div>
              <h3 className="font-semibold mb-2">Deleted Item Details:</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-1 px-2">Item Name</th>
                    <th className="py-1 px-2">Quantity</th>
                    <th className="py-1 px-2">Margin</th>
                    <th className="py-1 px-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.user_purchase_details.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-1 px-2">{item.item_name}</td>
                      <td className="py-1 px-2">{item.item_quantity}</td>
                      <td className="py-1 px-2">{item.margin} Rs</td>
                      <td className="py-1 px-2">{item.item_total} Rs</td>
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