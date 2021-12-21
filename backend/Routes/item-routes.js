const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/upload");
const router = express.Router();
const itemControllers = require("../controllers/item-controllers");
router.post(
  "/create",
  fileUpload.single("image"),
//   [
//     check("title").not().isEmpty(),
//     check("description").isLength({ min: 10 }),
//     check("lprice").not().isEmpty(),
//     check("hprice").not().isEmpty(),
//   ],
  itemControllers.createItem
);
module.exports = router;