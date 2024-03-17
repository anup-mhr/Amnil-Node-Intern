import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { authentication } from "../middleware/authentication";

const router = Router();

/**
 * @openapi
 * /api/v1/event/list:
 *   get:
 *     tags: [Event]
 *     summary: Returns today's all events
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: success
 *                 data:
 *                   default: []
 */
router.get("/list", eventController.getEventsByDate);

/**
 * @openapi
 * /api/v1/event/:
 *   get:
 *     tags: [Event]
 *     summary: Returns all events
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: success
 *                 result:
 *                   type: integer
 *                 data:
 *                   default: []
 *
 *   post:
 *     tags: [Event]
 *     summary: Create a Event (Admin only)
 *     security:
 *       - AdminKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: Tour
 *                 require: true
 *               description:
 *                 type: string
 *                 format: Going tour to sikim
 *                 require: true
 *               price:
 *                 type: number
 *                 default: 120.12
 *                 require: true
 *               event_date:
 *                 type: string
 *                 default: 2024-03-17
 *                 require: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: success
 *                 data:
 *                   default: {}
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized, access denied
 *       403:
 *         description: Forbidden, access denied
 *
 */
router
  .route("/")
  .get(eventController.getEvents)
  .post(authentication.verify, authentication.restrictTo("admin"), eventController.createEvent);

/**
 * @openapi
 * /api/v1/event/{eventId}:
 *   get:
 *     tags: [Event]
 *     summary: Fetch a user by ID (Admin only)
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: success
 *                 data:
 *                   default: {}
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags: [Event]
 *     summary: Delete a event by ID (Admin only)
 *     security:
 *       - AdminKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized, access denied
 *       403:
 *         description: Forbidden, access denied
 *       404:
 *         description: User not found
 */
router
  .route("/:eventId")
  .get(eventController.getEventById)
  .delete(authentication.verify, authentication.restrictTo("admin"), eventController.deleteEvent);

/**
 * @openapi
 * /api/v1/event/{eventId}/register:
 *   get:
 *     tags: [Event]
 *     summary: Register for a event
 *     security:
 *       - UserKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   default: success
 *                 data:
 *                   default: {}
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized, access denied
 *       403:
 *         description: Forbidden, access denied
 */
router.get("/:eventId/register", authentication.verify, eventController.registerEvent);

export default router;
