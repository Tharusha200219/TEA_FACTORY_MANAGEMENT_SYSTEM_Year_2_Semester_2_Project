import express from "express";
import Maintenance from '../models/maintenanceModel.js';
const router = express.Router();

//Route for Save a new Machine
router.post('/', async (request, response) => {

    try {
        if (
            !request.body.machineNumber ||
            !request.body.machineName ||
            !request.body.description ||
            !request.body.maintenanceDate ||
            !request.body.frequencyInDays
        ) {
            return response.status(400).send({
                message: 'send all required fields: machineNumber, machineName, description, maintenanceDate, frequencyInDays'
            });
        }
        const new_Maintenance = {
            machineNumber: request.body.machineNumber,
            machineName: request.body.machineName,
            description: request.body.description,
            maintenanceDate: request.body.maintenanceDate,
            frequencyInDays: request.body.frequencyInDays,
        };
        const maintenance = await Maintenance.create(new_Maintenance)
        return response.status(201).send(maintenance)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

});

//ROUTE FOR GET ALL PRODUCTION SCHEDULE FROM DATABASE


router.get('/', async (request, response) => {
    try {
        const maintenances = await Maintenance.find({});
        return response.status(200).json({
            count: maintenances.length,
            data: maintenances
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//search by id

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const maintenance = await Maintenance.findById(id);
        return response.status(200).json(maintenance);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//update production shedule


router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.machineNumber ||
            !request.body.machineName ||
            !request.body.description ||
            !request.body.maintenanceDate ||
            !request.body.frequencyInDays
        ) {
            return response.status(400).send({
                message: 'send all required fields: machineNumber, machineName, description, maintenanceDate, frequencyInDays'
            });
        }

        const { id } = request.params;

        const result = await Maintenance.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'maintenance schedule not found' });
        }
        return response.status(200).send({ message: 'maintenance schedule update successfully' })

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//delete production shedule


router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Maintenance.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: 'maintenance schedule not found' });
        }
        return response.status(200).send({ message: 'maintenance schedule deleted successfully' })


    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
}

);

export default router;