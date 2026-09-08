const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  baseTypes: {
    standard: { type: Number, required: true, default: 80 },
    deep: { type: Number, required: true, default: 140 },
    moveInOut: { type: Number, required: true, default: 200 }
  },
    perRoomRate: { type: Number, required: true, default: 50 },
    perBathRate: { type: Number, required: true, default: 60 },
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
