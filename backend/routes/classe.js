const express = require('express');
const router = express.Router();
const Classe = require('../models/classes');

// Add Classe
router.post('/add', async (req, res) => {
    try {
        const newClasse = new Classe(req.body);
        await newClasse.save();
        res.status(201).send({ msg: 'Classe added successfully', newClasse });
    } catch (error) {
        res.status(500).send({ msg: 'Error adding classe', error: error.message });
    }
});

// Get All Classes
router.get('/all', async (req, res) => {
    try {
        const classes = await Classe.find().populate('coach').populate('salleDeSport');
        res.status(200).send({ msg: 'All classes', classes });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching classes', error: error.message });
    }
});

// Get One Classe
router.get('/:id', async (req, res) => {
    try {
        const classe = await Classe.findById(req.params.id).populate('coach').populate('salleDeSport');
        if (!classe) return res.status(404).send({ msg: 'Classe not found' });
        res.status(200).send({ msg: 'Classe found', classe });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching classe', error: error.message });
    }
});

// Update Classe
router.put('/:id', async (req, res) => {
    try {
        const updatedClasse = await Classe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ msg: 'Classe updated', updatedClasse });
    } catch (error) {
        res.status(500).send({ msg: 'Error updating classe', error: error.message });
    }
});

// Delete Classe
router.delete('/:id', async (req, res) => {
    try {
        await Classe.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: 'Classe deleted' });
    } catch (error) {
        res.status(500).send({ msg: 'Error deleting classe', error: error.message });
    }
});

module.exports = router;
