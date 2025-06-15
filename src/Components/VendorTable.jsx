import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";






const VendorTable = () => {
const [sentVendors, setSentVendors] = useState({});

const handleSend = (phone_number, id) => {
  console.log("Send request to:", phone_number);

  const fetchData = async () => {
    const data = new FormData();
    data.append("phone_number", phone_number); // ✅ Append phone_number to FormData

    try {
      const response = await axios.post(
        "https://zivaworld.online/microservices/complete_payment_request.php",
        data // ✅ Send the FormData object
      );

      if (response.status === 200) {
        console.log("success response", response.data);
        setSentVendors((prev) => ({ ...prev, [id]: true }));
        window.location.reload(); // Reload the page to reflect changes
      }
    } catch (error) {
      console.log("error response", error);
    }
  };

  fetchData();
};

const [vendors, setVendors] = useState([]);


    useEffect(() => {
    const fetchData = async () => {
      const data = new FormData();
      try {
        const response = await axios.post(
          "https://zivaworld.online/microservices/fetch_payment_request.php"
        );
        if (response.status == 200) {
          console.log("success response", response.data);
          setVendors(response.data);
         
        }
      } catch (error) {
        console.log("error response", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto  p-4">
      <table className="w-full  border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 rounded-2xl">
            <th className="px-4 py-2 text-center">Phone Number</th>
            <th className="px-4 py-2 text-center">Amount Requested</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="px-4 py-2 text-center">
                <Link to='/' className="font-bold block w-full">{vendor.phone_number}</Link>
              </td>
              <td className="px-4 py-2 text-center">{vendor.amount}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className={`px-4 py-1 rounded-lg border border-gray-500 hover:bg-gray-200 ${sentVendors[vendor.id] ? "bg-green-500 text-white" : "bg-white"}`}
                  onClick={() => handleSend(vendor.phone_number)}
                  disabled={sentVendors[vendor.id]}
                >
                  {sentVendors[vendor.id] ? "Sent" : "Send?"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;