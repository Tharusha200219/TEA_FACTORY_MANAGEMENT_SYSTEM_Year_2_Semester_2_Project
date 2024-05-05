import express from "express";
import PaymentEmployee from "../models/PaymentEmployee.js";

const router = express.Router();

// Add new payment
router.post("/add", async (req, res) => {
  const { employeeId, amount, method, startDate, endDate } = req.body;
  const newPayment = new PaymentEmployee({
    employeeId,
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
    const payments = await PaymentEmployee.find();
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
    const payment = await PaymentEmployee.findById(paymentId);
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
  const { employeeId, amount, method, startDate, endDate } = req.body;

  const updatedPayment = {
    employeeId,
    amount,
    method,
    startDate,
    endDate,
  };

  try {
    await PaymentEmployee.findByIdAndUpdate(paymentId, updatedPayment);
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
    await PaymentEmployee.findByIdAndDelete(paymentId);
    res.json({ message: "Payment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting payment" });
  }
});

export default router;
