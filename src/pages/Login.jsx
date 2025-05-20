import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TailSpin } from "react-loader-spinner";
import api from "../axios";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ToastContainers from "../ToastContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log(res);
      dispatch(setUser(res.data));
      if (res.status === 200) {
        toast.success("Login Successfully", {
          onClose: () => {
            setLoading(false);
            navigate("/");
          },
          autoClose: 2000,
        });
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Invalid Credential");
        } else {
          toast.error("Check your Account");
        }
      } else {
        ("Network error or server not responding ❌");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className="text-[18px] md:text-3xl md:py-10 font-bold p-3 cursor-pointer"
      >
        Flip <span className="text-rose-700  font-bold text-xl">Mart</span>
      </Link>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-400 border-opacity-65 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full border border-gray-400 p-3 border-opacity-65 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="cursor-pointer absolute top-4 right-3 flex item-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full my-3 ${
                  loading
                    ? "bg-blue-600 text-white p-3 rounded bg-opacity-40 cursor-not-allowed"
                    : "bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                }`}
              >
                {loading ? (
                  <span className="flex justify-center">
                    <TailSpin
                      visible={true}
                      height="24"
                      width="24"
                      color="#4fa94d"
                      ariaLabel="tail-spin-loading"
                    />
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
        <ToastContainers />
      </div>
    </div>
  );
};

export default Login;
