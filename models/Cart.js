const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    products: {
        type: Array,
        default: []
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("cart", cartSchema);
