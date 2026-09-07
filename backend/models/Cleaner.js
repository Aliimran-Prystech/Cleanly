const mongoose = require('mongoose');

const cleanerSchema = new Mongoose.schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Cleaner', cleanerSchema);