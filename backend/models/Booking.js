const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true }, 
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  cleaningType: { type: String, enum: ['Standard', 'Deep', 'Move In-Out'], required: true },
  frequency: { type: String, enum: ['ONE-TIME', 'WEEKLY', 'BI-WEEKLY', 'MONTHLY'], required: true },
  bedrooms: { type: Number, min: 1, required: true }, 
  bathrooms: { type: Number, min: 1, required: true }, 
  extras: [{ type: String }], 
  specialReq: { type: String },
  bookingDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  totalCost: { type: Number, required: true },
  assignedCleaner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cleaner' }],
  assignedCleaners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cleaner' }],
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);