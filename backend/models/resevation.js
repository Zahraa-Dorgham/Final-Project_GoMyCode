const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reservationSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    phoneUser: {
        type: String,
        required: true
    },
    dateReservation: {
        type: Date,
        default: Date.now
    },
    prix: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['reserved', 'canceled'],
        default: 'reserved'
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
