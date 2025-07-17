import axios from 'axios';
import { 
  User, 
  MediaItem, 
  MediaStats, 
  MediaFilters, 
  CreateMediaItemData, 
  UpdateMediaItemData,
  ApiResponse,
  PaginatedResponse
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string }): Promise<ApiResponse<User>> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// Media API
export const mediaAPI = {
  getMediaItems: async (filters?: MediaFilters): Promise<PaginatedResponse<MediaItem>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await api.get(`/media?${params.toString()}`);
    return response.data;
  },

  getMediaItem: async (id: string): Promise<ApiResponse<MediaItem>> => {
    const response = await api.get(`/media/${id}`);
    return response.data;
  },

  createMediaItem: async (data: CreateMediaItemData): Promise<ApiResponse<MediaItem>> => {
    const response = await api.post('/media', data);
    return response.data;
  },

  updateMediaItem: async (id: string, data: UpdateMediaItemData): Promise<ApiResponse<MediaItem>> => {
    const response = await api.put(`/media/${id}`, data);
    return response.data;
  },

  deleteMediaItem: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },

  toggleWatchStatus: async (id: string): Promise<ApiResponse<MediaItem>> => {
    const response = await api.patch(`/media/${id}/status`);
    return response.data;
  },

  getStats: async (): Promise<ApiResponse<MediaStats>> => {
    const response = await api.get('/media/stats');
    return response.data;
  },

  deleteAllMediaItems: async (): Promise<ApiResponse<void>> => {
    const response = await api.delete('/media');
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;