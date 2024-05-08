import express from 'express';
import OrderPayment from '../models/OrderPayment.js';
import multer from 'multer'; // For handling file uploads
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/slips'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname); // Rename file with timestamp
    }
});

// Filter for file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// Set up multer upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Route for creating a new order payment
router.post('/', async (req, res) => {
    try {
        const { order, totalPrice, status } = req.body;
        const newOrderPayment = new OrderPayment({ order, totalPrice, status });
        await newOrderPayment.save();
        res.status(201).json(newOrderPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route for updating an order payment with slip upload
router.put('/:id/upload-slip', upload.single('slip'), async (req, res) => {
    try {
        const orderPayment = await OrderPayment.findById(req.params.id);
        if (!orderPayment) {
            return res.status(404).json({ message: 'Order payment not found' });
        }
        // Update slip field with the filename of the uploaded file
        orderPayment.slip = req.file.filename;
        // Update status to 'Completed'
        orderPayment.status = 'Completed';
        await orderPayment.save();
        res.status(200).json(orderPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', upload.single('slip'), async (req, res) => {
    try {
        const orderPayment = await OrderPayment.findById(req.params.id);
        if (!orderPayment) {
            return res.status(404).json({ message: 'Order payment not found' });
        }
        // Update fields if provided in request body
        if (req.body.order) {
            orderPayment.order = req.body.order;
        }
        if (req.body.totalPrice) {
            orderPayment.totalPrice = req.body.totalPrice;
        }
        if (req.file) {
            // Update slip field with the filename of the uploaded file
            orderPayment.slip = req.file.filename;
            // Update status to 'Completed'
            orderPayment.status = 'Completed';
        }
        await orderPayment.save();
        res.status(200).json(orderPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Route for deleting an order payment
router.delete('/:id', async (req, res) => {
    try {
        const orderPayment = await OrderPayment.findByIdAndDelete(req.params.id);
        if (!orderPayment) {
            return res.status(404).json({ message: 'Order payment not found' });
        }
        res.status(200).json({ message: 'Order payment deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route for retrieving all order payments
router.get('/', async (req, res) => {
    try {
        const orderPayments = await OrderPayment.find().populate('order');
        res.status(200).json(orderPayments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for retrieving a specific order payment's slip
router.get('/:id/slip', async (req, res) => {
    try {
        const orderPayment = await OrderPayment.findById(req.params.id);
        if (!orderPayment) {
            return res.status(404).json({ message: 'Order payment not found' });
        }

        // Check if slip exists
        if (!orderPayment.slip) {
            return res.status(404).json({ message: 'Slip not found' });
        }

        // Read the PDF file
        const filePath = path.join(__dirname, '../uploads/slips', orderPayment.slip);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading file' });
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.send(data);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const orderPayment = await OrderPayment.findById(req.params.id).populate('order');
        if (!orderPayment) {
            return res.status(404).json({ message: 'Order payment not found' });
        }
        res.status(200).json(orderPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
export default router;
