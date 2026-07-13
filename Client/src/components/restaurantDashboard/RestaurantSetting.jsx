import React from "react";

const RestaurantSetting = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Restaurant Settings
      </h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-xl">

        <div className="mb-4">
          <label className="font-semibold">
            Restaurant Name
          </label>

          <input
            type="text"
            placeholder="Food Zone"
            className="border rounded-lg p-3 w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">
            Email
          </label>

          <input
            type="email"
            placeholder="restaurant@gmail.com"
            className="border rounded-lg p-3 w-full mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">
            Phone
          </label>

          <input
            type="text"
            placeholder="9876543210"
            className="border rounded-lg p-3 w-full mt-2"
          />
        </div>

        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default RestaurantSetting;

