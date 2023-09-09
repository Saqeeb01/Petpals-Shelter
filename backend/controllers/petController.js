const Pet = require('../models/Pet');
// Correct relative path assuming petController is in the same directory
const petController = require('./petController');


const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};



module.exports = {
  getAllPets,
  // other pet functions here
};
