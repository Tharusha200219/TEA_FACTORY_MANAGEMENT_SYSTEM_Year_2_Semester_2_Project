import express from 'express';
import { orders } from '../models/orderModel.js';

const router = express.Router();


router.post('/', async (request, response) => {
    try {
        if (
            !request.body.orderno ||
            !request.body.duedate ||
            !request.body.quantity ||
            !request.body.category ||
            !request.body.name ||
            !request.body.address||
            !request.body.telephone
        ) {
            return response.status(400).send({
                message: 'Send all required fields:duedate,quantity,category',
            });
        }
        const newOrder = {
            orderno: request.body.orderno,
            duedate: request.body.duedate,
            quantity: request.body.quantity,
            category: request.body.category,
            name: request.body.name,
            address:request.body.address,
            telephone:request.body.telephone,
        
        };
        const Order = await orders.create(newOrder);
        return response.status(201).send(Order);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


/*Status*/
router.put('/:id/status', async (request, response) => {
    try {
        const { id } = request.params;
        const { status } = request.body;

        const updatedOrder = await orders.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return response.status(404).json({ message: 'Order not found' });
        }
        return response.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id/status', async (request, response) => {
    try {
        const { id } = request.params;

        const order = await orders.findById(id);

        if (!order) {
            return response.status(404).json({ message: 'Order not found' });
        }

        return response.status(200).json({ status: order.status });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


/*Status end */

router.get('/', async (request, response) => {
    try {
        const order = await orders.find({});
        return response.status(200).json({
            count: order.length,
            data: order
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const Order = await orders.findById(id);

        if (!Order) {
            return response.status(404).json({ message: 'Order not found' });
        }

        return response.status(200).json(Order);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.orderno ||
            !request.body.duedate ||
            !request.body.quantity ||
            !request.body.category ||
            !request.body.name ||
            !request.body.address||
            !request.body.telephone
        ) {
            return response.status(400).send({
                message: 'Send all required fields:duedate,quantity,category',
            });
        }

        const { id } = request.params;
        const result = await orders.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Order not found' });
        }
        return response.status(200).json({ message: 'Order updated sucessfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await orders.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Order not found' });
        }
        return response.status(200).send({ message: 'Order deleted sucessfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;