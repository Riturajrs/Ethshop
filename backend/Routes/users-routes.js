const express = require("express");
const { check } = require("express-validator");

const UserController = require("../controllers/user-controllers");

const router = express.Router();

router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  UserController.userLogin
);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  UserController.userSignup
);

router.post(
  "/userItem",
  [check("email").not().isEmpty()],
  UserController.getUserItems
);
router.post(
  "/wishlist",
  [check("wishlistid").not().isEmpty()],
  UserController.addwishlist
);
router.patch(
  "/wishlist",
  [check("wishlistid").not().isEmpty()],
  UserController.removewishlist
);
router.get(
  "/wishlist",
  UserController.getwishlist
);
module.exports = router;
