"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.post("/login", userController_1.userController.loginUser);
router
    .route("/")
    .post(userController_1.userController.createUser)
    .get(authentication_1.authentication.verify, userController_1.userController.getUsers);
router
    .route("/:userId")
    .get(authentication_1.authentication.verify, userController_1.userController.getUserById)
    .delete(authentication_1.authentication.verify, userController_1.userController.deleteUser);
exports.default = router;
