const express = require("express");
const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");
const authentication = require("./../../middleware/authentication");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(authentication.verify, authentication.restrictTo("admin"), userController.getAllUsers);
// .post(userController.createUser)

router
  .route("/:id")
  .put(authentication.verify, userController.updateUser)
  .delete(authentication.verify, authentication.restrictTo("admin"), userController.deleteUser);

module.exports = router;
