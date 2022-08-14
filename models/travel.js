const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const travelSchema = new Schema({
    destination: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    photos: {
        photo1: { type: String, required: true },
        photo2: { type: String, required: true },
        photo3: { type: String, required: false },
        photo4: { type: String, required: false },
        photo5: { type: String, required: false },
        photo6: { type: String, required: false },
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }
});

module.exports = mongoose.model('Travel', travelSchema);