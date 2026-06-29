import dotenv from "dotenv";
dotenv.config();

import express from "express";

import connectDB from "./src/config/dbConection.config.js";

const app = express();

app.use(express.json());




app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravings Project" });
});

app.post("/login", (req, res) => {
  res.json({ message: "Login Sucessfull" });
});

//Default Error Handler
app.use((err,req,res,next) => {
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStatusCode = err.statusCode || "500";

  res.status(ErrStatusCode).json({message: ErrMessage});
});




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port:", port);
  connectDB();
});