import express from "express";
import Machine from '../models/machineModel.js';
const router = express.Router();

//Route for Save a new Machine
router.post('/', async (request, response) => {

    try {
        if (
            !request.body.machineNumber ||
            !request.body.machineName ||
            !request.body.machineType ||
            !request.body.installationDate ||
            !request.body.warrentyInformation
        ) {
            return response.status(400).send({
                message: 'send all required fields: machineNumber, machineName, machineType, installationDate, warrentyInformation'
            });
        }
        const new_Machine = {
            machineNumber: request.body.machineNumber,
            machineName: request.body.machineName,
            machineType: request.body.machineType,
            installationDate: request.body.installationDate,
            warrentyInformation: request.body.warrentyInformation,
        };
        const machine = await Machine.create(new_Machine)
        return response.status(201).send(machine)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

});

//ROUTE FOR GET ALL PRODUCTION SCHEDULE FROM DATABASE


router.get('/', async (request, response) => {
    try {
        const machines = await Machine.find({});
        return response.status(200).json({
            count: machines.length,
            data: machines
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
        const machine = await Machine.findById(id);
        return response.status(200).json(machine);
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
            !request.body.machineType ||
            !request.body.installationDate ||
            !request.body.warrentyInformation
        ) {
            return response.status(400).send({
                message: 'send all required fields: machineNumber, machineName, machineType, installationDate, warrentyInformation'
            });
        }

        const { id } = request.params;

        const result = await Machine.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'machine schedule not found' });
        }
        return response.status(200).send({ message: 'machine schedule update successfully' })

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//delete production shedule


router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Machine.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: 'machine schedule not found' });
        }
        return response.status(200).send({ message: 'machine schedule deleted successfully' })


    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
}

);

export default router;