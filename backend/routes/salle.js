const express = require('express');
const router = express.Router();
const SalleDeSport = require('../models/sallesdesport');

// Add Salle
router.post('/add', async (req, res) => {
    try {
        const newSalle = new SalleDeSport(req.body);
        await newSalle.save();
        res.status(201).send({ msg: 'Salle added successfully', newSalle });
    } catch (error) {
        res.status(500).send({ msg: 'Error adding salle', error: error.message });
    }
});

// Get All Salles
router.get('/all', async (req, res) => {
    try {
        const salles = await SalleDeSport.find();
        res.status(200).send({ msg: 'All salles', salles });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching salles', error: error.message });
    }
});

// Get One Salle
router.get('/:id', async (req, res) => {
    try {
        const salle = await SalleDeSport.findById(req.params.id);
        if (!salle) return res.status(404).send({ msg: 'Salle not found' });
        res.status(200).send({ msg: 'Salle found', salle });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching salle', error: error.message });
    }
});

// Update Salle
router.put('/:id', async (req, res) => {
    try {
        const updatedSalle = await SalleDeSport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ msg: 'Salle updated', updatedSalle });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating salle', error: error.message });
    }
});

// Delete Salle
router.delete('/:id', async (req, res) => {
    try {
        await SalleDeSport.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: 'Salle deleted' });
    } catch (error) {
        res.status(500).send({ msg: 'Error deleting salle', error: error.message });
    }
});

module.exports = router;
