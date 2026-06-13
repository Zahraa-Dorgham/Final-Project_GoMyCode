const mongoose = require('mongoose');
const schema = mongoose.Schema;

const salleSchema = new schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    localisation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SalleDeSport', salleSchema);
