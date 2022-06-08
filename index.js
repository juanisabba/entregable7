const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart")
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGODB,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connection successfull"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);

app.listen(8080, () => {
  console.log("running");
});
