import express from "express";
import { inventory } from "../models/inventorymodel.js";

const router = express.Router();

// Route to save a new inventory entry
router.post('/', async (request, response) => {
    try {
        const { batchid, category, inventorynumber, quantity } = request.body;

        if (!batchid || !category || !inventorynumber || !quantity) {
            return response.status(400).send({ message: 'Please provide all required fields: batchid, category, inventorynumber, quantity' });
        }

        const newInventoryEntry = {
            batchid,
            category,
            inventorynumber,
            quantity,
        };

        const createdInventoryEntry = await inventory.create(newInventoryEntry);

        return response.status(201).send(createdInventoryEntry);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all inventory entries
router.get('/', async (request, response) => {
    try {
        const allInventoryEntries = await inventory.find({});
        return response.status(200).json(allInventoryEntries);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one inventory entry by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const singleInventoryEntry = await inventory.findById(id);
        return response.status(200).json(singleInventoryEntry);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update an inventory entry by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedInventoryEntry = await inventory.findByIdAndUpdate(id, request.body, { new: true });
        return response.status(200).send(updatedInventoryEntry);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete an inventory entry by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedInventoryEntry = await inventory.findByIdAndDelete(id);
        return response.status(200).send({ message: 'Inventory entry deleted successfully!' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;