const express = require("express");
const data = require("./data");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seedRouter = require("./routes/seedRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLINT_ID || "sb");
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

console.log("hello");
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server live ata http://localhost:${port}`);
});
