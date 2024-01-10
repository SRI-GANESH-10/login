// api/api.js
import axios from 'axios';

const apiUrl = 'https://api.dev2.constructn.ai/api/v1/users/signin'; // Replace with your actual API URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Add signUpUser or other utility functions as needed
