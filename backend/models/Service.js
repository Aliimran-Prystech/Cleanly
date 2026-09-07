const mongoose = require('mongoose');

const serviceSchema = new Mongoose.schema({
  name: { 
    type: String, 
    required: true, 
    enum: ['Standard', 'Deep', 'Move In-Out'] 
  },
    costPerBedroom: { type: Number, required: true, default: 50 },
    costPerBathroom: { type: Number, required: true, default: 60 },
    addons: [{
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }],

    frequencyDiscounts: {
        oneTime: {type: Number, default: 0},
        Weekly: {type: Number, default: 25},
        biWeekly: {type: Number, default: 0},
        monthly: {type: Number, default: 0}
    },

}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
