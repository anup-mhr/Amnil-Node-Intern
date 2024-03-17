import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { authentication } from "../middleware/authentication";

const router = Router();

router.get("/list", eventController.getEventsByDate);

router
  .route("/")
  .get(eventController.getEvents)
  .post(authentication.verify, authentication.restrictTo("admin"), eventController.createEvent);

router
  .route("/:eventId")
  .get(eventController.getEventById)
  .delete(authentication.verify, authentication.restrictTo("admin"), eventController.deleteEvent);

router.get("/:eventId/register", authentication.verify, eventController.registerEvent);

export default router;
