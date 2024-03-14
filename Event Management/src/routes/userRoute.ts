import { Router } from "express";
import { userController } from "../controllers/userController";
import { authentication } from "../middleware/authentication";

const router = Router();

router.post("/login", userController.loginUser);

router
  .route("/")
  .post(userController.createUser)
  .get(authentication.verify, userController.getUsers);

router
  .route("/:userId")
  .get(authentication.verify, userController.getUserById)
  .delete(authentication.verify, userController.deleteUser);

export default router;
