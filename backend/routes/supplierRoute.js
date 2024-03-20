import express from "express";
import { supplier } from "../models/supplierModel.js";

const router = express.Router();

// Route to save a new supplier entry
router.post('/', async (request, response) => {
    try {
        const { supplierid, name, address, contact, email } = request.body;

        if (!supplierid || !name || !address || !contact || !email) {
            return response.status(400).send({ message: 'Please provide all required fields: SupplierID, Name, Address, ContactNo, Email' });
        }

        const newSupplier = {
            supplierid,
            name,
            address,
            contact,
            email,
        };

        const createdSupplierEntry = await supplier.create(newSupplier);

        return response.status(201).send(createdSupplierEntry);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Error creating supplier entry' });
    }
});

// Route to get all supplier entries
router.get('/', async (request, response) => {
    try {
        const allSupplierEntries = await supplier.find({});
        return response.status(200).json(allSupplierEntries);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Error retrieving supplier entries' });
    }
});

// Route to get one supplier entry by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const singleSupplierEntry = await supplier.findById(id);
        if (!singleSupplierEntry) {
            return response.status(404).send({ message: 'Supplier not found' });
        }
        return response.status(200).json(singleSupplierEntry);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Error retrieving supplier entry' });
    }
});

// Route to update a supplier entry by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedSupplierEntry = await supplier.findByIdAndUpdate(id, request.body, { new: true });
        if (!updatedSupplierEntry) {
            return response.status(404).send({ message: 'Supplier not found' });
        }
        return response.status(200).send(updatedSupplierEntry);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Error updating supplier entry' });
    }
});

// Route to delete a supplier entry by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedSupplierEntry = await supplier.findByIdAndDelete(id);
        if (!deletedSupplierEntry) {
            return response.status(404).send({ message: 'Supplier not found' });
        }
        return response.status(200).send({ message: 'Supplier deleted successfully!' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: 'Error deleting supplier entry' });
    }
});

export default router;
