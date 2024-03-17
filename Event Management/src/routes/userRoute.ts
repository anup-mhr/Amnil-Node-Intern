import { Router } from "express";
import { userController } from "../controllers/userController";
import { authentication } from "../middleware/authentication";

const router = Router();

/**
 * @openapi
 * /api/v1/user/login:
 *   post:
 *     tags: [User]
 *     summary: login into system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 default: demo1@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 default: 12345678
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
 *                 token:
 *                   type: string
 *                   default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDg4MzJiMDU0NzIzMWIwZDIxNjI4ZSIsImlhdCI6MTcwOTU1MTM0MCwiZXhwIjoxNzA5NjM3
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized, access denied
 */
router.post("/login", userController.loginUser);

/**
 * @openapi
 * /api/v1/user/:
 *   post:
 *     tags: [User]
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 require: true
 *               password:
 *                 type: string
 *                 format: password
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
 *   get:
 *     tags: [User]
 *     summary: Returns all users (Admin only)
 *     security:
 *       - AdminKeyAuth: []
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
 *       401:
 *         description: You are not logged in! Please login to get access
 *       403:
 *         description: You do not have permission to perform this task
 */
router
  .route("/")
  .post(userController.createUser)
  .get(authentication.verify, authentication.restrictTo("admin"), userController.getUsers);

/**
 * @openapi
 * /api/v1/user/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Fetch a user by ID (Admin only)
 *     security:
 *       - AdminKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
 *       401:
 *         description: Unauthorized, access denied
 *       403:
 *         description: Forbidden, access denied
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags: [User]
 *     summary: Delete a user by ID (Admin only)
 *     security:
 *       - AdminKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
  .route("/:userId")
  .get(authentication.verify, authentication.restrictTo("admin"), userController.getUserById)
  .delete(authentication.verify, authentication.restrictTo("admin"), userController.deleteUser);

export default router;
