import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { RiContactsFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import api from "../axios";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [loadings, setLoadings] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setLoadings(true);
    dispatch(logout());
    try {
      await api.post("/auth/logout");
    } catch (error) {
      toast.error("Server logout failed. But you're logged out locally.");
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow fixed top-0 p-4 flex justify-between w-full z-50 items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        FlipMart
      </Link>
      <div>
        {loading ? (
          <div className="flex gap-4 items-center animate-pulse">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
          </div>
        ) : user ? (
          <div className="flex gap-4 items-center relative " ref={dropdownRef}>
            <h1 className="font-bold text-[16px]">{user.name}</h1>
            <button
              onClick={() => setDropDown(!dropDown)}
              className="bg-neutral-900 text-white px-3 rounded-full py-1"
            >
              {loading ? "loading" : user.email[0]}
            </button>
            {dropDown && (
              <div className="w-60 absolute mt-2 right-0 top-10 bg-white shadow-md rounded-md py-2 z-50">
                {/* <div className="absolute right-4 top-[-8px] w-4 rotate-45 h-4 bg-white shadow-md z-10" /> */}
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-neutral-300"
                >
                  <RiContactsFill className="px-2" size={30} /> Personal Info
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 hover:bg-neutral-300 "
                >
                  <FaLock className="px-2" size={30} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className="mx-2 font-semibold text-blue-500">
              Login
            </Link>
            <Link to="/register" className="mx-2 font-semibold text-blue-500">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
