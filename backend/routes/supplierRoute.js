import express from "express";
import { supplier } from "../models/supplierModel.js";

const router = express.Router();

// Add new supplier
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

        const createSupplier = await supplier.create(newSupplier);
        return response.status(201).send(createSupplier);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get all suppliers
router.get('/', async (request, response) => {
    try {
        const allSuppliers = await supplier.find({});
        return response.status(200).json(allSuppliers);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get one supplier 
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const oneSupplier = await supplier.findById(id);
        if (!oneSupplier) {
            return response.status(404).send({ message: 'Supplier not found' });
        }
        return response.status(200).json(oneSupplier);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update supplier 
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updateSupplier = await supplier.findByIdAndUpdate(id, request.body, { new: true });
        if (!updateSupplier) {
            return response.status(404).send({ message: 'Supplier not found' });
        }
        return response.status(200).send(updateSupplier);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete supplier 
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deleteSupplier = await supplier.findByIdAndDelete(id);
        if (!deleteSupplier) {
            return response.status(404).send({ message: 'Supplier not found' });
        }
        return response.status(200).send({ message: 'Supplier deleted successfully!' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
