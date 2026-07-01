import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deliveryboy from "../assets/deliberyboy.png";
import api from "../config/api.config";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setValidateError("Please fill all fields");
      return;
    }

    try {
      const payload = {
        email: loginData.email.toLowerCase(),
        password: loginData.password,
      };

      const res = await api.post("/auth/login", payload);

      toast.success(res.data.message);

      // Save User
      sessionStorage.setItem(
        "UserData",
        JSON.stringify(res.data.data)
      );

      // Go to Dashboard
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const inputClass =
    "border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="min-h-[90vh] bggradient-to-r from-orange-100 to-orange-300 grid md:grid-cols-2 p-10">
      <div className="hidden md:flex items-center justify-center">
        <img src={deliveryboy} alt="" className="w-96" />
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className={`${inputClass} w-full`}
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className={`${inputClass} w-full`}
            />
          </div>

          {validateError && (
            <p className="text-red-500">{validateError}</p>
          )}

          <button
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-5">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-orange-500 font-semibold"
            >
              Register
            </button>
          </p>

          <p className="mt-2">
            Having Trouble?{" "}
            <button
              onClick={() => navigate("/contact-us")}
              className="text-orange-500 font-semibold"
            >
              Contact Us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;