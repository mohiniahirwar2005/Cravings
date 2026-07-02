import React from "react";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-red-500 h-36 relative">
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
              <img
                src={user.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 pb-10 px-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Glad to see you again!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {/* Name */}
            <div className="bg-orange-50 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
              <h3 className="text-gray-500 text-sm mb-2">Full Name</h3>
              <p className="text-xl font-semibold text-gray-800">
                {user.fullName}
              </p>
            </div>

            {/* Email */}
            <div className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
              <h3 className="text-gray-500 text-sm mb-2">Email</h3>
              <p className="text-lg font-semibold text-gray-800 break-all">
                {user.email}
              </p>
            </div>

            {/* Phone */}
            <div className="bg-green-50 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300">
              <h3 className="text-gray-500 text-sm mb-2">Phone</h3>
              <p className="text-xl font-semibold text-gray-800">
                {user.phone}
              </p>
            </div>
          </div>

          {/* Bottom Welcome Card */}
          <div className="mt-10 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center shadow-lg">
            <h2 className="text-2xl font-bold">
              Hello, {user.fullName}! 🎉
            </h2>
            <p className="mt-2 text-orange-100">
              Welcome to your dashboard. Here you can manage your profile and
              explore all available features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;