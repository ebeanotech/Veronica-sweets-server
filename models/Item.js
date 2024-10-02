const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: [80, "Title too long"],
    },
    price: {
      type: String,
      required: [true, "Please provide price"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    images: {
      type: [String],
      required: [true, "Please upload images"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: ["food", "drink"],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
