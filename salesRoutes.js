/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales management
 */

/**
 * @swagger
 * /sales/cash:
 *   post:
 *     summary: Record cash sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produceName:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *               buyerName:
 *                 type: string
 *               salesAgentName:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cash sale recorded
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /sales/credit:
 *   post:
 *     summary: Record credit/deferred sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerName:
 *                 type: string
 *               buyerNIN:
 *                 type: string
 *               location:
 *                 type: string
 *               contacts:
 *                 type: string
 *               amountDue:
 *                 type: number
 *               salesAgentName:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               produceName:
 *                 type: string
 *               produceType:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               dispatchDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Credit sale recorded
 *       400:
 *         description: Validation error
 */
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Sale = require("../models/Sale");

/**
 * @swagger
 * /sales/cash:
 *   post:
 *     summary: Record cash sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produceName:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *               buyerName:
 *                 type: string
 *               salesAgentName:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cash sale recorded
 *       400:
 *         description: Validation error
 */
// POST: record cash sale
router.post("/cash", [
  body("produceName").notEmpty(),
  body("tonnage").isNumeric().isInt({ min: 100 }),
  body("amountPaid").isNumeric().isInt({ min: 10000 }),
  body("buyerName").isLength({ min: 2 }),
  body("salesAgentName").isLength({ min: 2 }),
  body("date").notEmpty(),
  body("time").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const sale = new Sale({ ...req.body, saleType: "cash" });
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /sales/credit:
 *   post:
 *     summary: Record credit/deferred sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerName:
 *                 type: string
 *               buyerNIN:
 *                 type: string
 *               location:
 *                 type: string
 *               contacts:
 *                 type: string
 *               amountDue:
 *                 type: number
 *               salesAgentName:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               produceName:
 *                 type: string
 *               produceType:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               dispatchDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Credit sale recorded
 *       400:
 *         description: Validation error
 */
// POST: record credit/deferred sale
router.post("/credit", [
  body("buyerName").isLength({ min: 2 }),
  body("buyerNIN").matches(/^C[A-Z0-9]{12}$/),
  body("location").isLength({ min: 2 }),
  body("contacts").matches(/^\+?\d{9,15}$/),
  body("amountDue").isNumeric().isInt({ min: 10000 }),
  body("salesAgentName").isLength({ min: 2 }),
  body("dueDate").notEmpty(),
  body("produceName").notEmpty(),
  body("produceType").notEmpty(),
  body("tonnage").isNumeric().isInt({ min: 100 }),
  body("dispatchDate").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const sale = new Sale({ ...req.body, saleType: "credit" });
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
