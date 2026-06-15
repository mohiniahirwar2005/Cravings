import React, { useState } from "react";
import deliveryboy from "../assets/deliberyboy.png";

const ContactUs = () => {
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactData);
  };

  return (
    <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid md:grid-cols-2 p-10">
      <div className="hidden md:flex items-center justify-center">
        <img src={deliveryboy} alt="" className="w-500px" />
      </div>

      <div className="flex justify-center items-center">
        <div className="w-md bg-(--background) rounded shadow p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              className="w-full border p-3 rounded mb-3"
            />

            <textarea
              rows="4"
              name="message"
              placeholder="Message"
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <button
              type="submit"
              className="w-full bg-(--primary) text-white py-3 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
