import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { User, FileText, Camera, ArrowLeft, Save, Sparkles } from "lucide-react";

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
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 z-10">
      
      <div className="w-full max-w-4xl glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-10 animate-scale-in relative">
        
        {/* Top Floating Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 p-2 rounded-xl bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chat</span>
        </button>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 w-full pt-10 md:pt-4 order-2 md:order-1">
          
          <div>
            <h2 className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
              Profile Settings
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Customize your profile picture, display name, and status bio.
            </p>
          </div>

          {/* Upgraded Avatar Upload */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 p-3.5 w-full bg-slate-950/60 border border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg, .webp"
              hidden
            />
            
            <div className="relative shrink-0">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : authUser?.profilePic || assets.avatar_icon
                }
                alt="Upload Avatar"
                className="w-14 h-14 object-cover rounded-xl border-2 border-indigo-500/40 group-hover:border-indigo-400 transition-colors"
              />
              <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-indigo-400 transition-colors">
                Profile Photo
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Click to upload new photo (PNG, JPG)
              </span>
            </div>

            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 group-hover:bg-indigo-600/30 text-slate-400 group-hover:text-indigo-300 transition-colors">
              <Camera className="w-4 h-4" />
            </div>
          </label>

          {/* Inputs Section */}
          <div className="flex flex-col gap-3.5">
            <div className="relative bg-slate-950/60 border border-white/10 rounded-xl flex items-center px-3.5 py-3 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all">
              <User className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
              <input
                className="bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 flex-1 w-full"
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            
            <div className="relative bg-slate-950/60 border border-white/10 rounded-xl p-3.5 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Bio / Status</span>
              </div>
              <textarea
                className="w-full bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 resize-none"
                rows={4}
                required
                placeholder="Write something cool about yourself..."
                value={bio}
                onChange={(e) => setbio(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 py-3 px-6 font-semibold cyber-button text-white rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </form>

        {/* Profile Picture Display Preview Card */}
        <div className="w-full md:w-2/5 flex flex-col justify-center items-center order-1 md:order-2 pt-6 md:pt-0">
          <div className="relative group">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-500/25">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : authUser?.profilePic || assets.avatar_icon
                }
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-[22px] bg-slate-900"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-3 text-center">Live Profile Card Preview</p>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;