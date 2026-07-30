import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign up" && !isSubmitted) {
      setIsSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    // Outer Container
    <div className="min-h-screen bg-gray-900 bg-cover bg-center flex items-center justify-center p-6 sm:p-12 backdrop-blur-3xl">
      {/* Inner Container to control max width and spacing */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-24">
        {/* --- UPGRADED LOGO SECTION --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 relative w-full">
          {/* Ambient background glow behind the logo */}
          <div className="absolute top-1/2 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

          <img
            src={assets.logo_big}
            alt="Logo"
            className="w-[180px] sm:w-[240px] lg:w-[320px] drop-shadow-2xl transition-transform hover:scale-105 duration-500"
          />

          {/* Added Typography to balance the visual weight */}
          <h1 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Connect.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
              Share.
            </span>{" "}
            Grow.
          </h1>
          <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-md">
            Join our community today. Experience a seamless and beautiful way to
            connect with people around the world.
          </p>
        </div>

        {/* --- FORM CONTAINER (Unchanged structurally, just ensuring it fits nicely) --- */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 flex flex-col gap-5 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          >
            {/* Header Section */}
            <div className="mb-2">
              <h2 className="font-semibold text-3xl tracking-tight flex items-center gap-3">
                {isSubmitted && currState === "Sign up" && (
                  <img
                    onClick={() => setIsSubmitted(false)}
                    src={assets.arrow_icon}
                    alt="Back"
                    className="w-6 cursor-pointer hover:-translate-x-1 transition-transform opacity-80 hover:opacity-100"
                    title="Go back"
                  />
                )}
                {currState}
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                {currState === "Sign up"
                  ? isSubmitted
                    ? "Tell us a bit about yourself"
                    : "Create a new account to get started"
                  : "Welcome back! Please enter your details."}
              </p>
            </div>

            {/* Inputs Section */}
            <div className="flex flex-col gap-4">
              {currState === "Sign up" && !isSubmitted && (
                <input
                  onChange={(e) => setfullName(e.target.value)}
                  value={fullName}
                  type="text"
                  className="w-full p-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="Full Name"
                  required
                />
              )}

              {!isSubmitted && (
                <>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="w-full p-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="Email Address"
                    required
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="w-full p-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="Password"
                    required
                  />
                </>
              )}

              {currState === "Sign up" && isSubmitted && (
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  required
                  className="w-full p-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  placeholder="Write something about yourself..."
                  rows={4}
                ></textarea>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 py-3.5 font-medium bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {currState === "Sign up"
                ? isSubmitted
                  ? "Complete Sign Up"
                  : "Continue"
                : "Log In"}
            </button>

            {/* Toggle State */}
            <div className="mt-4 text-center">
              {currState === "Sign up" ? (
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrState("Login");
                      setIsSubmitted(false);
                    }}
                    className="font-semibold text-violet-400 hover:text-violet-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Log in here
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-300">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrState("Sign up");
                      setIsSubmitted(false);
                    }}
                    className="font-semibold text-violet-400 hover:text-violet-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Create one
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
