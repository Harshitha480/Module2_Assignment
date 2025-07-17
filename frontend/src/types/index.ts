export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface MediaItem {
  _id: string;
  userId: string;
  title: string;
  type: 'movie' | 'show';
  genre: string;
  status: 'watched' | 'unwatched' | 'watching';
  rating?: number;
  notes?: string;
  releaseYear?: number;
  poster?: string;
  imdbId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface MediaContextType {
  mediaItems: MediaItem[];
  loading: boolean;
  error: string | null;
  stats: MediaStats | null;
  fetchMediaItems: (filters?: MediaFilters) => Promise<void>;
  createMediaItem: (data: CreateMediaItemData) => Promise<void>;
  updateMediaItem: (id: string, data: UpdateMediaItemData) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;
  toggleWatchStatus: (id: string) => Promise<void>;
  fetchStats: () => Promise<void>;
}

export interface MediaStats {
  totalItems: number;
  watchedItems: number;
  unwatchedItems: number;
  watchingItems: number;
  movies: number;
  shows: number;
  averageRating: number;
}

export interface MediaFilters {
  search?: string;
  type?: 'movie' | 'show';
  genre?: string;
  status?: 'watched' | 'unwatched' | 'watching';
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'rating' | 'releaseYear';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CreateMediaItemData {
  title: string;
  type: 'movie' | 'show';
  genre: string;
  status?: 'watched' | 'unwatched' | 'watching';
  rating?: number;
  notes?: string;
  releaseYear?: number;
  poster?: string;
  imdbId?: string;
}

export interface UpdateMediaItemData {
  title?: string;
  type?: 'movie' | 'show';
  genre?: string;
  status?: 'watched' | 'unwatched' | 'watching';
  rating?: number;
  notes?: string;
  releaseYear?: number;
  poster?: string;
  imdbId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface MediaFormData {
  title: string;
  type: 'movie' | 'show';
  genre: string;
  status: 'watched' | 'unwatched' | 'watching';
  rating?: number;
  notes?: string;
  releaseYear?: number;
  poster?: string;
}

export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western',
  'Other'
] as const;

export type Genre = typeof GENRES[number];

export const STATUSES = ['watched', 'unwatched', 'watching'] as const;
export type Status = typeof STATUSES[number];

export const MEDIA_TYPES = ['movie', 'show'] as const;
export type MediaType = typeof MEDIA_TYPES[number];