import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
	(config) => {
		// Get token from localStorage
		const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Clear token and redirect to login
			if (typeof window !== 'undefined') {
				localStorage.removeItem('token');
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;
