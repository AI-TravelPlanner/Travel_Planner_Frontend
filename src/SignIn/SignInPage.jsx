import React, { useState } from "react";
import Logo from "@/components/logo"


const AuthPage = () => {
    const [mode, setMode] = useState("login");

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg flex overflow-hidden max-w-4xl w-full">

                {/* Left Side */}
                <div className="w-1/2 relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1590197794698-1f4e1ac3d496?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FuYWRhJTIwZmxhZ3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Canada Flag"
                        className="h-full w-full object-cover object-left"
                    />
                    <div className="absolute top-5 left-5 text-white font-bold text-lg flex items-center">
                        <Logo />
                        NOMADIC
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">Get Started Now !</h2>
                    <p className="text-gray-500 mb-6">Don’t miss out</p>

                    {/* Toggle buttons */}
                    <div className="flex bg-gray-100 rounded-full p-1 mb-6">
                        <button
                            className={`flex-1 py-2 rounded-full ${mode === "login" ? "bg-white shadow" : "text-gray-500"
                                }`}
                            onClick={() => setMode("login")}
                        >
                            Log in
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-full ${mode === "signup" ? "bg-white shadow" : "text-gray-500"
                                }`}
                            onClick={() => setMode("signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2" />
                            I agree to the{" "}
                            <a href="#" className="text-indigo-600 underline ml-1">
                                Terms & Privacy
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-900 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition"
                        >
                            {mode === "login" ? "Login" : "Sign Up"}
                        </button>
                    </form>

                    <div className="my-4 text-center text-gray-400 text-sm">OR</div>

                    {/* Google Button */}
                    <button className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-50">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
