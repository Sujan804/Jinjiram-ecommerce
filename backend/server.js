const express = require("express");
const data = require("./data");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seedRouter = require("./routes/seedRoutes");
const productRouter = require("./routes/productRoutes");
//Config dotenv
dotenv.config();

//Mongoose connect

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected successully");
  })
  .catch((err) => {
    console.log(err.message);
  });
mongoose.set("strictQuery", false);

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/", (req, res) => {
  console.log("hello");
  res.send("hello");
});
console.log("hello");
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server live ata http://localhost:${port}`);
});
