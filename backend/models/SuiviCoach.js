const mongoose = require('mongoose');
const schema = mongoose.Schema;

const suiviCoachSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    phoneUser: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('SuiviCoach', suiviCoachSchema);
