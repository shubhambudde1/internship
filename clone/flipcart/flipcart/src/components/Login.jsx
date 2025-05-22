import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showLoging, setShowLoging] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("showLogin", JSON.stringify(showLoging));
    } else {
      isMounted.current = true;
      const showLogin = localStorage.getItem("showLogin");
      if (showLogin) {
        setShowLoging(JSON.parse(showLogin));
        console.log(showLogin);
      }
    }
  }, [showLoging]);

  // Function to handle login with backend authentication
  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter email and password!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          email: trimmedEmail,
          password: trimmedPassword,
        }
      );
// console.log(response);
      const { user } = response.data; // Extract user data

      // Store user info (excluding password) in localStorage
      localStorage.setItem("currentUser", JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
      localStorage.setItem("isLoggedIn", "true");
      console.log("User logged in:", user);
      setShowLoging(true);

      // Redirect based on role
      if (user.role === "admin") {
        alert("Admin login successful!");
        navigate("/admin");
      } else {
        alert("User login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-blue-600 text-white p-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <p>Get access to your Orders, Wishlist, and Recommendations</p>
        <div className="mt-10">
          <img
            src="/images/login-illustration.png"
            alt="Login Illustration"
            className="w-full"
          />
        </div>
      </div>

      <div className="w-2/3 flex items-center justify-center p-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6">Enter Email/Mobile number</h2>
          <input
            type="text"
            placeholder="Email/Mobile number"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            onClick={handleLogin}
          >
            Submit
          </button>
          <p className="text-sm text-gray-500 mt-4">
            By continuing, you agree to Flipkart's{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-sm mt-6 text-center">
            New to Flipkart?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
