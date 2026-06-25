const express = require('express');
const router = express.Router();
const Reservation = require('../models/resevation');
const Classe = require('../models/classes');

// Create Reservation
router.post('/add', async (req, res) => {
    try {
        const { user, classe } = req.body;
        const newReservation = new Reservation(req.body);
        await newReservation.save();

        // Update the Classe reservations array
        await Classe.findByIdAndUpdate(classe, {
            $addToSet: { reservations: user }
        });

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
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'reserved' }, { new: true });
        res.status(200).send({ msg: 'Reservation reserved', reservation });
    } catch (error) {
        res.status(500).send({ msg: 'Error validating reservation', error: error.message });
    }
});

// Refuse Reservation
router.put('/refuse/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'canceled' }, { new: true });
        res.status(200).send({ msg: 'Reservation canceled', reservation });
    } catch (error) {
        res.status(500).send({ msg: 'Error refusing reservation', error: error.message });
    }
});

// Cancel Reservation (User side)
router.delete('/cancel/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('classe');
        if (!reservation) return res.status(404).send({ msg: 'Reservation not found' });

        // 48h check
        const classDate = new Date(reservation.classe.date);
        const [hours, minutes] = reservation.classe.time.split(':');
        classDate.setHours(parseInt(hours), parseInt(minutes), 0);

        const now = new Date();
        const diffInHours = (classDate - now) / (1000 * 60 * 60);

        if (diffInHours < 48) {
            return res.status(400).send({ msg: 'Cancellation only allowed 48h before the session.' });
        }

        // Remove from Classe document
        await Classe.findByIdAndUpdate(reservation.classe._id, {
            $pull: { reservations: reservation.user }
        });

        // Update Reservation status instead of deleting
        reservation.status = 'canceled';
        await reservation.save();

        res.status(200).send({ msg: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(500).send({ msg: 'Error cancelling reservation', error: error.message });
    }
});

module.exports = router;
