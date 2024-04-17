// teaLeavesRoute.js

import express from "express";
import TeaLeaves from "../models/teaLeavesModel.js";

const router = express.Router();

// Route to increment tea leaves quantity
router.put('/increment', async (request, response) => {
    try {
        const { incrementAmount } = request.body;

        if (!incrementAmount || incrementAmount < 1) {
            return response.status(400).send({ message: 'Please provide a valid incrementAmount' });
        }

        // Find the tea leaves entry
        let teaLeavesEntry = await TeaLeaves.findOne();

        // If no entry exists, create one with the provided incrementAmount
        if (!teaLeavesEntry) {
            teaLeavesEntry = new TeaLeaves({ quantity: incrementAmount });
        } else {
            // Otherwise, increment the existing quantity
            teaLeavesEntry.quantity += incrementAmount;
        }

        // Save the updated or new entry
        await teaLeavesEntry.save();

        return response.status(200).send({ message: 'Tea leaves quantity incremented successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});




// Route to get all waste entries and calculate total tea leaves quantity
router.get('/', async (request, response) => {
    try {
        // Retrieve all waste entries
        const allWasteEntries = await waste.find({});
        
        // Calculate total tea leaves quantity
        let totalQuantity = 0;
        allWasteEntries.forEach(entry => {
            totalQuantity += entry.quantity;
        });
        
        // Return all waste entries along with total tea leaves quantity
        return response.status(200).json({ wasteEntries: allWasteEntries, totalQuantity });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;
