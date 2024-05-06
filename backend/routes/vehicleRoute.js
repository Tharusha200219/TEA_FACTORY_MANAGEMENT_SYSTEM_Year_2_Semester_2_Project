import express from "express";
import { Vehicle } from '../models/vehicleModel.js';

const router = express.Router();


// post a new vehicle
router.post('/', async (request, response) => {
    try {
        // Check if all required fields are provided
        if (
            !request.body.Type ||
            !request.body.RegNum ||
            !request.body.AddedYear ||
            !request.body.EngineNum ||
            !request.body.ChesiNum ||
            !request.body.Owner
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Type, RegNum, AddedYear, EngineNum, ChesiNum, Owner',
            });
        }

        const newVehicle = {
            Type: request.body.Type,
            RegNum: request.body.RegNum,
            AddedYear: request.body.AddedYear,
            EngineNum: request.body.EngineNum,
            ChesiNum: request.body.ChesiNum,
            Owner: request.body.Owner,
        };

        const vehicle = await Vehicle.create(newVehicle);
        return response.status(201).send(vehicle);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get all vehicles from database
router.get('/', async (request, response) => {
    try {
        const vehicles = await Vehicle.find({});
        return response.status(200).json({
            count: vehicles.length,
            data: vehicles
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get the vehicle by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const vehicle = await Vehicle.findById(id);
        return response.status(200).json(vehicle);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update vehicle by id
router.put('/:id', async (request, response) => {
    try {
        // Check if all required fields are provided
        if (
            !request.body.Type ||
            !request.body.RegNum ||
            !request.body.AddedYear ||
            !request.body.EngineNum ||
            !request.body.ChesiNum ||
            !request.body.Owner
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Type, RegNum, AddedYear, EngineNum, ChesiNum, Owner',
            });
        }

        const { id } = request.params;
        const result = await Vehicle.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Vehicle not found' });
        }
        return response.status(200).send({ message: 'Vehicle updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// delete vehicle by id
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Vehicle.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Vehicle not found' });
        }
        return response.status(200).send({ message: 'Vehicle deleted' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
