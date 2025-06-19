import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/authContext";

const AuthForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url(./image/login_image.png)]  bg-cover bg-center  px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        {/* Animated Logo */}
        <img
          src="data:image/png;base64,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"
          alt="Logo"
          className="w-32 mx-auto mb-6 animate-bounce"
        />
        <h1 className="text-3xl font-bold text-center gap-6">Surveillance System</h1>

        <h2 className=" font-bold mb-6">{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Not a member?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Signup now" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
