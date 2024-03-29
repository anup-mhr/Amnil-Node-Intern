"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.get("/list", eventController_1.eventController.getEventsByDate);
router.route("/").get(eventController_1.eventController.getEvents).post(eventController_1.eventController.createEvent);
router.route("/:eventId").get(eventController_1.eventController.getEventById).delete(eventController_1.eventController.deleteEvent);
router.get("/:eventId/register", authentication_1.authentication.verify, eventController_1.eventController.registerEvent);
exports.default = router;
