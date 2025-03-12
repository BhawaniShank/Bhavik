import React, { useState, useRef, useEffect } from "react";
import { Menu, User, Bell, UserPlus } from "lucide-react";
import logo from "../assets/logo1.png";
import logoWhite from "../assets/logo_white.png";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

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

  return (
    <div className="h-full z-40 fixed w-full">
      {/* Main Content */}
      <div className="flex flex-col overflow-hidden flex-1">
        {/* Topbar */}
        <div className="flex min-h-[5em] items-center z-40 justify-between gap-10 px-4 py-2 bg-white shadow-md">
          <button
            className="text-gray-600 lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="p-2 hidden lg:block font-bold text-xl text-orange-600">
            <img src={logo} className="w-28" alt="Logo" />
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Role: ADMIN</h1>
            <Bell size={24} className="text-gray-600" />
            <User size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex w-full h-full">
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full min-h-[96vh] bg-[#1c1f27] transition-transform duration-300 z-30 lg:relative lg:translate-x-0 ${
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
