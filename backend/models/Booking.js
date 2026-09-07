const mongoose = require ('mongoose');

const BookingSchema = new Mongoose.schema({
    customerName: {type: String, required: true},
    customerEmail: {type: String, required: true},
    customerNum: {type: Number, required: true},
    customerAddress: {type: String, required: true},
    ZIP: {type: Number, required: true},
    cleaningType: { type: String, enum: ['Standard', 'Deep', 'Move In-Out'], required: true },
    frequency: {type: String, enum: ['ONE-TIME', 'WEEKLY', 'BI-WEEKLY', 'MONTHLY'], required: true},
    bedroom: {type: String, min:1, required: true},
    bathroom: {type: String, min:1, required: true},
    extras: {type:String},
    specialReq: {type: String},
    bookingDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    totalCost: { type: Number, required: true },
    assignedCleaner: { type: mongoose.Schema.Types.ObjectId, ref: 'Cleaner', default: null },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);