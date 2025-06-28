const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    date: { type: Date, 
        default: Date.now,
        required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('note', noteSchema);
