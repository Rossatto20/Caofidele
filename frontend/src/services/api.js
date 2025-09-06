// API Service for CãoFidèle frontend
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Testimonials API service
export const testimonialService = {
  // Get all approved testimonials
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE}/testimonials`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Create new testimonial (for future use)
  create: async (testimonialData) => {
    try {
      const response = await fetch(`${API_BASE}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  }
};

// Contact API service
export const contactService = {
  // Schedule appointment
  schedule: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE}/contact/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      throw error;
    }
  }
};

// Health check service
export const healthService = {
  check: async () => {
    try {
      const response = await fetch(`${API_BASE}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
  
  if (error.message.includes('500')) {
    return 'Erro interno do servidor. Tente novamente em alguns instantes.';
  }
  
  if (error.message.length > 100) {
    return 'Ocorreu um erro inesperado. Tente novamente.';
  }
  
  return error.message;
};

export default {
  testimonialService,
  contactService,
  healthService,
  handleApiError
};