const mongoose = require('mongoose');
const Reservation = require('./backend/models/resevation');
const Classe = require('./backend/models/classes');

mongoose.connect('mongodb://127.0.0.1:27017/pulsehub') // Assuming this is the DB name from context if available, or I'll just use a generic name
    .then(async () => {
        console.log('Connected to MongoDB');
        const reservations = await Reservation.find();
        
        for (const res of reservations) {
            await Classe.findByIdAndUpdate(res.classe, {
                $addToSet: { reservations: res.user }
            });
            console.log(`Synced reservation for class: ${res.classe}`);
        }
        
        console.log('Sync finished.');
        process.exit();
    })
    .catch(err => console.error(err));
