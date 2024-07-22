const axios = require("axios");
const ListModel = require("../Models/ListModel");

// Get data from "https://http.dog"
const getHttpDogData = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://http.dog/${id}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Save a New List
const saveList = async (req, res) => {
  const { name, items } = req.body;
  if (!name || !items) {
    return res
      .status(400)
      .json({ errorMessage: "Name and items are required." });
  }

  try {
    const newList = new ListModel({
      name,
      items,
      user: req.user._id,
    });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    // console.error("Error saving list to database:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

// Retrieve All Lists for the logged-in user
const getAllLists = async (req, res) => {
  try {
    const lists = await ListModel.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // Sort lists by date in descending order
    res.json(lists);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete a List by Name for the logged-in user
const deleteList = async (req, res) => {
  const { name } = req.params;
  try {
    const result = await ListModel.deleteOne({ name, user: req.user._id }); // Delete list for the logged-in user

    if (result.deletedCount === 0) {
      return res.status(404).json({ errorMessage: "List not found." });
    }

    res.json({ message: "List deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { getHttpDogData, saveList, getAllLists, deleteList };
