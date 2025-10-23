// src/auth/AuthPage.jsx
import { useState } from "react";
import Logo from "@/components/logo";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { googleSignin } from "./authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1590197794698-1f4e1ac3d496?fm=jpg&q=60&w=3000"
          alt="Canada Flag"
          className="h-full w-full"
        />
        <div className="absolute top-5 left-5 text-white font-bold text-lg flex items-center">
          <Logo />
          NOMADIC
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">
            Get Started Now!
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Don’t miss out
          </p>

          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button
              className={`flex-1 py-2 rounded-full cursor-pointer ${
                mode === "login" ? "bg-white shadow" : "text-gray-500"
              }`}
              onClick={() => setMode("login")}
            >
              Log in
            </button>
            <button
              className={`flex-1 py-2 rounded-full cursor-pointer ${
                mode === "signup" ? "bg-white shadow" : "text-gray-500"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {mode === "login" ? <LoginForm setMode={setMode} /> : <SignupForm />}

          <div className="my-4 text-center text-gray-400 text-sm">OR</div>

          <button
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => googleSignin(dispatch, navigate)}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
