import React, { useEffect, useState } from "react";
import Registration from "./Registration";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginWithApi } from "../../apis/LoginApi";
import { toast } from "react-toastify";
import { setUser } from "../../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await loginWithApi(email, password);
      console.log("response", response);
      if (response && response?.token) {
        dispatch(setUser({ token: response?.token, userId: response?.userId }));
        toast.success("Login successful! Redirecting...");
      } else if (response?.message === "Invalid email or password ") {
        setError("Invalid email or password.");
        toast.error("Incorrect password. Please try again.");
      } else if (response?.message === "email_not_registered") {
        setError("Email is not registered.");
        toast.error("Email is not registered. Please sign up.");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-gray-100 py-10"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/flat-design-minimalist-background_23-2149987685.jpg?ga=GA1.1.735048578.1734624286&semt=ais_hybrid')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      {!token ? (
        <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
          {openRegisterForm ? (
            <Registration
              openRegisterForm={openRegisterForm}
              setOpenRegisterForm={setOpenRegisterForm}
            />
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              <div className="text-center text-sm text-gray-600 mt-4">
                <p>Don't have an account?</p>
                <button
                  onClick={() => setOpenRegisterForm(true)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Register Here
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>Welcome back!</div>
      )}
    </div>
  );
};

export default Login;
