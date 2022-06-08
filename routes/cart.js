const router = require("express").Router();
const Cart = require("../models/Cart");

router.get("/", async (req, res) => {
  const cart = await Cart.find();
  res.json(cart);
});

router.get("/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  res.json(cart);
});

router.post("", async (req, res) => {
  const newCart = new Cart(req.body);
  const admin = req.query.admin;
  if (admin === "true") {
    try {
      const savedCart = await newCart.save();
      res.json(savedCart);
    } catch (error) {
      res.send(error);
    }
  } else res.send("Usuario no autenticado");
});

router.delete("/:id", async (req, res) => {
  const admin = req.query.admin;
  if (admin === "true") {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.json("cart deleted");
    } catch (error) {
      res.json(error);
    }
  } else res.send("Usuario no autenticado");
});

router.get("/:id/productos", async (req, res) => {
  const admin = req.query.admin;
  try {
    const cart = await Cart.findById(req.params.id);
    res.json(cart.products);
  } catch (error) {
    res.send(error);
  }
});

router.post("/:id/productos", async (req, res) => {
  const admin = req.query.admin;
  if (admin === "true") {
    try {
      const updatedProduct = await Cart.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: req.body,
        },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (err) {
      res.json(err);
    }
  } else res.send("Usuario no autenticado");
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  const admin = req.query.admin;
  if (admin === "true") {
    try {
      const cart = await Cart.findById(req.params.id);
      const deleteProduct = cart.products.filter(product=> product.id !== Number(req.params.id_prod))
      const products = {
        products: deleteProduct,
      };
      const updatedProduct = await Cart.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: products,
        },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      res.json("error");
    }
  } else res.send("Usuario no autenticado");
});
module.exports = router;
