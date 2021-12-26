const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/upload");
const router = express.Router();
const itemControllers = require("../controllers/item-controllers");

router.post(
  "/create",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("lPrice").not().isEmpty(),
    check("hPrice").not().isEmpty(),
    check("creator").not().isEmpty(),
  ],
  itemControllers.createItem
);
router.get("/all",itemControllers.getItems);
router.get("/image/:filename", itemControllers.getImage);
router.post("/image/del/:id", itemControllers.deleteImage);
module.exports = router;
