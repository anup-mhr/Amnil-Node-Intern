const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const authentication = require("./../../middleware/authentication");

const router = express.Router();

/**
 * @openapi
 * /analytics/calculate-total-renevue:
 *   get:
 *     tags: [analytics]
 *     summary: calculate total renevue of products
 *     description: calculate the total revenue generated from orders in the past month, broken down by product category
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
 *                 data:
 *                   default: []
 *       401:
 *         description: You are not logged in! Please login to get access
 *       403:
 *         description: You do not have permission to perform this task
 */
router.get(
  "/calculate-total-renevue",
  authentication.verify,
  authentication.restrictTo("admin"),
  analyticsController.calculateTotalRevenueFromOrders,
);

/**
 * @openapi
 * /analytics/compare-sales-performance:
 *   get:
 *     tags: [analytics]
 *     summary: compare sales performance
 *     description: compare the sales performance of products in the current year with the previous year, including the percentage change in sales for each product.
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
 *                 data:
 *                   default: []
 *       401:
 *         description: You are not logged in! Please login to get access
 *       403:
 *         description: You do not have permission to perform this task
 */
router.get(
  "/compare-sales-performance",
  authentication.verify,
  authentication.restrictTo("admin"),
  analyticsController.compareSalesPerformance,
);

/**
 * @openapi
 * /analytics/analyze-abandoned-cart:
 *   get:
 *     tags: [analytics]
 *     summary: analyze abandoned carts
 *     description: analyze the frequency and reasons for abandoned shopping carts, including identifying common patterns or products left in carts without completing the purchase
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
 *                 data:
 *                   default: []
 *       401:
 *         description: You are not logged in! Please login to get access
 *       403:
 *         description: You do not have permission to perform this task
 */
router.get(
  "/analyze-abandoned-cart",
  authentication.verify,
  authentication.restrictTo("admin"),
  analyticsController.frequancyAndReasonForAbandonedCart,
);

/**
 * @openapi
 * /analytics/calculate-sales-performance-in-different-regions:
 *   get:
 *     tags: [analytics]
 *     summary: calculate sales performance in different regions
 *     description: Assess the sales performance of products across different geographical regions by calculating the total revenue generated by each product category in each region in the current year.
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
 *                 data:
 *                   default: []
 *       401:
 *         description: You are not logged in! Please login to get access
 *       403:
 *         description: You do not have permission to perform this task
 */
router.get(
  "/calculate-sales-performance-in-different-regions",
  authentication.verify,
  authentication.restrictTo("admin"),
  analyticsController.calculateSalesPerformanceInRegions,
);

module.exports = router;
