import axios from "axios";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

// API URL 
    const url = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/users`;

    try {
      console.log("Attempting login for:", user); // for dev: checking its a valid user

      const response = await axios.get(url, {
        params: { username: user, password: pass },
      });

      if (response.data && response.data.length > 0) {
        //token generation
        const sessionKey = Math.random().toString(36).substring(2) + Date.now();
        localStorage.setItem("authToken", sessionKey);
        
        onLogin();
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server connection failed. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white px-8 py-10 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Member Login
        </h2>
        
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="e.g. admin"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-all"
          >
            {isSubmitting ? "Checking..." : "Sign In"}
          </button>

          {error && (
            <p className="mt-4 text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;