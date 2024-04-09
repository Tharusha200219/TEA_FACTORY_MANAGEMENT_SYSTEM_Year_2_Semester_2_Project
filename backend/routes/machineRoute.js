import express from "express";
import Machine from '../models/machineModel.js';

const router = express.Router();

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const machine = await Machine.findById(id);
        if (!machine) {
            return response.status(404).json({ message: 'Machine not found' });
        }
        return response.status(200).json(machine);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.post('/', async (request, response) => {
    try {
        const newMachine = await Machine.create(request.body);
        return response.status(201).json(newMachine);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedMachine = await Machine.findByIdAndUpdate(id, request.body, { new: true });
        if (!updatedMachine) {
            return response.status(404).json({ message: 'Machine not found' });
        }
        return response.status(200).json(updatedMachine);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const machines = await Machine.find({});
        return response.status(200).json({ count: machines.length, data: machines });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedMachine = await Machine.findByIdAndDelete(id);
        if (!deletedMachine) {
            return response.status(404).json({ message: 'Machine not found' });
        }
        return response.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;