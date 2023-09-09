const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");
const multer = require("multer"); // Import multer
const path = require("path"); // Import the 'path' module
const fs = require("fs"); // Add this line
const sharp = require("sharp");
// const util = require("util");
// const exec = util.promisify(require("child_process").exec);




// Endpoint to retrieve an image by pet ID
router.get("/images/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet || !pet.image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imagePath = path.join(__dirname, "..", "uploads", pet.image);
    console.log("Image Path:", imagePath); // Add this line for debugging
    const imageStream = fs.createReadStream(imagePath);
    imageStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving image" });
  }
});

// Set up multer storage and configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname); // Set the filename of the uploaded file
  },
});

const upload = multer({
  storage: storage,
  // Set the field name that will be used in the form to upload the file
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"));
    }
  },
});

// Define the GET route to fetch all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets" });
  }
});

// POST route to add a new pet with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
console.log("Received files:", req.files);

    const { name, species, breed, age, description } = req.body;
    const image = req.file ? req.file.filename : undefined; // Get the image filename


    console.log("Pet data:", name, species, breed, age,description, image); // Add this line for debugging

    const pet = new Pet({
      name,
      species,
      breed,
      age,
      description,
      image, // Assign the image filename to the image field
    });
    await pet.save();
    res.status(201).json({ message: "Pet added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pet", error: error.message });
  }
});

// Update a pet's information by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document
    );
    res.json(updatedPet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating pet", error: error.message });
  }
});

// Delete a pet by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndRemove(req.params.id);
    if (!deletedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json({ message: "Pet deleted", deletedPet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting pet", error: error.message });
  }
});

// DELETE route to delete all pets
router.delete("/deleteAll", async (req, res) => {
  try {
    const result = await Pet.deleteMany();
    res.json({ message: `${result.deletedCount} pets deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting pets", error: error.message });
  }
});


// Define a route to get pets with images
router.get('/with-images', async (req, res) => {
  try {
    // Query your database to fetch pets with image information
    const petsWithImages = await Pet.find({}); // Adjust the query as needed
    res.json(petsWithImages);
  } catch (error) {
    console.error('Error fetching pets with images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
