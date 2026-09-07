const express = require ('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Cleaner = require('../models/Cleaner');
const Service = require('../models/Service');

router.post('/create', async (req, res) =>  {
    try {
        const serviceConfig = await Service.findOne() || {
            baseTypes: { standard: 80, deep: 140, moveInOut: 200 },
        perRoomRate: 25,
        perBathRate: 30,
        frequencyDiscounts: { oneTime: 0, weekly: 20, biWeekly: 15, monthly: 10 },
        addons: [
            { name: 'Clean Oven', price: 30 },
            { name: 'Clean Windows', price: 40 },
            { name: 'Clean Fridge', price: 25 }
      ]
    };
    } catch (error) {
                
    }
})