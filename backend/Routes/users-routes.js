const express = require("express");
const { check } = require("express-validator");

const UserController = require("../controllers/user-controllers");

const router = express.Router();

router.post(
  "/login",
  [check("username").not().isEmpty()],
  UserController.userLogin
);

router.post(
  "/userItem",
  [check("username").not().isEmpty()],
  UserController.getUserItems
);
router.post(
  "/wishlist",
  [check("username").not().isEmpty(), check("wishlistid").not().isEmpty()],
  UserController.addwishlist
);
router.patch(
  "/wishlist",
  [check("username").not().isEmpty(), check("wishlistid").not().isEmpty()],
  UserController.removewishlist
);
router.get(
  "/wishlist",
  [check("username").not().isEmpty()],
  UserController.getwishlist
);
module.exports = router;
