import React, { useEffect, useRef, useState } from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import { FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";

const Profile = () => {
  // const { user } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  console.log(image);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPreview(res.data.image);
      } catch (error) {
        console.log("Not logged in");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("image", image);
    console.log(formData);
    try {
      const res = await api.put("/auth/profile", formData);
      // console.log(res.data);
      setUser(res.data);
      alert("Profile updated!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  return (
    <div>
      <div className="p-4 flex justify-between items-center border-b border-b-neutral-500 border-dotted">
        <Link className="hover:bg-neutral-300 px-1 py-1 rounded-full" to="/">
          <TiArrowLeftThick size={20} />
        </Link>
        <h1 className="text-center font-semibold text-3xl">
          Profile <span className="text-rose-600 text-4xl">Info</span>
        </h1>
      </div>
      <div className="p-4 max-w-4xl mt-5 mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        {user ? (
          <>
            {/* Profile Summary */}
            <div className="flex flex-col items-center gap-3 w-full md:w-1/3 text-center">
              <div className="relative w-32 h-32">
                <img
                  src={preview || "/categories/avator.avif"}
                  className="w-full h-full rounded-full object-cover border shadow"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow cursor-pointer"
                >
                  <FaCamera className="text-gray-700" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <h2 className="text-xl font-bold break-words">{user.name}</h2>
              <p className="text-gray-600 break-words tracking-[1px]">
                {user.email}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-4 text-center md:text-lef underline">
                Update Profile
              </h2>

              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border px-3 py-2 border-neutral-300 rounded w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-neutral-300 px-3 py-2 rounded w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Profile
              </button>
            </form>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
