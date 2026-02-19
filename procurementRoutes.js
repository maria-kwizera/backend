
/**
 * @swagger
 * tags:
 *   name: Procurement
 *   description: Procurement management
 */

const express = require("express");
const { body, validationResult } = require("express-validator");
// ...existing code...
const Procurement = require("../models/Procurement");

/**
 * @swagger
 * /procurement:
 *   post:
 *     summary: Record procurement
 *     tags: [Procurement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produceName:
 *                 type: string
 *               produceType:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               cost:
 *                 type: number
 *               dealerName:
 *                 type: string
 *               branch:
 *                 type: string
 *                 enum: [Maganjo, Matugga]
 *               contact:
 *                 type: string
 *               sellingPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Procurement recorded
 *       400:
 *         description: Validation error
 */

const express = require("express");
const { body, validationResult } = require("express-validator");
// Removed duplicate router declaration
const Procurement = require("../models/Procurement");

// POST: record procurement with validation
router.post(
  "/",
  [
    body("produceName").isAlphanumeric("en-US", { ignore: " " }).withMessage("Produce name must be alphanumeric."),
    body("produceType").isAlpha("en-US", { ignore: " " }).isLength({ min: 2 }).withMessage("Produce type must be at least 2 alphabetic characters."),
    body("date").notEmpty().withMessage("Date is required."),
    body("time").notEmpty().withMessage("Time is required."),
    body("tonnage").isNumeric().isInt({ min: 100 }).withMessage("Tonnage must be at least 100kg."),
    body("cost").isNumeric().isInt({ min: 10000 }).withMessage("Cost must be at least 5 digits."),
    body("dealerName").isAlphanumeric("en-US", { ignore: " " }).isLength({ min: 2 }).withMessage("Dealer name must be at least 2 alphanumeric characters."),
    body("branch").isIn(["Maganjo", "Matugga"]).withMessage("Branch must be Maganjo or Matugga."),
    body("contact").matches(/^\+?\d{9,15}$/).withMessage("Contact must be a valid phone number."),
    body("sellingPrice").isNumeric().isInt({ min: 10000 }).withMessage("Selling price must be at least 5 digits."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const procurement = new Procurement(req.body);
      await procurement.save();
      res.status(201).json(procurement);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
