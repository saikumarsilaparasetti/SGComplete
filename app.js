const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const accountsRoutes = require("./routes/accountsRoutes");
const rentalRoutes = require("./routes/rentalsRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const fileUpload = require('express-fileupload')
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
const AWS = require('aws-sdk')

require("dotenv").config();
const json = express.json()
app.use(json)
app.use(fileUpload({}))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

//database connection
mongoose.connect(process.env.DB);
mongoose.connection.on("connected", () => {
  console.log("App is connected to database");
});

mongoose.connection.on("error", (err) => {
  console.log("error in connecting to data base", err);
});

//routes
app.get("*", checkUser);
app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "./static/index.html"));
  res.render("home");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/", requireAuth, (req, res) => res.render("login"));
app.use(authRoutes);
app.use(accountsRoutes);
app.use(rentalRoutes);
app.use(inventoryRoutes);

app.use('/favicon.ico', express.static('/favicon.ico'));

//creating server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("app is running on port : " + port);
});

