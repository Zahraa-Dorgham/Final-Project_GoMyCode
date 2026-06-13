const express = require('express');
const router = express.Router();
const SuiviCoach = require('../models/SuiviCoach');

// Send Tracking Request
router.post('/add', async (req, res) => {
    try {
        const newRequest = new SuiviCoach(req.body);
        await newRequest.save();
        res.status(201).send({ msg: 'Request sent successfully', newRequest });
    } catch (error) {
        res.status(500).send({ msg: 'Error sending request', error: error.message });
    }
});

// Get All Requests
router.get('/all', async (req, res) => {
    try {
        const requests = await SuiviCoach.find().populate('user').populate('coach');
        res.status(200).send({ msg: 'All tracking requests', requests });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching requests', error: error.message });
    }
});

// Accept Request
router.put('/accept/:id', async (req, res) => {
    try {
        const request = await SuiviCoach.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
        res.status(200).send({ msg: 'Request accepted', request });
    } catch (error) {
        res.status(500).send({ msg: 'Error accepting request', error: error.message });
    }
});

// Reject Request
router.put('/reject/:id', async (req, res) => {
    try {
        const request = await SuiviCoach.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        res.status(200).send({ msg: 'Request rejected', request });
    } catch (error) {
        res.status(500).send({ msg: 'Error rejecting request', error: error.message });
    }
});

module.exports = router;
