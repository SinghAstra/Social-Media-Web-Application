const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to the Database Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/post", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("This is Home Route.");
});

app.listen(5000, () => {
  console.log("Server is Listening on Port 5000");
});
