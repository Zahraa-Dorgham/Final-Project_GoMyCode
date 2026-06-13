const express = require('express');
const router = express.Router();
const Reservation = require('../models/resevation');

// Create Reservation
router.post('/add', async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).send({ msg: 'Reservation created successfully', newReservation });
    } catch (error) {
        res.status(500).send({ msg: 'Error creating reservation', error: error.message });
    }
});

// Get User Reservations
router.get('/user/:userId', async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.params.userId }).populate('classe').populate('user');
        res.status(200).send({ msg: 'User reservations', reservations });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching user reservations', error: error.message });
    }
});

// Get All Reservations
router.get('/all', async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('classe').populate('user');
        res.status(200).send({ msg: 'All reservations', reservations });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching reservations', error: error.message });
    }
});

// Validate Reservation
router.put('/validate/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'valide' }, { new: true });
        res.status(200).send({ msg: 'Reservation validated', reservation });
    } catch (error) {
        res.status(500).send({ msg: 'Error validating reservation', error: error.message });
    }
});

// Refuse Reservation
router.put('/refuse/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'refuse' }, { new: true });
        res.status(200).send({ msg: 'Reservation refused', reservation });
    } catch (error) {
        res.status(500).send({ msg: 'Error refusing reservation', error: error.message });
    }
});

module.exports = router;
