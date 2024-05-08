import express from "express";
import Teatype from '../models/teatype_management_model.js';

const router = express.Router();

// Route to create a new tea type schedule
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.Schedule_no ||
            !request.body.black_tea ||
            !request.body.green_tea ||
            !request.body.oolong_tea ||
            !request.body.white_tea ||
            !request.body.tea_wastage ||
            !request.body.status // Check for the status field
        ) {
            return response.status(400).send({
                message: 'send all required fields: Schedule_no, black_tea, green_tea, oolong_tea, white_tea, tea_wastage, status'
            });
        }

        const new_schedule = {
            Schedule_no: request.body.Schedule_no,
            black_tea: request.body.black_tea,
            green_tea: request.body.green_tea,
            oolong_tea: request.body.oolong_tea,
            white_tea: request.body.white_tea,
            tea_wastage: request.body.tea_wastage,
            status: request.body.status // Include the status field in the new schedule object
        };

        const teatype = await Teatype.create(new_schedule);
        return response.status(201).send(teatype);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all tea type schedules
router.get('/', async (request, response) => {
    try {
        const teatypes = await Teatype.find({});
        return response.status(200).json({
            count: teatypes.length,
            data: teatypes
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to search tea type schedule by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const teatype = await Teatype.findById(id);
        return response.status(200).json(teatype);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update tea type schedule
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Teatype.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Tea type schedule not found' });
        }
        return response.status(200).send({ message: 'Tea type schedule updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to delete tea type schedule
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Teatype.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Tea type schedule not found' });
        }
        return response.status(200).send({ message: 'Tea type schedule deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to update the status of a tea type schedule
router.put('/:id/update-status', async (request, response) => {
    try {
        const { id } = request.params;
        const { status } = request.body;

        if (!status) {
            return response.status(400).json({ message: 'Status field is required' });
        }

        const teatype = await Teatype.findById(id);

        if (!teatype) {
            return response.status(404).json({ message: 'Tea type schedule not found' });
        }

        teatype.status = status;
        await teatype.save();

        return response.status(200).json({ message: 'Tea type schedule status updated successfully', data: teatype });
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'An error occurred on the server' });
    }
});

export default router;
