const express = require("express");
const Product = require("../models/productModel");
const data = require("../data");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  console.log("Sedding");
  await Product.remove({});
  const createProducts = await Product.insertMany(data.products);
  res.send({ createProducts });
});

module.exports = seedRouter;
