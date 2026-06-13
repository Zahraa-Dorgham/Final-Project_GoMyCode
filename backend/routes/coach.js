const express = require('express');
const router = express.Router();
const Coach = require('../models/coaches');

// Add Coach
router.post('/add', async (req, res) => {
    try {
        const newCoach = new Coach(req.body);
        await newCoach.save();
        res.status(201).send({ msg: 'Coach added successfully', newCoach });
    } catch (error) {
        res.status(500).send({ msg: 'Error adding coach', error: error.message });
    }
});

// Get All Coaches
router.get('/all', async (req, res) => {
    try {
        const coaches = await Coach.find().populate('salleDeSport');
        res.status(200).send({ msg: 'All coaches', coaches });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching coaches', error: error.message });
    }
});

// Get One Coach
router.get('/:id', async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id).populate('salleDeSport');
        if (!coach) return res.status(404).send({ msg: 'Coach not found' });
        res.status(200).send({ msg: 'Coach found', coach });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching coach', error: error.message });
    }
});

// Update Coach
router.put('/:id', async (req, res) => {
    try {
        const updatedCoach = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ msg: 'Coach updated', updatedCoach });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating coach', error: error.message });
    }
});

// Delete Coach
router.delete('/:id', async (req, res) => {
    try {
        await Coach.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: 'Coach deleted' });
    } catch (error) {
        res.status(500).send({ msg: 'Error deleting coach', error: error.message });
    }
});

module.exports = router;
