const Adopt = require('../models/Adopt'); // Import the Adopt model

// Function to delete adoption record by ID
const deleteAdoptionById = async (req, res) => {
    const adoptionId = req.params.id; // Get the adoption ID from the request parameters
  
    try {
      const deletedAdoption = await Adopt.findByIdAndRemove(adoptionId);
      if (!deletedAdoption) {
        return res.status(404).json({ message: 'Adoption not found' });
      }
      res.json({ message: 'Adoption deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting adoption record' });
    }
  };

// Function to update adoption record by ID
const updateAdoptionById = async (req, res) => {
    const adoptionId = req.params.id; // Get the adoption ID from the request parameters
    const updateData = req.body; // Get the updated data from the request body
  
    try {
      const updatedAdoption = await Adopt.findByIdAndUpdate(adoptionId, updateData, { new: true });
      if (!updatedAdoption) {
        return res.status(404).json({ message: 'Adoption not found' });
      }
      res.json({ message: 'Adoption updated successfully', adoption: updatedAdoption });
    } catch (error) {
      res.status(500).json({ message: 'Error updating adoption record' });
    }
  };


const getAdoptionById = async (req, res) => {
    const adoptionId = req.params.id; // Get the adoption ID from the request parameters
    try {
      const adoption = await Adopt.findById(adoptionId); // Find the adoption record by ID
      if (!adoption) {
        return res.status(404).json({ message: 'Adoption not found' });
      }
      res.json(adoption);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching adoption record' });
    }
  };
  
// Function to get all adoption records
const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adopt.find(); // Find all adoption records in the database
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching adoption records' });
  }
};

// Function to create a new adoption record
const createAdoption = async (req, res) => {
  try {
    const { firstname, lastname, email, address, phone, pet } = req.body;

    // Create a new adoption record
    const newAdoption = new Adopt({
      firstname,
      lastname,
      email,
      address,
      phone,
      pet,
    });

    // Save the new adoption record
    await newAdoption.save();

    res.status(201).json({ message: 'Adoption created successfully', adoption: newAdoption });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating adoption record' });
  }
};

module.exports = {
  getAllAdoptions,
  createAdoption,
  getAdoptionById, 
  updateAdoptionById,
  deleteAdoptionById
};
