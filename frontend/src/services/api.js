// API Service for CãoFidèle frontend
const getBackendUrl = () => {
  // Check if we're in development (localhost)
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    // Use local backend URL for development
    return 'http://localhost:8001';
  }
  
  // For production, use environment variable
  let backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  // Debug logging
  console.log('REACT_APP_BACKEND_URL from env:', backendUrl);
  
  // Fallback
  if (!backendUrl) {
    backendUrl = window.location.origin;
  }
  
  // Force HTTPS if we're running on HTTPS
  if (window.location.protocol === 'https:' && backendUrl.startsWith('http:')) {
    backendUrl = backendUrl.replace('http:', 'https:');
  }
  
  console.log('Final backend URL:', backendUrl);
  return backendUrl;
};

const API_BASE = getBackendUrl() + '/api';

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