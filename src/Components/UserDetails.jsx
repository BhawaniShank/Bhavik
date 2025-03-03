import React from 'react';
import { FaTshirt, FaMitten, FaSocks } from 'react-icons/fa';
import { GiTrousers } from 'react-icons/gi';

const UserDetails = () => {
  const userData = {
    address: 'Delhi 345',
    businessName: 'Lorem Textiles',
    mobileNo: '1234567890',
    joiningDate: '01-01-2020',
    totalSold: 390,
    totalMargin: '60%',
    totalItemsSold: 500,
    image: 'https://picsum.photos/200'
  };

  const clothesData = [
    { icon: <GiTrousers className="mr-2" />, name: 'Pant', sold: 100 },
    { icon: <FaTshirt className="mr-2" />, name: 'Shirt', sold: 150 },
    { icon: <FaMitten className="mr-2" />, name: 'Saree', sold: 80 },
    { icon: <FaSocks className="mr-2" />, name: 'Shocks', sold: 60 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex justify-center xl:justify-start items-center bg-gray-100 rounded-xl">
        <img
          src={userData.image}
          alt="User Photo"
          className="w-80 h-80 object-cover rounded-xl"
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
    </div>
  );
};

export default UserDetails;
