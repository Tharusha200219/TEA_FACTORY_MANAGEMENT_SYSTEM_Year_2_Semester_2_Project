import express from "express";
import { SupplyRecord } from "../models/supplyrecordModel.js";

const router = express.Router();

// Route to save a new supply record entry
router.post('/', async (req, res) => {
    try {
        const { supplier, date, quantity, unitPrice } = req.body;

        if (!supplier || !date || !quantity || !unitPrice) {
            return res.status(400).send({ message: 'Please provide all required fields: supplier, date, quantity, unitPrice' });
        }

        const newSupplyRecord = new SupplyRecord({
            supplier,
            date,
            quantity,
            unitPrice
        });

        const savedSupplyRecord = await newSupplyRecord.save();

        return res.status(201).json(savedSupplyRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error creating supply record' });
    }
});

// Route to get all supply record entries
router.get('/', async (req, res) => {
    try {
        const allSupplyRecords = await SupplyRecord.find({});
        return res.status(200).json(allSupplyRecords);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error retrieving supply records' });
    }
});

// Route to get a supply record entry by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const supplyRecord = await SupplyRecord.findById(id);
        if (!supplyRecord) {
            return res.status(404).send({ message: 'Supply record not found' });
        }
        return res.status(200).json(supplyRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error retrieving supply record' });
    }
});

// Route to update a supply record entry by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSupplyRecord = await SupplyRecord.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSupplyRecord) {
            return res.status(404).send({ message: 'Supply record not found' });
        }
        return res.status(200).json(updatedSupplyRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error updating supply record' });
    }
});

// Route to delete a supply record entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupplyRecord = await SupplyRecord.findByIdAndDelete(id);
        if (!deletedSupplyRecord) {
            return res.status(404).send({ message: 'Supply record not found' });
        }
        return res.status(200).send({ message: 'Supply record deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Error deleting supply record' });
    }
});

export default router;
