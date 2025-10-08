// src/auth/LoginForm.jsx
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { loginUser } from "./authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginForm = ({ setMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password, dispatch, navigate);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.info("No account found. Redirecting to Sign Up...", {
          position: "bottom-right",
        });
        setMode("signup");
      } else {
        toast.error(error.message, { position: "bottom-right" });
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
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
      <button
        type="submit"
        className="w-full bg-red-900 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
