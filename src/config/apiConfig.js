// API Configuration
const VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:1337';

export const API_BASE_URL = `${VITE_API_URL}/api`;

export default API_BASE_URL;
