// services/api.js
import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api'; // Replace with your actual base API URL

const api = {
  getPets: async () => {
    const response = await fetch(`${BASE_URL}/pets`);
    if (!response.ok) {
      throw new Error('Failed to fetch pets');
    }
    return response.json();
  },
  // Add more API methods as needed
};

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

// Function to fetch pets with images
export const getPetsWithImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/pets/with-images`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default api;
