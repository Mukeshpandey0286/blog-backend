const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

const {errorMiddleware} = require("./middlewares/auth");

const db_password = process.env.DB_PASSWORD;
const db_username = process.env.DB_USERNAME;

const app = express();
const port = 8000;
const url = `mongodb+srv://${db_username}:${db_password}@testcluster.mfbdxax.mongodb.net/blog_app`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorMiddleware);

const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log("Failed to connect with MongoDB: " + error);
  }

  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
};

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment/", commentRoutes);

connection();
