import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [bio, setbio] = useState(authUser?.bio || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ fullName, bio, profilePic: base64Image });
      navigate("/");
    };
  };

  return (
    // Outer Container
    <div className="min-h-screen bg-gray-900 bg-cover bg-center flex items-center justify-center p-6 sm:p-12 backdrop-blur-3xl">
      
      {/* Inner Container / Glass Card */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 w-full order-2 md:order-1">
          
          {/* Header Section */}
          <div className="mb-2">
            <h2 className="font-semibold text-3xl tracking-tight">
              Profile Details
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Update your personal information to stand out.
            </p>
          </div>

          {/* Upgraded Avatar Upload Field */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 p-4 w-full bg-black/20 border border-white/10 rounded-xl cursor-pointer hover:border-violet-500/50 hover:bg-black/30 transition-all duration-300 group"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            
            {/* Image Preview with Camera Icon Hover */}
            <div className="relative flex-shrink-0">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : assets.avatar_icon
                }
                alt="Upload Avatar"
                className="w-14 h-14 object-cover rounded-full border-2 border-white/10 group-hover:border-violet-400 transition-colors duration-300"
              />
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>

            {/* Text Information */}
            <div className="flex flex-col flex-1">
              <span className="font-medium text-gray-200 group-hover:text-violet-400 transition-colors duration-300">
                Profile Photo
              </span>
              <span className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                Click to upload a new image (JPG, PNG)
              </span>
            </div>

            {/* Upload Icon on the Right */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-violet-500/20 text-gray-400 group-hover:text-violet-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
            </div>
          </label>

          {/* Inputs Section */}
          <div className="flex flex-col gap-4">
            <input
              className="w-full p-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              type="text"
              required
              placeholder="Full Name"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            
            <textarea
              className="w-full p-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
              rows={4}
              required
              placeholder="Write something about yourself..."
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => setbio(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 py-3.5 font-medium bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 w-full md:w-auto md:px-10"
          >
            Save Changes
          </button>
        </form>

        {/* Profile Picture Display Section */}
        <div className="w-full md:w-2/5 flex justify-center items-center order-1 md:order-2">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-600/20 rounded-full blur-[60px] -z-10 pointer-events-none"></div>
            
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : authUser?.profilePic || assets.logo_icon
              }
              alt="Profile Preview"
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProfilePage;