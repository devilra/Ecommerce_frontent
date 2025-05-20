import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import api from "./axios";
import { setLoading, setUser } from "./redux/authSlice";
import { toast } from "react-toastify";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/profile"];
  const didFetchUser = useRef(false); // 👈 prevent multiple or wrong calls

  useEffect(() => {
    if (didFetchUser.current) return; // ✅ run only once
    didFetchUser.current = true;
    // const loadUser = async () => {
    //   try {
    //     dispatch(setLoading(true));

    //     if (hideNavbar.includes(location.pathname)) {
    //       dispatch(setLoading(false));
    //       return;
    //     }

    //     const res = await api.get("/auth/profile");
    //     dispatch(setUser(res.data));
    //   } catch (error) {
    //     dispatch(setLoading(false));
    //     if (!hideNavbar.includes(location.pathname)) {
    //       if (error.response && error.response.status === 401) {
    //         console.error("error");
    //       } else {
    //         toast.error("Failed to fetch user info. Try again later.");
    //       }
    //     }
    //   }
    // };
    // loadUser();

    const loadUser = async () => {
      try {
        dispatch(setLoading(true));
        const res = await api.get("/auth/profile");
        dispatch(setUser(res.data));
      } catch (error) {
        dispatch(setLoading(false));
        if (!hideNavbar.includes(location.pathname)) {
          if (error.response && error.response.status === 401) {
            console.error("error");
          } else {
            toast.error("Failed to fetch user info. Try again later.");
          }
        }
      }
    };

    loadUser();
  }, [dispatch]);

  return (
    <div>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
