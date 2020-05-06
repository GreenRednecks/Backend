const mongoose = require('mongoose');

const EggSchema = mongoose.Schema({
    amount: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Egg', EggSchema);