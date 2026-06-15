import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="min-h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) flex items-center justify-center px-10">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-6xl font-bold">
            Your Favorite Food, Delivered Fast
          </h1>

          <p className="mt-6 text-lg text-(--primary-text)">
            Order from your favourite restaurants and get delicious food
            delivered to your doorstep.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-(--accent) px-6 py-3 rounded-lg text-white font-semibold"
            >
              Sign Up
            </Link>

            <Link
              to="/contact-us"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
            >
              Contact Us
            </Link>
          </div>

          <input
            type="text"
            placeholder="Search restaurants..."
            className="mt-8 w-full p-4 rounded-lg bg-white text-black"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
