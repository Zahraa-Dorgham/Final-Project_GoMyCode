const express = require('express');
const router = express.Router();
const SuiviCoach = require('../models/SuiviCoach');

//New suivi
router.post('/add', async (req, res) => {
    try {
        const newsuivi = new SuiviCoach(req.body);
        await newsuivi.save();
        res.status(201).send({ msg: 'Suivi added successfully', newsuivi });
    } catch (error) {
        res.status(500).send({ msg: 'Error adding suivi', error: error.message });
    }
});

// Get All Suivis
router.get('/all', async (req, res) => {
    try {
        const suivis = await SuiviCoach.find().populate('user').populate('coach');
        res.status(200).send({ msg: 'All tracking suivis', suivis });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching suivis', error: error.message });
    }
});

// Accept suivi
router.put('/accept/:id', async (req, res) => {
    try {
        const suivi = await SuiviCoach.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
        res.status(200).send({ msg: 'Request accepted', suivi });
    } catch (error) {
        res.status(500).send({ msg: 'Error accepting suivi', error: error.message });
    }
});

// Reject suivi
router.put('/reject/:id', async (req, res) => {
    try {
        const suivi = await SuiviCoach.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        res.status(200).send({ msg: 'Request rejected', suivi });
    } catch (error) {
        res.status(500).send({ msg: 'Error rejecting suivi', error: error.message });
    }
});

module.exports = router;
