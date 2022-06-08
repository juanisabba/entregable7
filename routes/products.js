const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const products = await Product.find({ _id: req.params.id });
  res.json(products);
});

router.post("", async (req, res) => {
  const newProduct = new Product(req.body);
  const admin = req.query.admin
  if (admin === "true") {
    try {
      const savedProduct = await newProduct.save();
      res.json(savedProduct);
    } catch (error) {
      res.send(error);
    }
  } else res.send("Usuario no autenticado");
});



router.put("/:id", async (req, res) => {
  const admin = req.query.admin
  if (admin === "true") {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (err) {
      res.json(err);
    }
  } else res.send("Usuario no autenticado");
});

router.delete("/:id", async(req, res) => {
  const admin = req.query.admin
  if (admin === "true") {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json("product deleted");  
    } catch (error) {
      res.json(error)
    }
  } else res.send("Usuario no autenticado");
});

module.exports = router;
