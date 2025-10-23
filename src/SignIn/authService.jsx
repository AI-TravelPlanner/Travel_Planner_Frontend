// src/auth/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { setUser } from "@/authSlice/authSlice";

// Register new user
const registerUser = (email, password, dispatch, navigate) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(setUser(user));
      toast.success("User Registered Successfully", {
        position: "bottom-right",
      });
      navigate("/user-profile");
    })
    .catch((error) => {
      toast.error(error.message, { position: "bottom-right" });
      throw error;
    });

// Login existing user
const loginUser = (email, password, dispatch, navigate) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(setUser(user));
      toast.success("User logged in successfully", {
        position: "bottom-right",
      });
      navigate("/user-profile");
    })
    .catch((error) => {
      throw error;
    });

// Google Sign-in
const googleSignin = async (dispatch, navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    dispatch(setUser(user));
    toast.success("Signed in with Google successfully.", {
      position: "bottom-right",
    });
    navigate("/user-profile");
  } catch (error) {
    toast.error(`Google Sign-in failed: ${error.message}`, {
      position: "bottom-right",
    });
  }
};

export { registerUser, loginUser, googleSignin };
