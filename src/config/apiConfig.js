// API Configuration
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

export const API_BASE_URL = `${REACT_APP_API_URL}/api`;
export const MEDIA_BASE_URL = REACT_APP_API_URL;  // For static files/images

export default API_BASE_URL;
