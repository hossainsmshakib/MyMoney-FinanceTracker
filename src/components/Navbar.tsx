import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import {
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { path: "/budgets", label: "Budgets", icon: <FaWallet /> },
    { path: "/transactions", label: "Transactions", icon: <FaExchangeAlt /> },
  ];

  return (
    <nav className="bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="/MyMoney.png"
              alt="MyMoney Logo"
              className="h-12 w-auto mr-3"
            />
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-300"
                } px-1 py-6 text-sm font-medium flex items-center transition duration-200 ease-in-out`}
              >
                <span
                  className={`mr-2 transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-blue-400"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
            {user && (
              <div className="flex items-center ml-8 border-l pl-8 border-gray-200">
                <span className="text-gray-600 mr-4 flex items-center text-sm">
                  <FaUserCircle className="mr-2 text-blue-500 h-5 w-5" />
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium text-sm py-2 px-4 rounded-md flex items-center transition duration-200 ease-in-out"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-200 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-blue-600 bg-white"
                    : "text-gray-600 hover:text-blue-600 hover:bg-white"
                } block px-3 py-2 rounded-md text-base font-medium flex items-center transition duration-200 ease-in-out`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  className={`mr-2 ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <FaUserCircle className="h-10 w-10 text-blue-500" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.username}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md flex items-center justify-center transition duration-200 ease-in-out"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
