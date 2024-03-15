import { Router } from "express";
import { userController } from "../controllers/userController";
// import { authentication } from "../middleware/authentication";

const router = Router();

router.post("/login", userController.loginUser);

router.route("/").post(userController.createUser).get(userController.getUsers);

router.route("/:userId").get(userController.getUserById).delete(userController.deleteUser);

export default router;
