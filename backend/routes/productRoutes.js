const express = require("express");
const Product = require("../models/productModel");

const productRouter = express.Router();

//Routes
productRouter.get("/", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  if (products) {
    res.send(products);
  } else {
    res.status(404).send({
      message: "Product not Found",
    });
  }
});

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne((x) => x.slug == req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Product not Found",
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Product not Found",
    });
  }
});

module.exports = productRouter;
