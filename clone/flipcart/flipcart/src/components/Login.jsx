import React from 'react';

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
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

      {/* Right Section */}
      <div className="w-2/3 flex items-center justify-center p-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6">Enter Email/Mobile number</h2>
          <input
            type="text"
            placeholder="Email/Mobile number"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Request OTP
          </button>
          <p className="text-sm text-gray-500 mt-4">
            By continuing, you agree to Flipkart's{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-sm mt-6 text-center">
            New to Flipkart?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
