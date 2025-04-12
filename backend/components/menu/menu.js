const express = require("express");
const router = express.Router();
const { getAllMenus, addMenuItem } = require("./menuController");

router.get("/", getAllMenus);
router.post("/", addMenuItem);

module.exports = router;
