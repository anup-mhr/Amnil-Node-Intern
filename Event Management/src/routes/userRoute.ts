import { Router } from "express";
import { userController } from "../controllers/userController";
import { authentication } from "../middleware/authentication";

const router = Router();

router.post("/login", userController.loginUser);

router
  .route("/")
  .post(userController.createUser)
  .get(authentication.verify, authentication.restrictTo("admin"), userController.getUsers);

router
  .route("/:userId")
  .get(authentication.verify, authentication.restrictTo("admin"), userController.getUserById)
  .delete(authentication.verify, authentication.restrictTo("admin"), userController.deleteUser);

export default router;
