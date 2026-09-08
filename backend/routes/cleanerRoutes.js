const express = require('express');
const router = express.Router();
const Cleaner = require('../models/Cleaner');

router.post('/', async(req, res) => {
    try {
        const {name, email, phone} = req.body;

        if (!name || !email || !phone){
            res.status(500).json({success: false, message: 'Name, email and phone are required.'});
        }

        const newCleaner = new Cleaner ({name, email, phone});
        await newCleaner.save();

        res.status(201).json({ success: true, cleaner: newCleaner });
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
    }
});

router.get('/', async(req, res) => {
    try {
        const cleaners = await Cleaner.find().sort({ createdAt : -1 });
        res.json({sucess: true, cleaners});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
});

router.put('/:id', async(req, res) => {
    try {
        const updatedCleaner = await Cleaner.findByIdAndUpdate(
            req.params.id, {...req.body}
        );

        if(!updatedCleaner){
            res.status(500).json({success: false, message: 'Cleaner not found.'})
        };

        res.json({success: true, message: 'Cleaner updated Successfully.', cleaner: updatedCleaner});
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const deleteCleaner = awaitCleaner.findByIdAndDelete(req.params.id);

        if(!deleteCleaner){
            res.status(500).json({success:false, message: 'Cleaner not found'})
        };

        res.json({success: true, message: 'Cleaner deleted Successfully.'});
    }catch (error){
        res.status(500).json({success: false, message: error.message})
    };
});

module.exports = router;

