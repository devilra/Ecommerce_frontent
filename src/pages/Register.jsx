import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../axios";
import ToastContainers from "../ToastContainer";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";

const Register = () => {
  const [form, setform] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   console.log(form);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      console.log(res.data);
      dispatch(setUser(res.data));
      toast.success("Registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setform({ name: "", email: "", password: "" });
      if (error.respone) {
        if (error.response.status === 400) {
          toast.error("User already registered 😬");
        } else {
          toast.error(error.response.data.message || "Registration failed ❌");
        }
      } else {
        toast.error("Network error or server not responding ❌");
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
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50  ">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <h2
            className="text-xl font-bold mb-4"
            onClick={() => toast.success("Hello how r u")}
          >
            Register
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              required
              onChange={handleChange}
              className="w-full border border-gray-400 border-opacity-65 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full border border-gray-400 p-3 rounded border-opacity-65 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                placeholder="password"
                required
                onChange={handleChange}
                className="w-full border border-gray-400  border-opacity-65 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="cursor-pointer absolute top-4 right-3 flex item-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full my-10 ${
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
                "Register"
              )}
            </button>
          </form>
        </div>
        <ToastContainers />
      </div>
    </div>
  );
};

export default Register;
