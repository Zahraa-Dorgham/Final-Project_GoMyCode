const mongoose = require('mongoose');
const schema = mongoose.Schema;

const classeSchema = new schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['H', 'F', 'Mixte', 'Child'],
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    date: {
        type: String, // Or Date
        required: true
    },
    time: {
        type: String,
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    salleDeSport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalleDeSport',
        required: true
    }
});

module.exports = mongoose.model('Classe', classeSchema);
