import React, { useState, useRef, useEffect } from "react";
import { Menu, User, Bell, UserPlus } from "lucide-react";
import logo from "../assets/logo1.png";
import logoWhite from "../assets/logo_white.png";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import VendorTable from "./VendorTable";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);

  return (
    <div className="h-full z-30 fixed w-full">
      {/* Main Content */}
      <div className="flex flex-col overflow-hidden flex-1">
        {/* Topbar */}
        <div className="flex min-h-[5em] items-center z-30 justify-between gap-10 px-4 py-2 bg-white shadow-md">
          <button
            className="text-gray-600 lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="p-2 hidden lg:block font-bold text-xl text-orange-600">
            <img src={logo} className="w-28" alt="Logo" />
          </div>

          
          <button
        className="flex items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FaBell size={24} className="text-gray-600" />
      </button>
      {open &&
      <div ref={dropdownRef} className="absolute right-0  top-16 bg-white">
     <VendorTable/>
     </div>
}
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex w-full  h-full">
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full min-h-[96vh] bg-[#1c1f27] transition-transform duration-300 z-40 lg:relative lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col-reverse min-w-64 w-full justify-between h-full">
            <div className="p-4 opacity-100 lg:opacity-0 self-center font-bold text-xl text-orange-600">
              <img src={logoWhite} className="w-28" alt="Logo White" />
            </div>
            <nav className="mt-28 lg:mt-[2vh] space-y-2">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-500"
              >
                <span className="mr-2">
                  <MdDashboard />
                </span>{" "}
                Dashboard
              </Link>

              <Link
                to="/contact"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-500"
              >
                <span className="mr-2">
                  <FaUser />
                </span>{" "}
                Users
              </Link>
              <Link
               to="/admin"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-orange-500"
              >
                <span className="mr-2">
                  <UserPlus />
                </span>{" "}
               Add Users
              </Link>
            </nav>
          </div>
        </div>

        {/* Placeholder for main content */}
        <div className="overflow-y-auto pb-28 bg-gray-50 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
