const Item = require("../models/Item");
const { StatusCodes } = require("http-status-codes");

const getAllItems = async (req, res) => {
  let allItems = await Item.find({});

  if (!allItems) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No item found", success: false });
  }

  return res.status(StatusCodes.OK).json({ items: allItems, success: true });
};

const getItem = async (req, res) => {
  res.send("get single item");
};

const createItem = async (req, res) => {
  const { title, price, description, images } = req.body;

  if (!title || !price || !images) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please fill all fields", success: false });
  }

  const item = await Item.create({
    title,

    price,

    description,

    images,
  });

  res.status(StatusCodes.CREATED).json({ item });
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, price, description } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(
      id,
      { title, price, description },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Item not found", success: false });
    }

    return res.status(StatusCodes.OK).json({ item, success: true });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid data or ID", success: false });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.find({ _id: id });

  if (!item) {
    return res.send("No item matches id");
  }

  await Item.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "Item deleted", item });
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
