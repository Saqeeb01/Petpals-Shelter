const express = require('express');
const router = express.Router();
// const Pet = require('../models/Pet');
// const User = require('../models/User');
const adoptController = require('../controllers/adoptController');

//create
router.post('/create', adoptController.createAdoption);

router.get('/all', adoptController.getAllAdoptions); 

router.get('/:id', adoptController.getAdoptionById);

router.put('/:id', adoptController.updateAdoptionById);

router.delete('/:id', adoptController.deleteAdoptionById);

module.exports = router;
