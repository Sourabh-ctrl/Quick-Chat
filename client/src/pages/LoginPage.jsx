import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { User, Mail, Lock, FileText, Eye, EyeOff, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 z-10">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* --- Branding Section --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 relative w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next Generation Real-Time Chat</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Connect without{" "}
            <span className="cyber-gradient-text">boundaries.</span>
          </h1>

          <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
            Experience lightning fast messaging, instant photo sharing, and rich contact collaboration in a stunning glass interface.
          </p>

          <div className="mt-8 flex items-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              End-to-end Encrypted
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Realtime Sync
            </div>
          </div>
        </div>

        {/* --- Form Container --- */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md glass-panel p-6 sm:p-8 flex flex-col gap-5 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-scale-in"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-1">
              <div>
                <h2 className="font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
                  {isSubmitted && currState === "Sign up" && (
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="p-1 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
                      title="Go back"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  {currState}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  {currState === "Sign up"
                    ? isSubmitted
                      ? "Tell us a bit about yourself"
                      : "Create your free account today"
                    : "Welcome back! Enter your details below"}
                </p>
              </div>
            </div>

            {/* Inputs Section */}
            <div className="flex flex-col gap-3.5">
              {currState === "Sign up" && !isSubmitted && (
                <div className="relative bg-slate-950/60 border border-white/10 rounded-xl flex items-center px-3.5 py-3 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all">
                  <User className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                  <input
                    onChange={(e) => setfullName(e.target.value)}
                    value={fullName}
                    type="text"
                    className="bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 flex-1 w-full"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}

              {!isSubmitted && (
                <>
                  <div className="relative bg-slate-950/60 border border-white/10 rounded-xl flex items-center px-3.5 py-3 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      className="bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 flex-1 w-full"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  <div className="relative bg-slate-950/60 border border-white/10 rounded-xl flex items-center px-3.5 py-3 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      className="bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 flex-1 w-full"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-200 ml-2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </>
              )}

              {currState === "Sign up" && isSubmitted && (
                <div className="relative bg-slate-950/60 border border-white/10 rounded-xl p-3.5 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all">
                  <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-400">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Bio / Status Message</span>
                  </div>
                  <textarea
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    required
                    className="w-full bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-slate-500 resize-none"
                    placeholder="Write something cool about yourself..."
                    rows={4}
                  ></textarea>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 py-3.5 font-semibold cyber-button text-white rounded-xl text-sm transition-all cursor-pointer"
            >
              {currState === "Sign up"
                ? isSubmitted
                  ? "Complete Sign Up"
                  : "Continue"
                : "Log In"}
            </button>

            {/* Toggle Switch */}
            <div className="mt-2 text-center">
              {currState === "Sign up" ? (
                <p className="text-xs text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrState("Login");
                      setIsSubmitted(false);
                    }}
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
                  >
                    Log in here
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setCurrState("Sign up");
                      setIsSubmitted(false);
                    }}
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
                  >
                    Create account
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

