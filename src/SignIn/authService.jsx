// src/auth/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "@/authSlice/authSlice";

/**
 * Register a new user with email and password
 */
const registerUser = async (email, password, dispatch, navigate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    dispatch(setUser(user));
    toast.success("User Registered Successfully", {
      position: "bottom-right",
    });
    navigate("/user-profile");
  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
    throw error;
  }
};

/**
 * Login existing user with email and password
 */
const loginUser = async (email, password, dispatch, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    dispatch(setUser(user));
    toast.success("User logged in successfully", {
      position: "bottom-right",
    });

    navigate("/user-profile");
  } catch (error) {
    toast.error(error.message, { position: "bottom-right" });
    throw error;
  }
};

/**
 * Sign in with Google (forces account chooser)
 */
const googleSignin = async (dispatch, navigate) => {
  try {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
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
    throw error;
  }
};

export { registerUser, loginUser, googleSignin };
