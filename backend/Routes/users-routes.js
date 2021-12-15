const express = require("express");
const { check } = require("express-validator");

const UserController = require("../controllers/user-controllers");

const router = express.Router();

router.post(
  "/userItem",
  [check("username").not().isEmpty()],
  UserController.getUserItems
);
module.exports = router;