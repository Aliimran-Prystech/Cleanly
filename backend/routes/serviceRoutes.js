const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
    try {
        let serviceConfig = await Service.findOne();

        if (!serviceConfig) {
        serviceConfig = await Service.create({
        baseTypes: { standard: 80, deep: 140, moveInOut: 200 },
        perRoomRate: 50,
        perBathRate: 60,
        addons: [
          { name: 'Clean Oven', price: 25 },
          { name: 'Clean Windows', price: 20 },
          { name: 'Clean Fridge', price: 20 }
        ],
        frequencyDiscounts: { oneTime: 0, weekly: 25, biWeekly: 15, monthly: 10 }
        });
        }
        res.json({ success: true, serviceConfig });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/config', async (req, res) => {
    try {
        const updatedConfig = await Service.findOneAndUpdate(
        {},
        { ...req.body },
        { returnDocument: 'after', upsert: true, runValidators: true }
        );

        res.json({success: true, message: 'Pricing configuration updated successfully', serviceConfig: updatedConfig});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;