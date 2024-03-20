
import express from "express";
import Teatype from '../models/teatype_management_model.js';
const router = express.Router();


//tea type management part

router.post('/', async (request, response) => {

    try {
        if (
            !request.body.Schedule_no ||
            !request.body.black_tea ||
            !request.body.green_tea ||
            !request.body.oolong_tea ||
            !request.body.white_tea
        ) {
            return response.status(400).send({
                message: 'send all required fields: Schedule_no, black_tea, green_tea, oolong_tea, white_tea'
            });
        }
        const new_schedule = {
            Schedule_no: request.body.Schedule_no,
            black_tea: request.body.black_tea,
            green_tea: request.body.green_tea,
            oolong_tea: request.body.oolong_tea,
            white_tea: request.body.white_tea,
        };
        const teatype = await Teatype.create(new_schedule)
        return response.status(201).send(teatype)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

});
//ROUTE FOR GET ALL tea type SCHEDULE FROM DATABASE

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
//search by id
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


//update tea type management shedule

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.Schedule_no ||
            !request.body.black_tea ||
            !request.body.green_tea ||
            !request.body.oolong_tea ||
            !request.body.white_tea
        ) {
            return response.status(400).send({
                message: 'send all required fields: Schedule_no, black_tea, green_tea, oolong_tea, white_tea'
            });
        }

        const { id } = request.params;

        const result = await Teatype.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'tea type shedule not found' });
        }
        return response.status(200).send({ message: 'tea type shedule update successfully' })

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//delete tea type management shedule
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Teatype.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: 'tea type schedule not found' });
        }
        return response.status(200).send({ message: 'tea type shedule delete successfully' })


    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
}

);
export default router;


//ttt

