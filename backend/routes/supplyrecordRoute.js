import express from "express";
import { SupplyRecord } from "../models/supplyrecordModel.js";

const router = express.Router();

// save new supply record 
router.post('/', async (req, res) => {
    try {
        const { supplier, date, quantity, unitPrice } = req.body;

        if (!supplier || !date || !quantity || !unitPrice) {
            return res.status(400).send({ message: 'Send all required fields: supplier, date, quantity, unitPrice'});
        }

        const newSupplyRecord = new SupplyRecord({
            supplier,
            date,
            quantity,
            unitPrice
        });

        const savedRecord = await newSupplyRecord.save();
        return res.status(201).json(savedRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// get all records from database
router.get('/', async (req, res) => {
    try {
        const allSupplyRecords = await SupplyRecord.find({});
        return res.status(200).json(allSupplyRecords);
    }
     catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// get supply record by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const supplyRecord = await SupplyRecord.findById(id);
       
        if (!supplyRecord) {
            return res.status(404).send({ message: 'Supply record not found' });
        }
        return res.status(200).json(supplyRecord);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// update record
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateRecord = await SupplyRecord.findByIdAndUpdate(id, req.body, { new: true });
       
        if (!updateRecord) {
            return res.status(404).send({ message: 'Supply record not found' });
        }
        return res.status(200).json(updateRecord);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// delete record
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRecord = await SupplyRecord.findByIdAndDelete(id);

        if (!deleteRecord) {
            return res.status(404).send({ message: 'Supply record not found' });
        }
        return res.status(200).send({ message: 'Supply record deleted successfully' });
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
