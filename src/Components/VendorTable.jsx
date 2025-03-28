import React, { useState } from "react";
import { Link } from "react-router-dom";
const vendors = [
  { id: 1, name: "vendorname", amount: "100" },
  { id: 2, name: "vendorname1", amount: "200" },
  { id: 3, name: "vendorname2", amount: "300" },
  { id: 4, name: "vendorname3", amount: "400" },
  { id: 5, name: "vendorname3", amount: "500" },
  { id: 6, name: "vendorname3", amount: "600" },
];

const VendorTable = () => {
  const [sentVendors, setSentVendors] = useState({});

  const handleSend = (id) => {
    setSentVendors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Vendor Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount Requested</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border border-gray-300">
              <Link to='/'  className="border border-gray-300 px-4 py-2 font-bold">{vendor.name}</Link>
              <td className="border border-gray-300 px-4 py-2">{vendor.amount}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className={`px-4 py-1 rounded-lg border border-gray-500 hover:bg-gray-200 ${sentVendors[vendor.id] ? "bg-green-500 text-white" : "bg-white"}`}
                  onClick={() => handleSend(vendor.id)}
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
