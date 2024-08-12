// utils/api.js

const apiUrl = 'http://localhost:8080'; // Base URL for your API

/**
 * Utility function to perform a fetch request with JWT authentication.
 * @param {string} endpoint - The API endpoint to request.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} - The response data as a JSON object.
 */
const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  // Add authorization header if token is available
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default fetchWithAuth;
