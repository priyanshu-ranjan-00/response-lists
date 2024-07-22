const express = require("express");
const {
  getHttpDogData,
  saveList,
  getAllLists,
  deleteList,
} = require("../controllers/dogController");
const authMiddleware = require("../authMiddleware");
const router = express.Router();

router.get("/httpdog/:id", getHttpDogData);

router.post("/new", authMiddleware, saveList);

router.get("/all", authMiddleware, getAllLists);

router.delete("/:name", authMiddleware, deleteList);

module.exports = router;
