import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("UserData"));
    setUserData(user);
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome Back,{" "}
          <span className="text-orange-500">{userData.fullName}</span> 👋
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-500 shadow-md">
            <img
              src={userData.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <h2 className="text-2xl font-semibold">
                {userData.fullName}
              </h2>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <h2 className="text-lg">{userData.email}</h2>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <h2 className="text-lg">{userData.phone}</h2>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-3xl mb-2">🛒</h3>
            <h2 className="font-semibold text-lg">My Orders</h2>
            <p className="text-gray-500 text-sm mt-1">
              View all your previous orders.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-3xl mb-2">❤️</h3>
            <h2 className="font-semibold text-lg">Wishlist</h2>
            <p className="text-gray-500 text-sm mt-1">
              Your favourite food items.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-3xl mb-2">📍</h3>
            <h2 className="font-semibold text-lg">Saved Address</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your delivery addresses.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-3xl mb-2">⚙️</h3>
            <h2 className="font-semibold text-lg">Account Settings</h2>
            <p className="text-gray-500 text-sm mt-1">
              Update your account information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;