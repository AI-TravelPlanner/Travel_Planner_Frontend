// src/auth/SignupForm.jsx
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import PasswordGuide from "./PasswordGuide";
import { registerUser } from "./authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const valid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
    password === confirm;

  const handleSignUp = async (e) => {
    e.preventDefault();
    await registerUser(email, password, dispatch, navigate);
  };

  return (
    <form className="space-y-4" onSubmit={handleSignUp}>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4A1919] caret-[#4A1919]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordGuide password={password} />

      <PasswordInput
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm Password"
      />

      {confirm && (
        <p
          className={`text-xs mt-1 font-normal px-2 py-2 rounded ${
            password === confirm
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {password === confirm ? "Passwords match" : "Passwords don’t match"}
        </p>
      )}

      <button
        type="submit"
        disabled={!valid}
        className="w-full bg-red-900 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
