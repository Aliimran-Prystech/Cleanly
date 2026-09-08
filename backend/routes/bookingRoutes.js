const express = require ('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Cleaner = require('../models/Cleaner');
const Service = require('../models/Service');
const calculatePrice = require('../utils/calculatePrice');

router.post('/create', async (req, res) => {
  try {
    const serviceConfig = await Service.findOne();
    const totalCost = calculatePrice(req.body, serviceConfig);

    const booking = new Booking({
      ...req.body,totalCost
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const serviceConfig = await Service.FindOne();

        const totalCost =  calculatePrice(req.body, serviceConfig);

        const updatedBooking = await Booking.findByIdandUpdate(
            req.params.id,
            {...req.body, totalCost},
            {new: true}
        );

        if(!updatedBooking){
            return res.status(400).json({success:false, message: 'Booking not found.'})
        };

        res.status(201).json({success: true, message: 'Booking updated Successfully'}, updatedBooking);
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Service.findByIdandDelete(req.params.id);

        if(!deletedBooking){
            return res.status(400).json({success: false, message: 'Booking not fou.nd'})
        };

        res.status(201).json({success: true, message: 'Booking Deleted'}, updatedBooking)
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    };
});

