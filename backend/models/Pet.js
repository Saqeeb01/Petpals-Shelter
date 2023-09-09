const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // You can store image URLs or paths here
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
