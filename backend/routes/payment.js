const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Add new payment
router.post("/add", async (req, res) => {
  const { supplierId, amount, method, startDate, endDate } = req.body;
  const newPayment = new Payment({
    supplierId,
    amount,
    method,
    startDate,
    endDate,
  });

  try {
    await newPayment.save();
    res.json({ message: "Payment added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding payment" });
  }
});

// Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting payments" });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  const paymentId = req.params.id;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      res.status(404).json({ error: "Payment not found" });
    } else {
      res.json(payment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting payment" });
  }
});

// Update payment by ID
router.put("/update/:id", async (req, res) => {
  const paymentId = req.params.id;
  const { supplierId, amount, method, startDate, endDate } = req.body;

  const updatedPayment = {
    supplierId,
    amount,
    method,
    startDate,
    endDate,
  };

  try {
    await Payment.findByIdAndUpdate(paymentId, updatedPayment);
    res.json({ message: "Payment updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating payment" });
  }
});

// Delete payment by ID
router.delete("/delete/:id", async (req, res) => {
  const paymentId = req.params.id;

  try {
    await Payment.findByIdAndDelete(paymentId);
    res.json({ message: "Payment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting payment" });
  }
});

module.exports = router;
