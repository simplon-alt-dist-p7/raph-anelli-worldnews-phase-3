require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const articlesRoutes = require("./routes/articles");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://votredomaine.com", "http://reader-front:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/articles", articlesRoutes);

module.exports = app;