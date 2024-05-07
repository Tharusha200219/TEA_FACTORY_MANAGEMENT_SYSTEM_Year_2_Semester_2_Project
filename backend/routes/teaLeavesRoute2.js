// teaLeavesController.js

import express from 'express';
import TeaLeaves2 from '../models/teaLeavesModel2.js';

const router = express.Router();

// Create a new tea leaves entry
router.post('/', async (req, res) => {
    try {
        const { quantity, date, status } = req.body;
        const newTeaLeaves = new TeaLeaves2({
            quantity,
            date,
            status
        });
        const savedTeaLeaves = await newTeaLeaves.save();
        res.status(201).json(savedTeaLeaves);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tea leaves entries
router.get('/', async (req, res) => {
    try {
        const teaLeaves = await TeaLeaves2.find();
        res.json(teaLeaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a tea leaves entry
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { quantity, date, status } = req.body;
        const updatedTeaLeaves = await TeaLeaves2.findByIdAndUpdate(id, { quantity, date, status }, { new: true });
        res.json(updatedTeaLeaves);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a tea leaves entry
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await TeaLeaves2.findByIdAndDelete(id);
        res.json({ message: 'Tea leaves entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
