import express from "express";
import Production from '../models/production_schedule_model_t.js';
const router = express.Router();
//production part

router.post('/', async (request, response) => {

    try {
        if (
            !request.body.Schedule_no ||
            !request.body.Production_date ||
            !request.body.Quantity ||
            !request.body.Machine_assignment ||
            !request.body.shift_information ||
            !request.body.Status
        ) {
            return response.status(400).send({
                message: 'send all required fields: Schedule_no, Production_date, Quantity, Machine_assignment, shift_information'
            });
        }
        const new_schedule = {
            Schedule_no: request.body.Schedule_no,
            Production_date: request.body.Production_date,
            Quantity: request.body.Quantity,
            Machine_assignment: request.body.Machine_assignment,
            shift_information: request.body.shift_information,
            Status: request.body.Status,
        };
        const production = await Production.create(new_schedule)
        return response.status(201).send(production)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

});
//ROUTE FOR GET ALL PRODUCTION SCHEDULE FROM DATABASE

router.get('/', async (request, response) => {
    try {
        const productions = await Production.find({});
        return response.status(200).json({
            count: productions.length,
            data: productions
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
        const production = await Production.findById(id);
        return response.status(200).json(production)
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//update production shedule

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.Schedule_no ||
            !request.body.Production_date ||
            !request.body.Quantity ||
            !request.body.Machine_assignment ||
            !request.body.shift_information ||
            !request.body.Status
        ) {
            return response.status(400).send({
                message: 'send all required fields: Schedule_no, Production_date, Quantity, Machine_assignment, shift_information'
            });
        }

        const { id } = request.params;

        const result = await Production.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'production schedule not found' });
        }
        return response.status(200).send({ message: 'production shedule update successfully' })

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//delete production shedule

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Production.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: 'production schedule not found' });
        }
        return response.status(200).send({ message: 'production shedule delete successfully' })


    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
}

);

export default router;