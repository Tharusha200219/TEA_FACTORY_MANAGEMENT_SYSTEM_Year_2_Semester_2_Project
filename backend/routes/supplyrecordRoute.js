import express from "express";
import { SupplyRecord } from "../models/supplyrecordModel.js";

const router = express.Router();

// save new supply record 
router.post('/', async (request, response) => {
    try {
        const { supplier, date, quantity, unitPrice } = request.body;

        if (!supplier || !date || !quantity || !unitPrice) {
            return response.status(400).send({ message: 'Send all required fields: supplier, date, quantity, unitPrice'});
        }

        const newRecord = new SupplyRecord({
            supplier,
            date,
            quantity,
            unitPrice  
        });

        const savedRecord = await newRecord.save();
        return response.status(201).json(savedRecord);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get all records 
router.get('/', async (request, response) => {
    try {
        const allSupplyRecords = await SupplyRecord.find({});
        return response.status(200).json(allSupplyRecords);
    }
     catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get supply record 
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const supplyRecord = await SupplyRecord.findById(id);
       
        if (!supplyRecord) {
            return response.status(404).send({ message: 'Supply record not found' });
        }
        return response.status(200).json(supplyRecord);
    } 
    catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update record
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updateRecord = await SupplyRecord.findByIdAndUpdate(id, request.body, { new: true });
       
        if (!updateRecord) {
            return response.status(404).send({ message: 'Supply record not found' });
        }
        return response.status(200).json(updateRecord);
    } 
    catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete record
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deleteRecord = await SupplyRecord.findByIdAndDelete(id);

        if (!deleteRecord) {
            return response.status(404).send({ message: 'Supply record not found' });
        }
        return response.status(200).send({ message: 'Supply record deleted successfully' });
    } 
    catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update status
router.put('/changeStatus/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { status } = request.body;

        const updateSupply = await SupplyRecord.findByIdAndUpdate(id, { status }, { new: true });
        if (!updateSupply) {
            return response.status(404).send({ message: 'Supply record not found' });
        }
        return response.status(200).send(updateSupply);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
