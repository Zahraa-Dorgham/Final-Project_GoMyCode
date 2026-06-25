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
        enum: ['Men', 'Women', 'Mixte', 'Child'],
        required: true
    },
    prix: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date, 
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
    },
    nbGroups: {
        type: Number,
        required: true,
        default: 10,
        min: 1
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Classe', classeSchema);
