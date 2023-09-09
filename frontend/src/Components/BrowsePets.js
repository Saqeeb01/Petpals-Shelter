import React, { useState, useEffect } from "react";
import  { getPetsWithImages } from "../services/api";
import AdoptionModal from "./AdoptionModal";
import "../styles/BrowsePets.css";

const BrowsePets = () => {
  const [petsData, setPetsData] = useState([]);
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [adoptionFormData, setAdoptionFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
  });

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value); // Update the search query state
  };

  // Filter pets based on search query or show all pets if no matching pet is found
  const filteredPets =
    searchQuery.trim() &&
    petsData.some((pet) => {
      const petSpecies = pet.species.toLowerCase();
      return petSpecies.includes(searchQuery.toLowerCase());
    })
      ? petsData.filter((pet) => {
          const petSpecies = pet.species.toLowerCase();
          return petSpecies.includes(searchQuery.toLowerCase());
        })
      : petsData;

  // Function to open the adoption modal
  const openAdoptionModal = () => {
    setIsAdoptionModalOpen(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptionFormData({
      ...adoptionFormData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleAdoptionSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Check if a pet is selected
      if (!selectedPetId) {
        alert("Please select a pet to adopt.");
        return;
      }

      // Prepare the adoption data to send to the server
      const adoptionData = {
        pet: selectedPetId, // Use the selectedPetId
        ...adoptionFormData,
      };

      // Send a POST request to your server to store the adoption data
      const response = await fetch("http://localhost:5000/api/adopt/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adoptionData),
      });

      if (response.status === 201) {
        // Adoption was successful
        console.log("Adopted successfully");
        alert("Adopted successfully"); // Show an alert
        setIsAdoptionModalOpen(false); // Close the modal

        // Update the adopted status locally
        setPetsData((prevPets) =>
          prevPets.map((pet) =>
            pet._id === selectedPetId ? { ...pet, adopted: true } : pet
          )
        );

        // Persist the adopted pet ID in local storage
        const adoptedPetIds =
          JSON.parse(localStorage.getItem("adoptedPets")) || [];
        adoptedPetIds.push(selectedPetId);
        localStorage.setItem("adoptedPets", JSON.stringify(adoptedPetIds));

        // Clear the selected pet
        setSelectedPetId(null);
      } else {
        // Handle other scenarios or show an error message
        console.error("Error in adoption:", response.statusText);
        alert("Error in adoption. Please try again."); // Show an error alert
      }
    } catch (error) {
      console.error("Error in adoption:", error);
      alert("Error in adoption. Please try again."); // Show an error alert
    }
  };

  useEffect(() => {
    // Fetch pet data using the API service
    getPetsWithImages()
      .then((data) => {
        // console.log("Data received from API:", data);
        // Update the adopted status based on local storage
        const adoptedPetIds =
          JSON.parse(localStorage.getItem("adoptedPets")) || [];
        setPetsData(
          data.map((pet) => ({
            ...pet,
            adopted: adoptedPetIds.includes(pet._id),
          }))
        );
      })
      .catch((error) => console.error("Error fetching pets data:", error));
  }, []);

  useEffect(() => {
    // Initialize the adoptedPets item in localStorage if it doesn't exist
    if (!localStorage.getItem("adoptedPets")) {
      localStorage.setItem("adoptedPets", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="browse-pets">
      <div className="container">
        {/* <h2>Browse Available Pets</h2> */}

        {/* Wrap the search bar and pet cards in a new div */}
        <div className="search-and-pets">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for pets"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <div className="pet-cards">
            {filteredPets.map((pet) => (
              <div key={pet._id} className="pet-card">
                <img
                  src={`http://localhost:5000/uploads/${pet.image}`}
                  alt={pet.name}
                />
                <h3>Name: {pet.name}</h3>
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age}</p>
                <p>Description: {pet.description}</p>
                <button
                  className="adopt-button"
                  onClick={() => {
                    setSelectedPetId(pet._id);
                    openAdoptionModal(); // Open the adoption modal
                  }}
                  disabled={pet.adopted} // Disable the button if the pet is adopted
                >
                  {pet.adopted ? "Adopted" : "Adopt Me"}
                </button>{" "}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the AdoptionModal component */}
      <AdoptionModal
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
        formData={adoptionFormData}
        onInputChange={handleInputChange}
        onSubmit={handleAdoptionSubmit}
      />
    </div>
  );
};

export default BrowsePets;
