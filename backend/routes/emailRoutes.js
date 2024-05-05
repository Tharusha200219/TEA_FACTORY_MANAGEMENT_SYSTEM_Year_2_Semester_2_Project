// emailRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';
import { Employee } from '../models/employeeModel.js'; // Import Employee model

const router = express.Router();

// Define your nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email service
  service: 'Gmail',
  auth: {
    user: '2001imashaperera@gmail.com',
    pass: 'dxqq gfym qnym blwf',
  },
});

// Define your API endpoint to send emails
router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Find the employee by email address
    const employee = await Employee.findOne({ employeeEmail: to });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Send mail with defined transport object
    await transporter.sendMail({
      from: '2001imashaperera@gmail.com', // Use your own email address as the sender
      to: to, // Use the recipient's email address from the request body
      subject: subject,
      text: text,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router as the default export
export default router;
