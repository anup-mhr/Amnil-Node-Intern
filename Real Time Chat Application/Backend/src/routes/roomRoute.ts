import { Router } from "express";
import { roomCotroller } from "../controllers/roomController";
import { authentication } from "../middleware/authentication";

const router = Router();

router.post("/", authentication.verify, roomCotroller.createRoom);
router.get("/:roomId", authentication.verify, roomCotroller.getRoom);
router.delete("/:roomId", authentication.verify, roomCotroller.deleteRoom);

export default router;
