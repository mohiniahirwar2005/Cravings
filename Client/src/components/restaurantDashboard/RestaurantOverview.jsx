import React from "react";

const RestaurantOverview = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Total Orders</h2>
          <h1 className="text-3xl font-bold mt-2">150</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Revenue</h2>
          <h1 className="text-3xl font-bold text-green-600 mt-2">
            ₹48,500
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Menu Items</h2>
          <h1 className="text-3xl font-bold mt-2">32</h1>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Pending Orders</h2>
          <h1 className="text-3xl font-bold text-red-500 mt-2">
            8
          </h1>
        </div>

      </div>

    </div>
  );
};

export default RestaurantOverview;

