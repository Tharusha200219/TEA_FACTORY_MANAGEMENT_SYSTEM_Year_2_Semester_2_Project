import express from "express";
import { waste } from "../models/wastemodel.js";

const router = express.Router();

// Route to save a new waste entry
router.post('/', async (request, response) => {
    try {
        const { wasteid, teatype, inventorynumber, quantity } = request.body;

        if (!wasteid || !teatype || !inventorynumber || !quantity) {
            return response.status(400).send({ message: 'Please provide wasteid, teatype, inventorynumber, and quantity' });
        }

        const newWasteEntry = {
            wasteid,
            teatype,
            inventorynumber,
            quantity,
        };

        const createdWasteEntry = await waste.create(newWasteEntry);

        return response.status(201).send(createdWasteEntry);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all waste entries
router.get('/', async (request, response) => {
    try {
        const allWasteEntries = await waste.find({});
        return response.status(200).json(allWasteEntries);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one waste entry by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const singleWasteEntry = await waste.findById(id);
        return response.status(200).json(singleWasteEntry);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a waste entry by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedWasteEntry = await waste.findByIdAndUpdate(id, request.body, { new: true });
        return response.status(200).send(updatedWasteEntry);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a waste entry by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedWasteEntry = await waste.findByIdAndDelete(id);
        return response.status(200).send({ message: 'Waste entry deleted successfully!' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;