import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="bg-(--primary) text-lg text-(--primary-text) px-6 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="block overflow-visible">
          <img
            src={logo}
            alt="Cravings Logo"
            className="h-12 w-auto transform scale-150"
          />
        </Link>
      </div>
     
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/login" className="hover:underline hover:text-(--accent)">
          Login
        </Link>

        <Link to="/register" className="hover:underline hover:text-(--accent)">
          Register
        </Link>

        <Link
          to="/contact-us"
          className="hover:underline hover:text-(--accent)"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
